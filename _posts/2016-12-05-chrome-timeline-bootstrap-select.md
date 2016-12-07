---
layout: post
title:  "分析优化bootstrap-select"
categories: [优化, chrome控制台]
---
Bootstrap select插件耗时分析

其中最有卡顿感的是对于有4000个以上的option进行全选的操作。

1. 借助console.time计算script过程的耗时
	<img src="/images/bootstrap-select/image001.png">
	<img src="/images/bootstrap-select/image003.png" width="60%">

	可见最耗时的是render和trigger这两个函数，

	不过script过程也就耗时了300ms，其实是可以接受的

2. 其中生成样式树和重排的耗时最多，总共耗时差不多1s（只在首次出现）
	<img src="/images/bootstrap-select/image005.png">

	其中样式计算和重排耗时是因为所要修改的元素的基数很大，这个很难再优化
	<img src="/images/bootstrap-select/image007.png">

3. 但是通过多次执行选择，发现第一次比较慢，其他是可接受范围内的慢。见下图:
	首次为第一个框，以后重新复发为后面的框
	<img src="/images/bootstrap-select/image009.png">

	猜测有可能是异步加载的资源ready所以重新渲染，果然发现是字体文件，
	<img src="/images/bootstrap-select/image011.png">

	在看不到的位置放置，预加载字体，这样大概减少1s
	<img src="/images/bootstrap-select/image013.png">

4. 如果option的数量在4000以上，搜索会比较慢，这个搜索是前端搜索，分析timeline发现慢的原因在重排重绘上，因此我做了2个优化
	1. 延时搜索，```setTimeout```
	2. 通过```cloneNode```，对克隆节点进行操作后再覆盖掉原来的option，这样重绘重排只触发一次
	见下面的代码片段和备注，修改了bootstrap.select.js的liveSearchListener

```javascript
this.$searchbox.on('input propertychange', function () {
    var timer = that.$searchbox.data('searchTimer');
    // 优化：延迟搜索，贪婪搜索
    timer && clearTimeout(timer);
    timer = setTimeout(realSearch, 500);
    that.$searchbox.data('searchTimer', timer);

    function realSearch(){
        // console.time('search');
        // 优化： 克隆出节点使得不多次直接操作dom
        var $clone = that.$lis.clone();
        if (that.$searchbox.val()) {
            // console.log(that.$lis);
            var $searchBase = $clone.not('.is-hidden').removeClass('hidden').children('a');
            if (that.options.liveSearchNormalize) {
                $searchBase = $searchBase.not(':a' + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")');
            } else {
                $searchBase = $searchBase.not(':' + that._searchStyle() + '("' + that.$searchbox.val() + '")');
            }
            $searchBase.parent().addClass('hidden');

            $clone.filter('.dropdown-header').each(function () {
                var $this = $(this),
                    optgroup = $this.data('optgroup');

                if ($clone.filter('[data-optgroup=' + optgroup + ']').not($this).not('.hidden').length === 0) {
                    $this.addClass('hidden');
                    $clone.filter('[data-optgroup=' + optgroup + 'div]').addClass('hidden');
                }
            });

            var $lisVisible = $clone.not('.hidden');

            // hide divider if first or last visible, or if followed by another divider
            $lisVisible.each(function (index) {
                var $this = $(this);

                if ($this.hasClass('divider') && (
                    $this.index() === $lisVisible.first().index() ||
                    $this.index() === $lisVisible.last().index() ||
                    $lisVisible.eq(index + 1).hasClass('divider'))) {
                    $this.addClass('hidden');
                }
            });

            // if (!$clone.not('.hidden, .no-results').length) {
            //     if (!!$no_results.parent().length) {
            //         $no_results.remove();
            //     }
            //     $no_results.html(that.options.noneResultsText.replace('{0}', '"' + htmlEscape(that.$searchbox.val()) + '"')).show();
            //     that.$menuInner.append($no_results);
            // } else if (!!$no_results.parent().length) {
            //     $no_results.remove();
            // }
        } else {
            $clone.not('.is-hidden').removeClass('hidden');
            if (!!$no_results.parent().length) {
                $no_results.remove();
            }
        }

        $clone.filter('.active').removeClass('active');
        that.$menuInner.html($clone);

        // 因为 li 是克隆后添加到menu中，因此that变量（类似这个函数的全局配置变量）的$lis要做相应的更新
        that.$lis = that.$menu.find('li');
        // if (that.$searchbox.val()) $clone.not('.hidden, .divider, .dropdown-header').eq(0).addClass('active').children('a').focus();
        // $(this).focus();
        // console.timeEnd('search');

    }
});
```


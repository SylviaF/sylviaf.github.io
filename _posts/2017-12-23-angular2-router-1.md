---
layout: post
title:  "Angular2 - 路由基本对象"
categories: [angular2, angular2 router]
---
路由相关对象，指令等

对象 | 简介
----|----------
[Routes](https://angular.cn/api/router/Routes){:target="_blank"} | 路由配置（路由的数组），数组形式保存着多个路由
[Route](https://angular.cn/api/router/Route){:target="_blank"}|单个路径路由配置，保存着相应url对应的组件（component），子路由（chilldren），转发路径（redirectTo），渲染出口（outlet），匹配方式（pathMatch）等
[RouterOutlet](https://angular.cn/api/router/RouterOutlet){:target="_blank"} |路由出口，在模板中用<router-outlet>标签表示显示视图的占位
[Router](https://angular.cn/api/router/Router){:target="_blank"} |路由器，可通过调用navigate、navigateByUrl进行路由跳转
[RouterLink](https://angular.cn/api/router/RouterLink){:target="_blank"}|路由链接，在模板中绑定点击跳转的路由路径
[RouterLinkActive](https://angular.cn/api/router/RouterLinkActive){:target="_blank"}|激活路由时，此html元素添加的css类
[ActivatedRoute](https://angular.cn/api/router/ActivatedRoute){:target="_blank"}|激活的路由，当前激活路由的信息，静态参数或者__参数流__
[RouterState](https://angular.cn/api/router/RouterState){:target="_blank"}|todo：暂未用过


---
常用部分：
---
Routes
- 必备：path，component 
  - 这里的path不要加/， 为了能够灵活运用绝对路径和相对路径
  - 通配符 **，一般放在最后面，作为没匹配到特殊路由的默认路由。
  - 匹配顺序：先匹配者优先
- 可选：
  - outlet(路由出口，路由显示的位置，主要用于辅助路由，辅助路由常用于比如一些电商需要有客服页面时，主辅路由互不相干)
  - children(子路由)
  - loadChildren(懒加载子路由，避免主模块文件太大)
    webpack下可以用angular-router-loader进行分别打包
  - redirectTo(转发路由，常用于修改旧路由后的路由收敛，或者默认空路径转发到更有意义的路径上)
  - canActivate \| canDeactivate: 一些路由保卫，配置是否可以激活，是否可以离开等
  - resolve 用于依赖注入一些路由数据处理，例子：https://embed.plnkr.co/zL0UlvqNqioAaxwZpZDR/

---
RouterLink(指令)，用于模板中跳转路由
- 路径加/，说明是根路由
- 路径加./, 说明是子路由

---
ActivatedRoute 激活的路由
  - snapshot 静态的当前激活路由状态，不会改变
  - params，queryParams等是返回一个可观察对象，可订阅相关的路由参数变化
---
layout: post
title: "opera mini浏览器的模拟器"
date:   2015-08-25 14:50:15
categories: "兼容"
---
为了方便我们开发适应于opera mini浏览器的网页，我尝试在PC上安装opera mini的浏览器。  

本来是为了跨域翻墙，但是跟着教程做下来，发现他们本质上还是在电脑上搭一个opera mini可以运行的环境，然后安装opera mini的安装包。所以opera mini访问网络的方式没有变。如果你只是想解决跨域翻墙问题，那此文无任何帮助(◎-◎；)

此文仅仅总结我的电脑(Mac pro, OS X Yosemite, v10.10.3)的2种方法的安装过程。

## 方法一：安装Opera Mobile Emulator
此方法仅可安装旧版本Opera Mini 8以下的版本。如果你的网站服务于比较落后的地区的话，还是有点意义的...

1. 安装java（下载地址：<https://www.java.com/en/download/>）  

2. 安装MicroEmulator （下载地址：<https://code.google.com/p/microemu/downloads/list?can=1&q=microemulator>）  
下载microemulator-2.0.4.zip，解压后，双击microemulator.jar包，即可打开MicroEmulator软件。通过options > select device可以选择可以调整屏幕大小的设备（如图2）
![microemulator界面](/images/opera-mini-emulator/microEmulator1.png "microemulator view")
![microemulator界面](/images/opera-mini-emulator/microEmulator2.png "microemulator view")
3. 下载opera mini的jar安装包(下载地址：<http://www.opera.com/mobile/download/versions/>)  
因为只能安装jar包，不能安装apk包，所以我们只能安装有jar包的版本。  
[opera mini 8的jar包地址](http://mini.opera.com/download-7/opera-mini-latest-advanced-all.jar?no_redir&ismobile=false)  

4. 安装opera mini的jar包  
通过File > Open MIDlet File，选择你下载的opera mini的jar包。这样opera mini就安装到Microemulator里

5. 双击opera mini按钮，就可以在你的电脑上模拟手机的opera mini了(≖ ‿ ≖)✧  
![microemulator with operamini](/images/opera-mini-emulator/microEmulatorOperamini.png "microemulator with operamini")
![microemulator with operamini](/images/opera-mini-emulator/microEmulatorOperamini1.png "microemulator with operamini")


<br/><br/>

## 方法二：chrome插件ARChon Custom Runtime + chromeos-apk
此方法貌似要看你所选的apk是否可以成功转化为没有报错的chromeos-apk。ㄟ( ▔, ▔ )ㄏ  
它可以安装opera mini之外的某些安卓app，不过目前并没有支持全部安卓app。

1. 安装chrome
2. 安装chrome插件ARChon Custom Runtime  
![install ARC](/images/opera-mini-emulator/ARC1.png "install ARC")  
2.1. 下载并解压(下载地址：<http://archon-runtime.github.io/>)  
2.2. 打开chrome://extensions，勾选开发者模式。  
2.3. 点击 `加载已解压的扩展程序`，选择你下载的ARC的解压文件
3. 安装chromeos-apk  
步骤2，提供了在chrome浏览器上执行apk的环境，但是需要将普通的apk装换为适于chromeos运行的apk，所以需要安装chromeos-apk来帮助转换apk。  
3.1 安装nodejs（集成npm，若没有npm，你还需安装npm）
3.2 npm install chromeos-apk -g 或者 sudo npm install chromeos-apk -g
4. 下载apk，并使用chromeos-apk转换apk  
4.1 chromeos-apk [path to apk file]  
它会在你的终端的当前目录下，创建一个目录(类似 com.opera.mini.android，视你转换的apk而定)
4.2 打开chrome://extensions，点击 `加载已解压的扩展程序`，选择你转好的apk的目录（例如：com.opera.mini.android）。  
4.3 修改包的目录下的./_locales/en/messages.json，在extName下增加message项，值为你的apk的目录  
![modify chromeos apk](/images/opera-mini-emulator/chromeosapk1.png "modify chromeos apk")  
![modify chromeos apk](/images/opera-mini-emulator/chromeosapk2.png "modify chromeos apk")  

5. 点击相应apk插件的启动，便可以啦<(▰˘◡˘▰)>。  
![chromeos run operamini](/images/opera-mini-emulator/chromeosoperamini.png "chromeos run operamini")  


> ## 参考资料
> 
> [Installing Opera Mini on Your Computer](https://dev.opera.com/articles/installing-opera-mini-on-your-computer/)  
> [ARChon Custom Runtime Guide](https://github.com/vladikoff/chromeos-apk/blob/master/archon.md)

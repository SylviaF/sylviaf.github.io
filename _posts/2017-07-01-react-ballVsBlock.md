---
layout: post
title:  "用reactjs实现简易版的ball vs block游戏"
categories: [webpack, reactjs, html5]
---
[在线预览 - ballVsBlock ](./games/ballVsBlock/)

[github - 源代码 ](https://github.com/SylviaF/react-ballVsBlock){:target="_blank"}

注意：分数存储是通过facebook的api，因为设置源的问题，分数无法存储到facebook

<iframe style="width:100%;max-width: 300px;height: 500px;overflow:hidden" src="./games/ballVsBlock/"></iframe>

---
需求分析：

&emsp;游戏由一个可控制左右操作的带有初始数字的小球和随机出现的带数字的方框和墙组成。小球可以撞碎比自己数字小的方块。并且将分数加到自己的身上。遇到墙会阻止小球的移动。

---
技术分析：

一. 游戏算法

1.小球会一直往上前进，这个由小球固定位置，其他游戏物体向下移动实现：

&emsp;a. 每个物体有个step函数用于定义每个循环时物体的变化。

&emsp;b. 整个游戏有个循环，定时执行物体的step函数。

2.障碍设置函数，方块和墙的初始位置的设置：

&emsp;a. 一个函数设置初始位置障碍，其中方块的分数根据小球的分数变化而有所变化。

&emsp;b. 一个循环设置每间隔一段时间设置障碍

3.小球与方块和墙的碰撞处理函数。

二、游戏实现

1.搭建webpack + react + es6 + less的简易脚手架

<img src="/images/react-2048/1.png"/>

开发时需要的npm包： babel-preset-es2015 babel-preset-react less-loader css-loader style-loader

2.模块化

a.游戏面板Board

- initEvent()，监测wap触屏滑动操作和pc端鼠标滑动对应的执handleMoveEvent操作
- handleMoveEvent (nChangX)，对球进行左右操作，还要注意左右边界问题处理。
- boards，面板上的墙和块等物体
- setBoards(board):加物体进入boards
- delBoards(index):从boards中删除
- setBlocks(): 循环增加物体进入boards
- loop(): 循环boards中的物体的step操作，使得物体向下移动。

b. 小球ball

- draw()
- moveTo(x)
- checkCollision(sqX, sqY, sqWidth)

c. 方块Block & 墙 Wall

- draw()
- step(dt)


3.facebook相关

&emsp;a. facebook sdk的登录获取权限操作

&emsp;b. facebook score api用于记录分数

&emsp;c. facebook cdn使用，将静态文件打包放置facebook部署。

<img src="/images/react-2048/2.png"/>



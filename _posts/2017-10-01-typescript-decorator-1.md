---
layout: post
title:  "typescript - 装饰器"
categories: [angular2, typescript, decorators]
---
装饰器主要用于将一些常用操作进行抽象出一层对类，方法，属性，参数进行修饰的函数。
常用例子：设置属性时，打日志等。

此篇主要分享一篇觉得易懂的博文，见引用

> [装饰器是什么](https://github.com/semlinker/angular2-ionic2/issues/9){:target="_blank"}


装饰器的分类

类装饰器 (Class decorators)
```
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void
```
属性装饰器 (Property decorators)
```
declare type PropertyDecorator = (target:Object, propertyKey: string | symbol ) => void;
```
方法装饰器 (Method decorators)
```
declare type MethodDecorator = <T>(target:Object, propertyKey: string | symbol, descriptor: TypePropertyDescript<T>) => TypedPropertyDescriptor<T> | void;
```
参数装饰器 (Parameter decorators)
```
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number ) => void
```

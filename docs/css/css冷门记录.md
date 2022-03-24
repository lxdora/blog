---
title: css冷门记录
tags:
  - 前端
categories:
  - 技术文档
date: 2021-04-14 10:41:40
---

现在单纯的css用的比较少了，多用预编译css，代码写起来比单纯的css要简单，我们常用的是scss，本文主要记录工作中常用的但又不太熟悉的css相关知识。

<!--more-->

# 概念

scss与sass有什么区别？

> 简言之可以理解scss是sass的一个升级版本，完全兼容sass之前的功能，又有了些新增能力。语法形式上有些许不同，最主要的就是sass是靠缩进表示嵌套关系，scss是花括号

# 记录

## 当想滚动而又不想显示滚动条时

```js
.div-box{
  height: 600px;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
}
```

## 伪类和伪元素

**1. 伪类表示被选择元素的某种状态，例如`:hover`**

**2. 伪元素表示的是被选择元素的某个部分，这个部分看起来像一个独立的元素，但是是"假元素"，只存在于css中，所以叫"伪"的元素，例如`:before`和`:after`**

![image.png](https://gitlab.com/lixiangteam/blogImg/uploads/f91897192bb906c3318a33bc6a9ae8ac/f9592a395a204e46bd791417263d70c8_tplv-k3u1fbpfcp-watermark.image)

![2.png](https://gitlab.com/lixiangteam/blogImg/uploads/1a006ee6d74cd6b877c27482a684e240/5497c283a92a4c73832aa7648067b95f_tplv-k3u1fbpfcp-watermark.image)

# css filter用法

`blur()`：模糊图像

`brightness()` ：让图像更明亮或更暗淡

`contrast()`：增加或减少图像的对比度

`drop-shadow()`：在图像后方应用投影

`grayscale()`：将图像转为灰度图

`hue-rotate()`：改变图像的整体色调

`invert()`：反转图像颜色

`opacity()`：改变图像透明度

`saturate()`：超饱和或去饱和输入的图像

`sepia()`：将图像转为棕褐色

` filter: brightness(110%) saturate(140%);`

## 如何画出两边半圆的长方形

border-radius 为高度的一半

## 在一个元素上hover，改变另一个元素的样式

1. 两元素是父子关系

```css
  .face:hover .eye-bottom {
      margin-top: 30px;
  }
```

2. 两元素是兄弟关系

   ```css
   .face:hover+.ear-wrap {
     transform: rotate(-30deg);
   }
   ```

3. 另一个元素是兄弟的儿子

   ```css
    .face:hover+.ear-wrap .ear {
      transform: rotate(-30deg);
   }
   
   ```

## 当元素hover时加上边框，会改变元素大小导致其他元素位置变化

解决方法：在元素未hover的时候也加上边框，透明度为0 

```css
cluster{
  border: 1px solid transparent;
  &:hover{
    border: 1px dashed #037aff;
  }
}
```

## 指定动画的方向

```css
transform-origin: 100% 0;
```

# 多行文本省略号

```css
//单行
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```



```css
.ellipsis{
  overflow: hidden;    
  display: -webkit-box;
  text-overflow:ellipsis;    
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
```

```css
//跨浏览器兼容写法
p{
  position: relative;
  line-height: 1.4em;
  height: 4.2em;
  overflow: hidden;
}
p::after{
  content:"...";
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right:0;
  padding: 0 20px 1px 45px;
  background: url(....)repeat-y;
}
```

# 扩大可点击区域

```css
button {
　　position：relative;
　　/* [其余样式] */
}
button:before {
   content:'';
   position:absolute;
　 top:-10px; 
   right:-10px;
　 bottom:-10px; 
   left:-10px;
}
```

# 滚动条样式
::: details Click me to view the code
```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  }
::-webkit-scrollbar-track {
  width: 6px;
  background-color: rgba(204,204,204, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  }
::-webkit-scrollbar-thumb {
  background-color: rgba(204,204,204, 0.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  }
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(204,204,204, 1);
  }
```
:::

---
title: uniapp开发问题记录
tags:
  - 前端
categories:
  - 技术文档
date: 2022-02-15 15:25:43
---

记录一下使用uni-app开发小程序过程中遇到的问题

<!--more-->

- 文本必须放在<text></text>标签内，且此标签不能换行，否则文本周围会出现无法消除的边框

- 添加或更换静态资源后需要重新编译，否则找不到新的静态资源

- position:absolute的元素必须设置宽度，否则定位后元素会消失

- 使用scroll-view组件时，如果要使用scroll-into-view属性使其滚动到指定元素，则绑定的id要在onReady中赋值

- moveable-view中嵌套list时，安卓平台，内部list滚动会导致外面moveable-view跟着滚动，遍寻良方而不得，最后使用如下方式： 当滚动内部list时，将moveable-view的disabled设置为true，当点击list外面时，再将disabled设置为false，这样就有一个体验问题，安卓平台滚动完list需要先点击一下外面，然后才能拖动。

  

---
title: canvas学习
tags:
  - 前端
categories:
  - 技术文档
date: 2022-4-23 11:59:34
---

# Canvas的基本用法

```html
<canvas id="canvas"></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'green';
  ctx.fillRect(10, 10, 150, 100);
</script>
```

`canvas`元素只有两个属性，`width`和`height`,默认为300*150，可以通过css修改宽高，但是在绘制图像时，如果css的尺寸与初始画布的比例不一致，它会出现扭曲。

可以定义替代内容，当浏览器不支持canvas时，会显示替代内容

```html
<canvas id="canvas">你的浏览器不支持canvas</canvas>
```

也可以通过检查支持性在支持和不支持canvas的浏览器上显示不同的内容

```js
const canvas = document.getElementById('canvas');
if(canvas.getContext){
  //支持canvas
  const ctx = canvas.getContext('2d')
}else{
  //不支持canvas
}
```

## 绘制矩形

canvas提供了三种方法绘制矩形

1. 绘制一个填充的矩形：[`fillRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect)
2. 绘制一个矩形的边框：[`strokeRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect)
3. 清除指定区域，让清除部分完全透明：[`clearRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)

  x,y指定了相对于原点的坐标，width和height指定了矩形的宽高

也有rect()方法，将一个矩形路径增加到当前路径上。

- `rect(x, y, width, height)`

  绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。

当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。也就是说，当前笔触自动重置回默认坐标。

## 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。

- `beginPath()`：新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径
- `closePath()`:闭合路径后图形绘制命令又重新指向上下文中
- `stroke()`:通过线条来绘制图形轮廓
- `fill()`:通过填充路径的内容区域生成实心的图形
- `lineTo(x,y)`：绘制一条从当前位置到(x,y)的直线

```js
//绘制一个三角形
function draw(){
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.moveTo(50,50)
  ctx.lineTo(100,100)
  ctx.lineTo(50,100)
  //实心三角形
  ctx.fill()
  //空心三角形
  ctx.closePath()
  ctx.stroke()
}
```

> **当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（），无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。** 
>
> 说的比较抽象，意思就是在beginPath()之后要先调用moveTo()

如果调用了fill(),会自动闭合路径，不需要再调用closePath(), 而如果使用stroke(),则不会自动闭合路径，如果需要一个封闭的图形，在需要在之前调用closePath()

## 绘制圆弧

[`arc(x, y, radius, startAngle, endAngle, anticlockwise)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc)

画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。anticlockwise为true表示顺时针，为false表示逆时针

> **`arc()`函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:**
>
> **弧度=(Math.PI/180)\*角度**

```js
//绘制一个同心圆
function draw(){
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  ctx.beginPath()
  ctx.arc(100,100,50,0,Math.PI*2,true)
  ctx.fill()
  ctx.beginPath()
  ctx.fillStyle = '#fff'
  ctx.arc(100,100,20,0,Math.PI*2,true)
  ctx.fill()
}
```

## 绘制贝塞尔曲线

- `quadraticCurveTo(cp1x, cp1y, x, y)`:绘制二次贝塞尔曲线，`cp1x,cp1y`为一个控制点，`x,y为`结束点。
- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`:绘制三次贝塞尔曲线，`cp1x,cp1y`为控制点一，`cp2x,cp2y`为控制点二，`x,y`为结束点。

![二次贝塞尔曲线与三次贝塞尔曲线](https://mdn.mozillademos.org/files/223/Canvas_curves.png)

> 二次贝塞尔曲线有一个开始点（蓝色）、一个结束点（蓝色）以及一个控制点（红色），而三次贝塞尔曲线有两个控制点。

## Path2D 对象

path2D用来缓存或记录绘画命令

```js
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```

**[`Path2D.addPath(path [, transform\])`](https://developer.mozilla.org/zh-CN/docs/Web/API/Path2D/addPath)** 

添加了一条路径到当前路径

## 使用样式和颜色

- `fillStyle=color`:设置图形的填充颜色
- `strokeStyle = color`:设置图形轮廓的颜色， `color` 可以是表示 CSS 颜色值的字符串，渐变对象或者图案对象。

```js
function draw(){
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
   for(let i=0; i<10;i++){
       for(let j=0;j<10;j++){
           ctx.fillStyle = `rgb(${Math.floor(255-25.5*i)}, ${Math.floor(255-25.5*j)},0)`
           ctx.fillRect(j*25,i*25,25,25)
       }
   }
}
```

## 线型

- `lineWidth = value`:设置线条宽度

  ![线宽与像素关系](https://developer.mozilla.org/@api/deki/files/601/=Canvas-grid.png)

  当绘制从(3,1)到(3,5)的直线时，因为线宽为1，所以会以(3,1)到(3,5)为基线，向左右各扩展0.5个像素，但是一个像素不可能一半显示颜色，另一半却不显示，所以造成的结果就是这个像素会以所期望的颜色的一半色调来填充这个像素。虽然线宽为1，但是实际上却占了两个像素。

  ```js
  function draw(){
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
     for (var i = 0; i < 10; i++){
      ctx.lineWidth = 1+i;
      ctx.beginPath();
      if(i%2==0){  // 线宽为奇数
          ctx.moveTo(5.5+i*14,5);
          ctx.lineTo(5.5+i*14,140);
      }else{ //线宽为偶数
          ctx.moveTo(5+i*14,5);
          ctx.lineTo(5+i*14,140);
      }
      ctx.stroke();
    }
  }
  
  //当线宽为奇数时，绘制线时便从一半像素开始，这样向两侧延伸时正好占满一个像素
  ```

- `lineCap = type`:设置线条末端样式，type可以为butt(默认),round和square

  ![线条末端样式](https://developer.mozilla.org/@api/deki/files/88/=Canvas_linecap.png)

- `lineJoin = type`：设定线条与线条间接合处的样式， type可以为round,bevel和miter(默认)

  ![线条连接处样式](https://gitlab.com/lixiangteam/blogImg/uploads/1495054b371d2031bb7821a6cf875ba5/_Canvas_linejoin.png)

  - `miterLimit = value`:限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

  > 最上面一条是 `round` 的效果，边角处被磨圆了，圆的半径等于线宽。中间和最下面一条分别是 bevel 和 miter 的效果。当值是 `miter `的时候，线段会在连接处外侧延伸直至交于一点，延伸效果受到 `miterLimit` 属性的制约。
  >
  > 如上图所示，线段的**外侧边缘**会被延伸交汇于一点上。线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。`miterLimit` 属性就是用来设定外延交点与连接点的最大距离，如果交点距离大于此值，连接效果会变成了 bevel。

- `setLineDash(segments)`:设置当前虚线样式。segments是一个数组，用来指定线段与间隙的交替

  `lineDashOffset = value`:设置虚线样式的起始偏移量。

  ::: details 绘制蚂蚁线

  ```js
  function draw(offset){
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0,0,canvas.width, canvas.height)
      ctx.setLineDash([4,2])
      ctx.lineDashOffset = offset
      ctx.strokeRect(10,10,100,100)
  }
  
  let offset = 100; 
  setInterval(()=>{
      offset--
      if(offset<0) offset = 100;
   draw(offset)
  },50)
  ```

  :::

## 渐变

建一个`canvasGradient` 对象，并且赋给图形的 `fillStyle` 或 `strokeStyle` 属性。

- `createLinearGradient(x1, y1, x2, y2)`

createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。

- `createRadialGradient(x1, y1, r1, x2, y2, r2)`

createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

创建出 `canvasGradient` 对象后，使用 `addColorStop` 方法给它上色。

- `gradient.addColorStop(position, color)`

addColorStop 方法接受 2 个参数，`position` 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。`color` 参数必须是一个有效的 CSS 颜色值。 此方法可以执行多次，添加多个颜色

::: details 线性渐变(纵向)

```js
function draw(){
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(10, 10, 10, 100)
    gradient.addColorStop(0,'#f00')
    gradient.addColorStop(0.5, '#0f0')
    gradient.addColorStop(1, '#00f')
    ctx.fillStyle = gradient
    ctx.fillRect(10,10,100,100)
}
```

:::

::: details 径向渐变

```js
function draw(){
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(100,100,20,100,100,50)
    gradient.addColorStop(0,'#f00')
    gradient.addColorStop(0.5, '#0f0')
    gradient.addColorStop(1, '#00f')
    ctx.fillStyle = gradient
    ctx.arc(100,100,50,0,Math.PI*2)
    ctx.fill()
}
```

:::

## 图案样式 Patterns

- `createPattern(image, type)`：该方法接受两个参数。Image 可以是一个 `Image` 对象的引用，或者另一个 canvas 对象。`Type` 必须是下面的字符串值之一：`repeat`，`repeat-x`，`repeat-y` 和 `no-repeat`。图案的应用跟渐变很类似的，创建出一个 pattern 之后，赋给 `fillStyle` 或 `strokeStyle` 属性即可

## 阴影

- `shadowOffsetX = float`

- `shadowOffsetY = float`

  `shadowOffsetX` 和 `shadowOffsetY `用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 `0`。

- `shadowBlur = float`

  shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 `0`。

- `shadowColor = color`

​		shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

```js
function draw(){
    const ctx = document.getElementById('canvas').getContext('2d')
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(100,100,100,100)
}
```

## Canvas 填充规则

当使用fill的时候可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的。

```js
function draw(){
    const ctx = document.getElementById('canvas').getContext('2d')
    ctx.arc(100,100,50,0,Math.PI*2)
    ctx.arc(100,100,30,0,Math.PI*2)
    ctx.fill('evenodd')
}
//这个函数会绘制一个同心圆，内园白色，外圆黑色，使用填充规则绘制起来更加简单，否则还要修改fillStyle
```

## 绘制文本

- `fillText(text, x, y [, maxWidth\])`：在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.

- `strokeText(text, x, y [, maxWidth\])`:在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.
- `font = value`:当前我们用来绘制文本的样式. 这个字符串使用和 [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) 属性相同的语法. 默认的字体是 `10px sans-serif`。
- `textAlign = value`:文本对齐选项. 可选的值包括：`start`, `end`, `left`, `right` or `center`. 默认值是 `start`。

- `textBaseline = value`:基线对齐选项. 可选的值包括：`top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`。默认值是 `alphabetic。`

- `direction = value`:文本方向。可能的值包括：`ltr`, `rtl`, `inherit`。默认值是 `inherit。`

## [使用图像](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images)

引入图像到canvas里需要以下两步基本操作：

1. 获得一个指向[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)的对象或者另一个canvas元素的引用作为源，也可以通过提供一个URL的方式来使用图片
2. 使用`drawImage()`函数将图片绘制到画布上

> canvas的API可以使用下面这些类型中的一种作为图片的源：
>
> - **[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)**
>
>   这些图片是由`Image()函数构造出来的，或者任何的<img>元素`
>
> - **[`HTMLVideoElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLVideoElement)**
>
>   用一个HTML的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)元素作为你的图片源，可以从视频中抓取当前帧作为一个图像
>
> - **[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)**
>
>   可以使用另一个 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 元素作为你的图片源。
>
> - **[`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap)**
>
>   这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。
>
> 这些源统一由 [`CanvasImageSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasImageSource)类型来引用。

# [变形](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Transformations)

# [组合](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing)
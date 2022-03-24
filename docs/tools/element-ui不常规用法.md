---
title: element-ui不常规用法
tags:
  - 前端
categories:
  - 技术文档
date: 2021-05-17 19:35:58
---

平常开发过程中使用的是element组件库，平时一些组件与设计给的不一样，不能直接使用，需要进行一些修改，本文档记录一下这些修改的地方。

<!--more-->

# 修改table的border颜色

```vue
.el-table--border:after,
.el-table--group:after,
.el-table:before {
  background-color: #f6f6f6;
}

.el-table--border,
.el-table--group {
	border-color: #f6f6f6;
}

.el-table td,
.el-table th.is-leaf {
	border-bottom: 1px solid #f6f6f6;
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
	border-bottom: 1px solid #f6f6f6;
}

.el-table--border td,
.el-table--border th {
	border-right: 1px solid #f6f6f6;
}
```

# el-form验证

```js
async onSubmit(){
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
            if(this.type==='add'){
              await addServer({id: this.id, ...this.form})
              this.$message.success('添加服务器成功')
            }else{
              await updateServer({id: this.id, ...this.form})
              this.$message.success('编辑服务器成功')
            }
            this.cancel()
        } else {
          const isError= document.getElementsByClassName("is-error");
          isError[0].querySelector('input').focus();
          return false;
        }
      });
    },
```

# 修改el-tabs样式

```css
.el-tabs__nav-wrap{
  &::after{
    background-color: #f4f4f4;
  }
  .el-tabs__active-bar{
    background-color: transparent;
    &::before{
      content: "";
      display: block;
      width: 16px;
      height: 3px;
      background-color: #037AFF;
      margin: -2px auto 0;
      border-radius: 2px; 
    }
  }
  .el-tabs__item {
    &:hover{
      color: #037AFF;
    }
  }
  .is-active{
    color: #037AFF;
  }
}
```


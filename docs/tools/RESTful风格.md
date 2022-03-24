---
title: RESTful风格
tags:
  - 前端
categories:
  - 技术文档
date: 2021-07-19 10:17:38
---

RESTful是一种接口的设计风格，依据这种风格完成的接口便于管理且具有良好的可读性

<!--more-->

[参考文档](https://github.com/aisuhua/restful-api-design-references)

# 为什么需要RESTful

前端设备层出不穷（手机、平板、桌面电脑、其他专用设备......),必须有一种统一的机制，方便不同的前端设备与后端进行通信。RESTful架构因其结构清晰，符合标准，易于理解，扩展方便，成为当前最流行的一种互联网软件架构

# 什么是RESTful

REST是英文的缩写，全称为 Resource REpresentational State Transfer, 缩写的时候省掉了第一个主语， 中文翻译为资源表现层状态转移。

- Resource： 资源， 即数据 (uri)
- REpresentational： 某种表现形式， 如JSON， XML等
- State Transfer: 状态变化， 通过HTTP动词实现

如果一个架构(api)符合REST风格， 就称它为RESTful架构(api)

RESTful架构，是面向资源的架构：

- 每一个uri代表一种资源
- 客户端和服务器之间， 传递这种资源的某种表现层
- 客户端通过HTTP动词，对服务端资源进行操作，实现表现层状态变化

什么样的api是一个好的符合RESTful的api？

看uri就知道要什么
看http method就知道干什么
看http status code就知道结果如何

# 实践

1. 基础, 对用户资源进行操作

   ```js
   // 非RESTful风格
   POST  /api/add_user
   POST  /api/delete_user
   POST  /api/update_user 
   GET  /api/get_user
   ```

   

   ```js
   GET /api/users    //获取用户列表
   GET /api/users/1   //获取用户ID为1的用户信息    /api/users?id=1
   POST /api/users    // 新增一个用户
   PUT  /api/users/1   //修改id为1的用户信息
   PATCH /api/users/1   //更新id为1的用户的某些字段
   DELETE /api/users/1   //删除id为1的用户
   ```

2. 资源名称应使用复数(如users而不是user)

3. 新增资源使用post， 更新一个资源使用put

   https://www.cnblogs.com/one-villager/articles/9231239.html

   安全性和幂等性

   > 1. **安全性**：不会改变资源状态，可以理解为只读的；
   > 2. **幂等性**：执行1次和执行N次，对资源状态改变的效果是等价的(对资源本身没差别)。
   >
   > | .      | 安全性 | 幂等性 |
   > | :----- | :----- | :----- |
   > | GET    | √      | √      |
   > | POST   | ×      | ×      |
   > | PUT    | ×      | √      |
   > | DELETE | ×      | √      |
   >
   > POST所对应的URI并非创建的资源本身，而是资源的接收者。比如：POST http://www.forum.com/articles的语义是在http://www.forum.com/articles下创建一篇帖子，HTTP响应中应包含帖子的创建状态以及帖子的URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的URI；所以，POST方法不具备幂等性。而PUT所对应的URI是要创建或更新的资源本身。比如：PUT http://www.forum/articles/4231的语义是创建或更新ID为4231的帖子。对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性。

4. 如果一个资源依赖于另一个资源

   ```js
   GET /api/users/1/hobbies    //获取id为1的用户的爱好
   GET /api/users/1/hobbies/1   //获取id为1的用户的id为1的爱好  /api/users/1/hobbies?id=1
   POST /api/users/1/hobbies    // 给id为1的用户新增一个爱好
   PUT  /api/users/1/hobbies/1   //修改id为1的用户的id为1的爱好信息
   PATCH /api/users/1/hobbies/1   //更新id为1的用户的id为1的爱好的某些信息
   DELETE /api/users/1/hobbies/1   //删除id为1的用户的id为1的爱好
   ```

5. api中应有版本控制

   ```js
   GET /api/v1/users    
   GET /api/v1/users/1   
   POST /api/v1/users    
   PUT  /api/v1/users/1  
   PATCH /api/v1/users/1 
   DELETE /api/v1/users/1
   ```

6. 对资源进行对应操作后， 应返回操作后的资源

   > 各HTTP方法成功处理后的数据格式：
   >
   > | ·         | response 格式  |
   > | :-------- | :------------- |
   > | GET       | 单个对象、集合 |
   > | POST      | 新增成功的对象 |
   > | PUT/PATCH | 更新成功的对象 |
   > | DELETE    | 空             |

7. 只用以下常见的3种body format

   >PUT, PATCH, POST请求的body体中，使用JSON格式的数据，而不是form表单形式的数据
   >
   >1. **Content-Type: application/json**
   >
   >   ```
   >   POST /v1/animal HTTP/1.1
   >   Host: api.example.org
   >   Accept: application/json
   >   Content-Type: application/json
   >   Content-Length: 24
   >   
   >   {   
   >     "name": "Gir",
   >     "animalType": "12"
   >   }
   >   ```
   >
   >2. **Content-Type: application/x-www-form-urlencoded** (浏览器POST表单用的格式)
   >
   >   ```
   >   POST /login HTTP/1.1
   >   Host: example.com
   >   Content-Length: 31
   >   Accept: text/html
   >   Content-Type: application/x-www-form-urlencoded
   >   
   >   username=root&password=Zion0101
   >   ```
   >
   >3. **Content-Type: multipart/form-data** (表单有文件上传时的格式)

   [为什么推荐用json而不是formData](http://jsrun.net/If8Kp/edit)

   ![image-20210723093355687](https://gitlab.com/lixiangteam/blogImg/uploads/2b2ada95612f9998e86c887a78a2fc5c/image-20210723093355687.png)

   ![image-20210723093436285](https://gitlab.com/lixiangteam/blogImg/uploads/356fa8a29ba647b164314f0cd79180a7/image-20210723093436285.png)

8. url路径中使用下划线分割

9. 提供默认的资源创建时间created_at和更新时间updated_at

10. [中台api输出规范](https://hoge.yuque.com/docs/share/8e8b0c9d-bdd9-4f94-86bf-5cc0806531cd?#%20%E3%80%8AAPI%E8%AE%BE%E8%AE%A1%E6%96%87%E6%A1%A3%E8%BE%93%E5%87%BA%E8%A7%84%E8%8C%83%E3%80%8B)

# RESTful实用性

RESTful看起来很美好，实际使用的时候却不一定实用， 它将一切东西都看做资源， 但是在实际开发过程中， 一些东西很难用资源来描述， 比如登录

`api/login` login是一个动词， 不太RESTful， 但是可以很直观的看出来我们要干吗。如果强行使用RESTful，可能首先要想一下改用什么资源表示， 想想可能是用session，然后对session进行增删改查， 这样就很难理解。

不要为了RESTful而RESTful




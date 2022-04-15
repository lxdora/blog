---
title: nginx的使用
date: 2022-04-11 17:55:00
tags: 
 - nginx
categories:
 - 技术文档

---

# 安装

## mac安装

1. 直接在终端执行`brew install nginx`

2. 安装完成后执行`brew info nginx`查看一下nginx的信息

   ::: detail 

   ```shell
   nginx: stable 1.21.0 (bottled), HEAD
   HTTP(S) server and reverse proxy, and IMAP/POP3 proxy server
   https://nginx.org/
   /usr/local/Cellar/nginx/1.21.0 (25 files, 2.2MB) *   #nginx的安装位置
     Poured from bottle on 2022-04-11 at 17:57:39
   From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/nginx.rb
   License: BSD-2-Clause
   ==> Dependencies
   Required: openssl@1.1 ✔, pcre ✔
   ==> Options
   --HEAD
   	Install HEAD version
   ==> Caveats
   Docroot is: /usr/local/var/www     # 根目录
   
   The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that   # nginx的配置文件位置以及默认端口号
   nginx can run without sudo.
   
   nginx will load all files in /usr/local/etc/nginx/servers/.
   
   To start nginx now and restart at login:
     brew services start nginx
   Or, if you don't want/need a background service you can just run:
     nginx
   ==> Analytics
   install: 38,401 (30 days), 123,932 (90 days), 486,135 (365 days)
   install-on-request: 38,319 (30 days), 123,724 (90 days), 485,137 (365 days)
   build-error: 24 (30 days)
   ```

   :::
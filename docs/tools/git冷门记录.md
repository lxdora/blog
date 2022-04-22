---
title: git冷门记录
date: 2021-04-09 11:18:01
tags: 
 - git
categories:
 - 技术文档
---

根据二八法则，通常我们可以用20%的知识解决80%的问题，git的使用也是这样。常用的命令翻来覆去就那么几个，但是当我们遇到比较难处理的问题时，也要能会用其他80%中的知识，本文用于记录日常工作不常遇到的git问题，持续更新。

<!--more-->

# git常用命令

简单列举，不再赘述

1. `git add .`
2. `git commit -m ''`
3. `git pull`
4. `git push origin HEAD`
5. `git branch -a`
6. `git checkout -b localBranch origin/master` 从远程master分支拉出本地分支
7. `git branch --set-upstream-to=origin/master ` 设置当前分支追踪远程master分支
8. `git branch -vvv` 查看本地分支与远程分支的映射关系

# git不常用

1. 文件名大小写修改后git检测不到

执行`git config core.ignorecase false`，关闭git忽略大小写配置，即可检测到大小写名称更改

2. git远程分支删除后本地分支还在，不想一个个删除

执行`git remote prune origin`

3. git添加和更新子模块

   `git submodule add git@git.hoge.cn:microfed/library.git src/library`

   `git submodule update --init --recursive`

   添加子模块报错

   `'src/library' already exists in the index`

   执行如下命令

   `git rm -r --cached src/library`

4. git 删除远程分支

   ` git push origin --delete new_a`

4. git查看远程仓库地址

   `git remote -v`

6. ```shell
   #指定远程分支时报错，已经存在
   git remote add origin git@git.hoge.cn:microfed/low_code.git
   error: remote origin already exists.
   # 先删除
   git remote rm origin
   # 再添加
   git remote add origin git@git.hoge.cn:microfed/low_code.git
   git@gitlab.com:lxdora/low_code.git
    
   ```


# 在本地同时关联github, gitlab, gitee

1. cd `~/.ssh`目录下，分别建立对应的文件夹

   ```shell
   ls ~/.ssh
   > github   gitlab   gitee
   ```

2. 执行三次ssh-keygen, 分别保存到对应的目录下

   ```shell
   ssh-keygen -t rsa -C "注册 gitlab 账户的邮箱"
   ssh-keygen -t rsa -C "注册 github 账户的邮箱"
   ssh-keygen -t rsa -C "注册 gitee 账户的邮箱"
   
   保存路径要输入全路径
   Enter file in which to save the key (/Users/hoge/.ssh/id_rsa): /Users/hoge/.ssh/gitee/id_rsa
   ```

3. 将对应目录下的id_rsa.pub的内容复制到对应网站上

4. 修改配置文件 `vim ~/.ssh/config`

   ```shell
   # The git info for github
   Host github.com
   HostName github.com
   User 1061522566@qq.com
   IdentityFile ~/.ssh/github/id_rsa
   
   # The git info for gitlab
   Host gitlab.com
   HostName gitlab.com
   User 1061522566@qq.com
   IdentityFile ~/.ssh/gitlab/id_rsa
   
   # The git info for gitee
   Host gitee.com
   HostName gitee.com
   User 1061522566@qq.com
   IdentityFile ~/.ssh/gitee/id_rsa
   ```

5. 测试一下是否连通

   ```shell
   ssh -T git@github.com
   ssh -T git@gitlab.com
   ssh -T git@gitee.com
   
   能看到自己的用户名，说明连通了
   如果看到下述信息，需要输入以下yes
   The authenticity of host 'gitee.com (180.97.125.228)' can't be established.
   ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
   Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
   Warning: Permanently added 'gitee.com,180.97.125.228' (ECDSA) to the list of known hosts.
   Hi lxdora! You've successfully authenticated, but GITEE.COM does not provide shell access.
   ```


# git将本地分支推送到多个远程

1. 使用命令

   ```shell
   # 添加第一个远程仓库
   git remote add origin https://git.oschina.net/Jicklin/bokeyuan.git
   # 继续添加远程仓库
   git remote set-url --add origin https://github.com/jicklin/bokeyuan.git
   ```

2. 上面命令执行后是修改了.git/config文件，也可以直接修改这个配置文件

   ```shell
   [remote "origin"]
       url = git@gitlab.com:lxdora/xingyun-cli.git
       fetch = +refs/heads/*:refs/remotes/origin/*
       url = git@git.hoge.cn:microfed/xingyun-cli.git
   ```


# git命令行别名

vim ~/.gitconfig

```shell
[core]
	excludesfile = /Users/hoge/.gitignore_global
[difftool "sourcetree"]
	cmd = opendiff \"$LOCAL\" \"$REMOTE\"
	path =
[mergetool "sourcetree"]
	cmd = /Applications/SourceTree.app/Contents/Resources/opendiff-w.sh \"$LOCAL\" \"$REMOTE\" -ancestor \"$BASE\" -merge \"$MERGED\"
	trustExitCode = true
[user]
	name = 李翔
[pull]
	rebase = false
[alias]
br = branch
ci = commit
cl = clone
co = checkout
cp = cherry-pick
cfg = clone
df = diff
fh = fetch
lg = "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
mg = merge
pl = pull
plr = pull --rebase
rb = rebase
ph = push origin HEAD
rmt = remote
rst = reset
sh = stash
st = status
sts = status -s
sbm = submodule
sw = show
swf = "show --name-status"
delb = "push origin --delete"
delt = "push origin :"
mb = merge-base
```

# git初始化时add了错误的文件

当我们初始化一个项目的git，这时可能项目下没有.gitignore文件，然后不小心执行了`git add .`，这时候将整个node_modules文件都add了，这种情况下可以执行`git reset`撤销该错误的add

# git对比两个分支的差异

```shell
# 查看dev分支有而master分支没有的
git log dev ^master
# 查看dev比master多提交了哪些内容
git log master..dev
# 不知道dev和master哪个提交的多，单纯对比两个分支
git log master...develop
```

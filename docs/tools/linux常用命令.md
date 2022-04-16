---
title: linux常用命令
date: 2022-04-11 17:55:00
tags: 
 - linux
categories:
 - 技术文档
---

1. `ps afs | grep apt` 查看apt的进程

2. 进程的几个状态

   > （1）R运行状态（runing）：并不意味着进程一定在运行中，也可以在运行[队列](https://so.csdn.net/so/search?q=队列&spm=1001.2101.3001.7020)里；
   > （2）S睡眠状态（sleeping）：进程在等待事件完成；（浅度睡眠，可以被唤醒）
   > （3）D磁盘睡眠状态（Disk sleep）:不可中断睡眠（[深度](https://so.csdn.net/so/search?q=深度&spm=1001.2101.3001.7020)睡眠，不可以被唤醒，通常在磁盘写入时发生）
   > （4）T停止状态（stopped）：可以通过发送SIGSTOP信号给进程来停止进程，可以发送SIGCONT信号让进程继续运行
   > （5）X死亡状态（dead）:该状态是返回状态，在任务列表中看不到；
   > （6）Z僵尸状态（zombie）:子进程退出，父进程还在运行，但是父进程没有读到子进程的退出状态，子进程进入僵尸状态；
   > （7）t追踪停止状态（trancing stop）

3. `jobs`查看后台进程

4. `fg 1` 将后台进程号为1的进程放到前台执行

5. 
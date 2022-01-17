---
layout: post
title:  "记一次docker部署mysql主从复制(单向)"
date:   2019-04-3
categories: [mysql]
tags: [mysql]
excerpt: 记一次docker部署mysql主从复制(单向)



---

### 原理：

##### 主数据库操作mysql时，生成二进制日志。从数据库向主数据库请求到更新的二进制日志后，根据日志同步从数据库；

#### MySQL主从复制的三个线程：

**1.主节点： binarylog dump thread(用于记录日志binary log)**

**2.从节点：I/O thread(接收主节点binlog dump 进程发来的更新以后，保存到relay-log中)**

**3.从节点：SQL thread(负责读取relay log，解析成具体的操作并执行，最终保证主从数据的一致性)**

如下图所示:

![img](https://pic1.zhimg.com/80/v2-1b0c3f31bd398c39b9e0930059b0ca24_1440w.jpg)



### 环境：docker、mysql版本8.0

**步骤：**

1. **配置一个服务器为 master。**
2. **配置一个服务器为 slave。**
3. **将 slave 连接到 master。**

###  配置master:

##### 将一台服务器配置为 master，要确保服务器有 binlog 和 唯一的服务器ID。

在 my.cnf 中加入以下配置：

```makefile
log-bin=master-bin
log-bin-index=master-bin.index
server-id=1
```

**在 Master 上创建一个特殊复制权限的用户给slave使用:**

```
mysql> CREATE USER 'username' IDENTIFIED BY 'password';
mysql> GRANT REPLICATION SLAVE,SUPER,RELOAD ON *.* TO 'username';
```

### 配置slave:

**在 my.cnf 中加入以下配置(relay 是中继的意思)：**

```
server-id=2
relay-log=slave-relay-bin
relay-log-index=slave-relay-bin.index
```

### 让slave连接master:

在 slave 上执行：

```
mysql> CHANGE MASTER TO
             MASTER_HOST = '172.17.0.2',
             MASTER_PORT = 3306,
             MASTER_USER = 'username',
             MASTER_PASSWORD = 'password',
             GET_MASTER_PUBLIC_KEY = 1;
mysql> START SLAVE;
```

**显示是否配置成功，slave中执行：**

```
mysql> SHOW SLAVE STATUS;
```

```shell
mysql> show slave status \G:

*************************** 1. row ***************************

​        Slave_IO_State: Waiting for source to send event

​         Master_Host: 172.17.0.3

​         Master_User: repl

​         Master_Port: 3306

​        Connect_Retry: 60

​       Master_Log_File: mysql-bin.000009

​     Read_Master_Log_Pos: 156

​        Relay_Log_File: cd30dbb10151-relay-bin.000007

​        Relay_Log_Pos: 371

​    Relay_Master_Log_File: mysql-bin.000009

​       Slave_IO_Running: Yes

​      Slave_SQL_Running: Yes

​       Replicate_Do_DB: 
```


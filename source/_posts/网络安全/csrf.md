---
layout: post
title:  "CSRF跨站请求伪造"
date:   2019-09-18
categories: [网络安全]
tags: [网络安全]
excerpt: 跨站请求伪造
---



### 什么是CSRF攻击?

**CSRF:** Cross Site Regust Forgery跨站请求伪造

一个正常的请求会将合法用户的session id保存到浏览器的cookie。这时候，如果用户在浏览器中打来另一个tab页，那这个
tab页也是可以获得浏览器的cookie。黑客就可以利用这个cookie信息进行攻击。

### 攻击过程

#### 原理及过程

1. 用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；
2. 在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；
3. 用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；
4. 网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；
5. 浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。

#### 例子

1、某银行网站A可以以GET请求的方式发起转账操作。`www.xx.com/transfor.do?accountNum= 100&money= 1000`,accountNum表示目标账户。这个请求肯定是需要登录才可以正常访问的。

2、攻击者在某个论坛或者网站上，上传一 个图片，链接地址是`www.xxx.com/transfer.do?accountNum=888&money=10000`,其中这个accountNum就是攻击者自己的银行账户。

3、如果有一个用户，登录了银行网站，然后又打开浏览器的另一个tab页，点击了这个图片。这时，银行就会受理到一个带了正确cookie的请求，就会完成转账。用户的钱就被盗了。

#### CSRF漏洞检测

检测CSRF漏洞是一项比较繁琐的工作，最简单的方法就是抓取一个正常请求的数据包，去掉Referer字段后再重新提交，如果该提交还有效，那么基本上可以确定存在CSRF漏洞。

随着对CSRF漏洞研究的不断深入，不断涌现出一些专门针对CSRF漏洞进行检测的工具，如CSRFTester，CSRF Request Builder等。

以CSRFTester工具为例，CSRF漏洞检测工具的测试原理如下：使用CSRFTester进行测试时，首先需要抓取我们在浏览器中访问过的所有链接以及所有的表单等信息，然后通过在CSRFTester中修改相应的表单等信息，重新提交，这相当于一次伪造客户端请求。如果修改后的测试请求成功被网站服务器接受，则说明存在CSRF漏洞，当然此款工具也可以被用来进行CSRF攻击。

### CSRF防止方式:

#### 简述

1、尽量使用POST请求，限制GET请求。POST请求可以带请求体，攻击者就不容易伪造出请求。

2、将cookie设置 为HttpOnly : respose.setHeader(“Set-Cookie”,” cookiename=cookievalue;HttpOnly”)。

3、增加token：
在请求中放入一个攻击者无法伪造的信息，并且该信息不存在于cookie当中。
`<input type= 'hidden’value= ' adfasdf'/>`这也是Spring Security框架中采用的防范方式。


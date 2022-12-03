String结构：底层是字节数组

![image-20220915230335763](/Users/iamfenges/Library/Application Support/typora-user-images/image-20220915230335763.png)

Hash字典：(购物车)

![image-20220915230633335](/Users/iamfenges/Library/Application Support/typora-user-images/image-20220915230633335.png)

List:

![image-20220915231429416](/Users/iamfenges/Library/Application Support/typora-user-images/image-20220915231429416.png)

Set:

![image-20220915232539089](/Users/iamfenges/Library/Application Support/typora-user-images/image-20220915232539089.png)

Sorted set:

![image-20220915232524942](/Users/iamfenges/Library/Application Support/typora-user-images/image-20220915232524942.png)



分布式锁：（加锁保证原子性，解锁也需要保证原子性（lua脚本 ））

加锁：set nx ex（过期时间一起设置）

解锁：lua脚本 

问题1: 业务超时

问题2: 删锁怎么保证删除的不是别的线程的锁（setnx时，不要使用固定的值，然后解锁的时候要使用lua保证原子性）



Redission: 优点：不指定过期时间时，会开个线程进行锁续期（看门狗）、可重入锁。

实现了juc的Lock接口：tryLock可以指定最长等待时间、还有自动解锁时间。 

Semaphore: 用于限流（）





数据一致性：

双写模式：更新数据库，更新缓存

失效模式： 更新数据库，删除缓存

![image-20221016222703272](/Users/iamfenges/Library/Application Support/typora-user-images/image-20221016222703272.png)
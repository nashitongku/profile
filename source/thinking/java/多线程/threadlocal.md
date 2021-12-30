ThreadLocal: 

不加锁，所以速度优于Synchronized

每个线程都有一个ThreadLocalMap存储ThreadLocal；每个线程互不干扰；

方法：

get();

set();

initialValue();

remove();

如果当前线程ThreadLocalMap为空时, get()会调用initialValue()，否则直接返回之前的结果；

调用remove()后，get会调用initialValue();



注意：

- ThreadLocalMap的key是弱引用类型，Value是强引用类型，所以在用完ThreadLocal后 调用remove避免Value内存泄漏。

- ThreadLocal不应该去存储静态变量








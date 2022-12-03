方法区（method area): 1.7jdk之前叫永久代，1.8之后叫元空间（meta pace)



3种gc算法：1.mark sweep(标记清除) 2.copy 3.mark compact



定位oom错误：

开启dump输出文件，使用dump工具查看分析错误原因。

定位死锁：

使用jstack
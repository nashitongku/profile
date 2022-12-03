contains方法:

List使用的是equals对比; HashSet使用的是hashCode对比;

add方法:

HashSet使用hashCode去重复



两者关系：equals相等则hashCode必定相等; hashCode相等equals不一定相等；
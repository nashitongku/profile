

准备：

一、语法顺序 与 执行顺序

```
语法顺序
1. SELECT 
2. DISTINCT <select_list>
3. FROM <left_table>
4. <join_type> JOIN <right_table>
5. ON <join_condition>
6. WHERE <where_condition>
7. GROUP BY <group_by_list>
8. HAVING <having_condition>
9. ORDER BY <order_by_condition>
10.LIMIT <limit_number>
```

```
执行顺序
FROM <表名> 选取表，将多个表数据通过笛卡尔积变成一个表。
ON <筛选条件> 对笛卡尔积的虚表进行筛选
JOIN  指定join，用于添加数据到on之后的虚表中，例如left join会将左表的剩余数据添加到虚表中
WHERE 对上述虚表进行筛选
GROUP BY <分组条件> 分组 用于having子句进行判断，在书写上这类聚合函数是写在having判断里面的
HAVING <分组筛选> 对分组后的结果进行聚合筛选
SELECT <返回数据列表> 返回的单列必须在group by子句中，聚合函数除外
DISTINCT 去重复
ORDER BY <排序条件> 排序
LIMIT <行数限制>
```





二、模糊搜索

- 使用MySQL内置函数INSTR(str,substr) 来匹配
- 使用FullText全文索引，用match against 检索(默认是2个, 可以配置最少多少长度的索引，但是需要重新建索引，)

![image-20220907211537979](/Users/iamfenges/Library/Application Support/typora-user-images/image-20220907211537979.png)

三、**导致效率低下的情况**

- **导致全表扫描**
  1. **左模糊查询** 
  2. **in 和not in** 
  3. **否定方式查询：比如 <>,!= (改为 >+or+<这种形式： WHERE col_1 > 100 or col_1 < 100;)**
- **自动进行类型转换**
  1. 

## explain介绍

![image-20220907210204806](/Users/iamfenges/Library/Application Support/typora-user-images/image-20220907210204806.png)

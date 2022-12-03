全文检索：match：按照空格进行分词拆分



#### 创建索引

```http
PUT /provmateriallibrary
```



类似in语句：

```http
GET /provmateriallibrary/_mget
{
  "ids":["TKHaa4QBpIBuIqbhyty-", "TaHaa4QBpIBuIqbh-Nx_"]
}
```



painless日期格式：doc['date'].value.toString('yyyy-MM-dd') 

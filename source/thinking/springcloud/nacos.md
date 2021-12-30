1.参考：https://juejin.cn/post/6974921087922470926

启动：  sh startup.sh -m standalone



2.bootstrap.yml文件配置

```yaml
spring:
  application:
  #服务名称
    name: naocs-service
  profiles:
    active: dev
  cloud:
    nacos:
      config:
      # 配置文件的环境
        group: ${spring.profiles.active}
      # 配置文件的格式
        file-extension: yaml
       # 配置中心的地址
        server-addr: 47.105.198.54:8848
      # 配置文件prefix
        prefix: ${spring.application.name}
     #命名空间
        namespace: mall
```



3. nacos线上配置
   - [x] Data Id： **`${prefix}-${spring.profile.active}.${file-extension}`**
   - [x] Group：按照环境进行划分，dev、test、prod
   - [ ] 


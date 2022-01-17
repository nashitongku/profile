### 一、镜像相关

| command                                                      | describe                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| docker images                                                | 查看已存在的镜像                                             |
| docker images -a docker images -q docker images -qa docker images --digests | 查看已存在的镜像的内部 查看已存在的镜像的ID 查看全部镜像的id 查看镜像说明 |
| docker search xxx                                            | 查看某个镜像 (xxx=tomcat就是查看tomcat的镜像说明)            |
| docker pull xxx:tag                                          | 下载某个镜像 (xxx：镜像名，tag：镜像版本)                    |
| docker rmi name/id:tag docker rmi -f name/id:tag             | 删除某个镜像 强制删除某个镜像                                |



### 二、DockerFile

| name       | describe                                                     |
| ---------- | ------------------------------------------------------------ |
| FROM       | 基础镜像，当前新镜像是基于哪个镜像的（scratch就相当于Java里面的Object） |
| MAINTAINER | 镜像维护者的姓名和邮箱地址                                   |
| RUN        | 容器构建时需要运行的命令                                     |
| EXPOSE     | 当前容器对外暴露出的端口                                     |
| WORKDIR    | 指定在创建容器后，终端默认登录进来的工作目录，一个           |
| ENV        | 用来在构建镜像过程中涉及环境变量                             |
| ADD        | 从宿主机拷贝并解压                                           |
| COPY       | 从宿主机只拷贝                                               |
| VOLUME     | 容器数据卷，用于保存和持久化工作                             |
| CMD        | 指定一个容器启动时要运行的命令,只有最后一个会生效，并且会被docker run 后面的参数替换掉 |
| ENTRYPOINT | 指定一个容器启动时要运行的命令，每一个都会被生效             |
| ONBUILD    | 当构建一个被继承的Dockerfile时运行命令，父镜像在被子镜像继承后，父镜像的ONBUILD被触发 |



### 三、容器相关

| command                                                      | describe                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| docker ps docker ps -as docker ps -l docker ps -n 3          | 查看正在运行的容器 查看全部的容器 上一次运行的容器 上三次运行的容器 |
| docker start id                                              | 启动容器                                                     |
| docker stop id                                               | 关闭容器                                                     |
| docker kill id                                               | 强制停止                                                     |
| docker rm id                                                 | 删除容器                                                     |
| docker rm -f id                                              | 强制删除容器                                                 |
| docker exec -it id xxx docker exec -it id /bin/bash          | 在容器外面去执行一个命令，xxx 就是你要执行的命令 进入某个容器 |
| ctrl+p+Q                                                     | 退出不关闭容器                                               |
| docker inspect --format=’{{.NetworkSettings.IPAddress}}’ 容器名称/容器id | 查看容器独立ip                                               |
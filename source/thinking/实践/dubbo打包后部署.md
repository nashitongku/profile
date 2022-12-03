

分布式id:

Uuid:  1.作为主键占用空间大，不利于二级索引  2.在InnoDB引擎下，UUID的无序性可能会引起数据位置频繁变动，严重影响插入性能

数据库自增： 1.性能受限于数据库 2.	数据量泄露

redis自增： 1.数据丢失

雪花算法： 1.时间回拨



号段模式： 第一个服务器1-100，第二个服务器101-200，依次类推

//1

cd /root/qcommerce-cms/dev
docker-compose pull qcommerce-cms
docker-compose rm -sf qcommerce-cms
docker-compose up -d
docker image prune -f



//2

sudo docker-compose rm -sf qcommerce-cms.preview

sudo docker-compose pull qcommerce-cms.preview

sudo docker-compose up -d qcommerce-cms.preview

sudo docker image prune -f



####  docker 配置cms前端

	 location / {
	    if ($request_method = 'OPTIONS') {
	                add_header Access-Control-Allow-Origin $http_origin;
	                add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
	                add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Token,platform';
	                add_header 'Access-Control-Allow-Credentials' 'true';
	                return 204;
	        }
	
	    proxy_set_header       Host $host;
	        proxy_set_header  X-Real-IP  $remote_addr;
	        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
	        proxy_set_header X-Forwarded-Proto  $scheme;
	        proxy_pass http://localhost:8043/;
	    }


1. ```mysql
   DATE_FORMAT(create_time,'%m-%d')
   ```

2. geometry类型的字段怎么插入

   st_GeomFromText('POINT (116.123 39.345)')

3. ```mysql
   //统计-日期
    SELECT count(1) as `value`, DATE_FORMAT(create_time,'%m-%d') as `date` FROM user
    <where>
    <if test="startDateStr != null and endDateStr != null">
   	 create_time between #{startDateStr} and #{endDateStr}
    </if>
    </where>
    GROUP BY DATE_FORMAT(create_time,'%m-%d')
   ```



4. 逗号拼接ID，select GROUP_CONCAT(id) from sys_menu
4. mac关闭mysql: sudo /usr/local/mysql/bin/mysqladmin -u root -pzxcv1234 shutdown
4. mac开启: sudo /usr/local/MySQL/support-files/mysql.server start

7.多种启动方式

systemctl restart mysqld

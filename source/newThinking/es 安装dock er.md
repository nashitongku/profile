

docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -e "discovery.type=single-node" -d -p 9200:9200 -p 9300:9300 --name elasticsearch e082d8ac7e5e



docker run --name kibana -e ELASTICSEARCH_HOSTS=http://192.168.0.139:9200 -p 5601:5601 -d kibana:7.16.2
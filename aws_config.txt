Nginx Configuration

/etc/nginx/nginx.conf 

user ubuntu;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    client_body_buffer_size 100k;
    client_header_buffer_size 1k;
    client_max_body_size 100k;
    large_client_header_buffers 2 1k;
    client_body_timeout 10;
    client_header_timeout 10;
    keepalive_timeout 5 5;
    send_timeout 10;
    server_tokens off;
    #gzip  on; on;

    include /etc/nginx/conf.d/*.conf;
}


/etc/nginx/conf.d/default.conf

server {
    #listen       80;
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name  yourdomain.com;

    access_log /home/ubuntu/client/server_logs/host.access.log main;

    location / {
        root   /home/ubuntu/client/deploy;
        index  index.html index.htm;
        try_files $uri /index.html;
        add_header X-Frame-Options SAMEORIGIN;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubdomains;";
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    server_tokens off;

    location ~ /\.ht {
        deny  all;
    }

}

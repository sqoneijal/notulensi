FROM alpine:3.19

RUN apk --no-cache --update add \
   file \
   nginx \
   php83 \
   php83-ctype \
   php83-curl \
   php83-dom \
   php83-fileinfo \
   php83-fpm \
   php83-iconv \
   php83-intl \
   php83-mbstring \
   php83-openssl \
   php83-pdo_pgsql \
   php83-pecl-redis \
   php83-pgsql \
   php83-phar \
   php83-session \
   php83-tokenizer \
   postgresql-client \
   tzdata

# Atur zona waktu ke Asia/Jakarta
ENV TZ=Asia/Jakarta

WORKDIR /var/www/html

RUN ln -s /usr/bin/php83 /usr/bin/php

COPY ./nginx.conf /etc/nginx/http.d/default.conf
COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

# Port yang akan digunakan oleh Nginx
EXPOSE 80

ENTRYPOINT ["sh", "/usr/local/bin/entrypoint.sh"]

# Command untuk menjalankan Nginx pada background
# CMD ["sh", "-c", "nginx && php-fpm83 -F"]
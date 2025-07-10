#!/bin/sh

# Pastikan folder writable ada
mkdir -p /var/www/html/writable/cache

# Set permission & ownership
chmod -R 777 /var/www/html/writable/cache

# Jalankan Nginx & PHP-FPM
nginx
php-fpm83 -F

FROM php:apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

WORKDIR /var/www/html/

EXPOSE 80

# FROM alpine:3.19

# RUN apk update
# RUN apk upgrade
# RUN apk add apache2
# RUN apk add apache2-ssl
# RUN apk add curl
# RUN apk add php82-apache2
# RUN apk add php82-bcmath
# RUN apk add php82-bz2
# RUN apk add php82-calendar
# RUN apk add php82-common
# RUN apk add php82-ctype
# RUN apk add php82-curl
# RUN apk add php82-dom
# RUN apk add php82-gd
# RUN apk add php82-iconv
# RUN apk add php82-mbstring
# RUN apk add php82-mysqli
# RUN apk add php82-mysqlnd
# RUN apk add php82-openssl
# RUN apk add php82-pdo_mysql
# RUN apk add php82-pdo_pgsql
# RUN apk add php82-pdo_sqlite
# RUN apk add php82-phar
# RUN apk add php82-session
# RUN apk add php82-xml
# RUN apk add php82-pecl-xdebug

# # exec /usr/sbin/httpd -D FOREGROUND -f /web/config/httpd.conf
# CMD ["-D","FOREGROUND"]

# # Srart httpd when container runs
# ENTRYPOINT ["/usr/sbin/httpd"]

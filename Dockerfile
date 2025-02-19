FROM php:apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

RUN apt-get update && apt-get install -y certbot python3-certbot-apache

WORKDIR /var/www/html/

EXPOSE ${port} ${port2}
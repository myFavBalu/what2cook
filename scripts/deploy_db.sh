#!/bin/sh

source variables.sh

echo "${info}copying database to server${default}"

scp -r ../backend/var/data.db what2cook:/var/www/html/backend/var

echo "${info}setting permissions for db-files${default}"

ssh what2cook '
chown -R www-data:www-data /var/www/html/backend/var/ &&
find /var/www/html/backend/var/ -type f -exec chmod 660 {} \; &&
find /var/www/html/backend/var/ -type d -exec chmod 770 {} \;'

echo "${success}finished deploying database!${default}"

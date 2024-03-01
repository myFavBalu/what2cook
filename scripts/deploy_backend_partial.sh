#!/bin/sh

source variables.sh

echo "${info}copying backend to server (partial)${default}"

cd ../
echo "${info}copying Controllers${default}"
scp -r backend/src/Controller what2cook:/var/www/html/backend/src/

echo "${info}copying Services${default}"
scp -r backend/src/Service what2cook:/var/www/html/backend/src/

echo "${info}copying Entities${default}"
scp -r backend/src/Entity what2cook:/var/www/html/backend/src/

echo "${info}copying Repositories${default}"
scp -r backend/src/Repository what2cook:/var/www/html/backend/src/

echo "${info}copying php-config${default}"
scp -r backend/config what2cook:/var/www/html/backend/config



echo "${success}finished deploying (partial) backend!${default}"

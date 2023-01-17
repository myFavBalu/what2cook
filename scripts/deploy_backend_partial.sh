#!/bin/sh

source config.sh

echo "${info}copying backend to server (partial)${default}"

echo "${info}copying Controllers${default}"
scp -r backend/src/Controller what2cook:/var/www/html/backend/src/Controller
echo "${info}copying Services${default}"
scp -r backend/src/Service what2cook:/var/www/html/backend/src/Service
echo "${info}copying Entities${default}"
scp -r backend/src/Entity what2cook:/var/www/html/backend/src/Entity
echo "${info}copying Repositories${default}"
scp -r backend/src/Repository what2cook:/var/www/html/backend/src/Repository

echo "${success}finished deploying (partial) backend!${default}"

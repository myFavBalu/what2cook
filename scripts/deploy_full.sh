#!/bin/sh

source config.sh

cd ../

echo "${info}copying config to server${default}"
scp -r serverconfig/nginx what2cook:/etc

echo "${info}building project${default}"
yarn build

echo "${info}copying build to server${default}"
scp -r build what2cook:/var/www/html

echo "${info}copying backend to server${default}"
scp -r backend what2cook:/var/www/html

echo "${success}finished deploying everything!${default}"

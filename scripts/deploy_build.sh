#!/bin/sh

source variables.sh

echo "${info}building project${default}"
cd ../
yarn build

echo "${info}copying build to server${default}"
scp -r build what2cook:/var/www/html

echo "${success}finished deploying build!${default}"

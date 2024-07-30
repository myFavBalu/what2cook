#!/bin/sh

source variables.sh

echo "${info}building project${default}"
cd ../
yarn build

tar -czvf build.tar.gz build

echo "${info}copying build to server${default}"
scp -r build.tar.gz what2cook:/var/www/html

echo "${info}removing old build${default}"
ssh what2cook "rm -rf /var/www/html/build"

echo "${info}unpacking new build on server${default}"
ssh what2cook "tar -xzvf /var/www/html/build.tar.gz -C /var/www/html/"

echo "${info}removing compressed files${default}"
ssh what2cook "rm -f /var/www/html/build.tar.gz"
rm -f build.tar.gz

echo "${success}finished deploying build!${default}"

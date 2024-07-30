#!/bin/sh

source variables.sh

echo "${info}compressing backend${default}"
cd ../
tar -czvf backend.tar.gz backend

echo "${info}copying backend to server${default}"
scp backend.tar.gz what2cook:/var/www/html

echo "${info}removing old backend${default}"
ssh what2cook "rm -rf /var/www/html/backend"

echo "${info}unpacking new backend on server${default}"
ssh what2cook "tar -xzvf /var/www/html/backend.tar.gz -C /var/www/html/"

echo "${info}removing compressed files${default}"
ssh what2cook "rm -f /var/www/html/backend.tar.gz"
rm -f backend.tar.gz

echo "${success}finished deploying backend!${default}"


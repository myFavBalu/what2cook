#!/bin/sh

source config.sh

echo "${info}copy config to server${default}"
cd ../
scp -r serverconfig/nginx what2cook:/etc
echo "${success}finished copying config!${default}"

echo "${info}restarting nginx${default}"
ssh what2cook "systemctl restart nginx"

echo "${success}finished deplyoing config!${default}"

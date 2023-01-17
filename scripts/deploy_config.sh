#!/bin/sh

source config.sh

echo "${info}copy config to server${default}"
cd ../
scp -r serverconfig/nginx what2cook:/etc

echo "${success}finished deploying config!${default}"

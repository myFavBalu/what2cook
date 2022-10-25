#!/bin/sh

echo " \033[0;104mncopy config to server\033[97;40m"
cd ../
scp -r serverconfig/nginx what2cook:/etc

echo "finished deploying config!"

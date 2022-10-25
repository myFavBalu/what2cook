#!/bin/sh

echo "copy config to server"
cd ../
scp -r serverconfig/nginx what2cook:/etc

echo "finished deploying config!"

#!/bin/sh

cd ../

echo "copying config to server"
scp -r serverconfig/nginx what2cook:/etc

echo "building project"
yarn build

echo "copying build to server"
scp -r build what2cook:/var/www/html

echo "copying backend to server"
scp -r backend what2cook:/var/www/html

echo "finished deploying everything!"

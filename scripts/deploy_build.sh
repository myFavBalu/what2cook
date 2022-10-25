#!/bin/sh

echo "building project"
cd ../
yarn build

echo "copying build to server"
scp -r build what2cook:/var/www/html

echo "finished deploying build!"

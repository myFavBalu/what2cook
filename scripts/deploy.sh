#!/bin/sh

echo "building project"
cd ..
yarn build

echo "copy to server"
scp -r build what2cook:/var/www/html

echo "finished!"

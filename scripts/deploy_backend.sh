#!/bin/sh

source config.sh

echo "${info}copying full backend to server${default}"
scp -r backend what2cook:/var/www/html

echo "${success}finished deploying backend!${default}"

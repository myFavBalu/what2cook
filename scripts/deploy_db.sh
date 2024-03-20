#!/bin/sh

source variables.sh

echo "${info}copying database to server${default}"

scp -r ../backend/var/data.db what2cook:/var/www/html/backend/var

echo "${success}finished deploying database!${default}"

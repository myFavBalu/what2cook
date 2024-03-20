#!/bin/sh

source variables.sh

echo "${info}Copying database from server${default}"

scp what2cook:/var/www/html/backend/var/data.db ../backend/var/data.db

echo "${success}Successfully copied Db from server${default}"
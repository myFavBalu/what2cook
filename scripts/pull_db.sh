#!/bin/sh

source config.sh

echo "${info}Copying database from server${default}"

scp what2cook:/var/www/html/backend/var/data.db /home/lbrie/IdeaProjects/what2cook/backend/var/data.db

echo "${success}Successfully copied Db from server${default}"
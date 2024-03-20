#!/bin/sh

source variables.sh

echo "${info}Copying config from server${default}"

scp -r what2cook:/etc/nginx ../serverconfig/

echo "${info}removing sites-enabled${default}"
rm -r ../serverconfig/nginx/sites-enabled

echo "${success}Successfully copied config from server${default}"
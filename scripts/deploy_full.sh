#!/bin/sh

source config.sh

echo "${info}Starting full deployment${default}"

bash deploy_config.sh

bash deploy_build.sh

bash deploy_backend.sh

echo "${success}finished deploying everything!${default}"

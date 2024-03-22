#!/bin/sh

source variables.sh

echo "${info}Starting full deployment${default}"

bash deploy_config.sh

bash deploy_build.sh

# includes the db
bash deploy_backend.sh

echo "${success}finished deploying everything!${default}"

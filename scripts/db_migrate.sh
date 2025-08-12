#!/bin/sh

cd ../backend

php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate

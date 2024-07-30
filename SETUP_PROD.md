# Installation-Guide for Debian 11:
First of all to make sure that everything is up to date:</br>
`sudo apt update && sudo apt upgrade`

## NGINX:
Webserver-Software
### removing apache
This step is only necessary, in case your serverimage comes with apache preinstalled, to prevent collisions with nignx</br>
`sudo service apache2 stop`</br>
`sudo apt --purge apache2 apache2-utils apache2.2-bin apache2-common`</br>
`sudo apt auto remove`</br>
### installing NGINX
`sudo apt install nginx`</br>
### checking the status of NGINX
`sudo systemctl status nginx`</br>

## PHP8.2
Interpreter for the PHP-based Backend
### enabling sury repo
`sudo apt install gnupg2`</br>
`sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list‘`</br>
`wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add -`</br>
### installing PHP8.3
`sudo apt update`</br>
`sudo apt install php8.3`</br>
### support for the sqlite db
`sudo apt install php8.3-sqlite3`</br>

## Symfony
A powerful PHP framework
### installing composer
`php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"`</br>
`php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"`</br>
`php composer-setup.php`</br>
`php -r "unlink('composer-setup.php');"`</br>
`sudo mv composer.phar /usr/local/bin/composer`</br>
### installing the symfony cli
`sudo apt install curl`</br>
`curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | sudo -E bash`</br>
`sudo apt install symfony-cli`</br>

## PHP-FPM
A process manager for PHP-Scripts
### installing PHP-FPM
`apt install php8.3-fpm`</br>
`chown nginx:nginx /var/run/php/php8.3-fpm.sock`</br>
### checking the status of PHP-FPM
`systemctl status php8.3-fpm`</br>
### configuring pools
TODO

## sqlite3
A lightweight database-engine
`sudo apt install sqlite3`</br>

## Deploy the project
navigate to `/scripts`
> deploy_full deploys the whole project - including the dependencies of the backend if they are already installed in your frontend - which might take a while. </br>
You could remove the vendor-directory from the script and then install the composer dependencies on the server afterwards which should be way faster.

`bash deploy_full`</br>
`ssh what2cook`</br>
`cd /var/www/html/backend`</br>
`composer install`</br>
Last but not least: install & use certbot following the instructions on their website





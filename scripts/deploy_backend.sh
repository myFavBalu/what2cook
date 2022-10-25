#!/bin/sh

echo "copying backend to server"
scp -r backend what2cook:/var/www/html

echo "finished deploying backend!"

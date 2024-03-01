# Getting started with what2cook

## Setup

Your first step after cloning this repository should be installing all dependencies.

To do that for the frontend navigate to /src and run `yarn` or `npm install` (if you do not have either package manager then you need to install one first).

For the backend dependencies, you need the package manager composer. After acquiring composer navigate to the /backend directory and simply run `composer install.

Congratulations, you can now run w2c locally.

## Frontend (dev)

To run the frontend in development mode, navigate to the src directory and run `yarn start`. This will open the frontend on http://localhost:3000 in your browser. The page will automatically reload as you make edits. If there are any build errors, they will be displayed in the console.

## Backend (dev)

To start the Symfony server for the backend in development mode, navigate to the backend directory and run `symfony server:start`.

## Production Deployment

The current nginx configuration is for what2cook.dev, as this is a .dev domain a ssl-certificate is required. 
I recommend using certbot for easy and automatic handling of the matter.

## Scripts

All important scripts for deployment and more can be found under `/scripts`. Note that these scripts assume that you have a ssh-config for the target server with the Host "what2cook".

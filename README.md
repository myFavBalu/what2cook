# Getting started with what2cook

## Setup

Your first steps after cloning this repository should be installing all dependencies.

To do that for the frontend navigate to /src and run `yarn` or `npm install` (if you do not have either packagemanager then you need to install one first).

For the backend dependencies you need the packagemanager composer. After acquiring composer navigate to the /backend directory and simply run `composer install.

Congratulations, you can now run w2c locally.

## Frontend (dev)

To run the frontend in development mode, navigate to the src directory and run `yarn start`. This will open the frontend on http://localhost:3000 in your browser. The page will automatically reload as you make edits. If there are any lint errors, they will be displayed in the console.
## Backend (dev)

To start the Symfony server for the backend in development mode, navigate to the backend directory and run `symfony server:start`.
## Scripts

All important scripts for deployment and more can be found under `/scripts`. Note that these scripts assume that you have an ssh-config for the target server with the Host "what2cook".

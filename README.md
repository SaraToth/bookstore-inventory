# Bookstore Inventory
A simple CRUD App in Node.js and Express to manage bookstore inventory across multiple branches of a franchise.


## Getting Started

run the following in your terminal to install all dependencies
```
npm install
```

### Setting up a local database

Make sure that you have psql downloaded
Then you will need to run psql and use the command to create a local database
```
CREATE DATABASE <database-name>
```

and make sure to connect to it via:
```
\c <database-name>
```
Then make a copy of the .env-template and create your local .env file.
You will need to add in your local role name and password, as well as your local database name.

Then you can run the command in your terminal to seed data
```
node seed.js
```
## Setting up your production database

If you would like to use this app for your own inventory system, you just need to set up your own production-level database then you can run the following command to initalize all of the necessary tables for your database.
```
node setup.js
```


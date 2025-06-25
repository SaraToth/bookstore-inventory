# bookstore-inventory
An application to manage book inventory for a bookstore franchise


## Getting Started

run the following in your terminal to install all dependencies
```
npm install
```

Make sure that you have psql downloaded
Then you will need to run psql and use the command to create a local database
```
CREATE DATABASE <database-name>
```

and make sure to connect to it via:
```
\c <database-name>
```

Then you can run the command in your terminal to seed data
```
node seed.js
```

or if you would like to set up a production-ready environment then run
```
setup.js
```
to create all your tables
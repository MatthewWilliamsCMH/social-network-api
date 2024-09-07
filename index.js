//this file replaces server.js in this app. WHY?
const express = require('express'); //load express server
const db = require('./config/connection'); //assign the mongo database created in connection.js to the variable "db"
const routes = require('./routes'); //assign the subdirectory to the variable "routes" to simplify accessing those routes

const PORT = process.env.PORT || 3001; //set port to whatever is defined in the environment variable OR 3001
const app = express(); // assign the instance of the express application to the "app" variable

app.use(express.urlencoded({ extended: true })); //configures app (an express instance) to handle urls properly
app.use(express.json()); //configures app to handle JSON
app.use(routes); //this tells app where to find route handlers (the index.js file in the routes folder loads the specific route files)

db.once('open', () => {  //this block registers an event listener that waits for a connection to the db; "once" ensures that it only makes one connection
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
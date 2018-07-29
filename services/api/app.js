//Include api modules.
const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');

//Include api rest functions.
const api = require('./api.js');

//Include config.
const configLib  = require('../../lib/config.js');

//Include resource routes.
const routeRestaurant = require('./routes/restaurant.js');
const routeMeal       = require('./routes/meals.js');
const routeUser       = require('./routes/user.js');

//Start Express-js
const app    = express();
const server = http.createServer(app);

//Add bodyparser and CORS.
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(api.CORS);

try{

  //Load config file.
  let config  = configLib.getConfig('./config/config.json');

  //Bind the api routes.
  app.use('/restaurant/',routeRestaurant);
  app.use('/meal/',routeMeal);
  app.use('/user/',routeUser);

  //Inicio el server.
  app.listen(config.services.api.port,
             config.services.api.ip,
             api.onListen);

} catch(e){
  console.log('Error in boostrap',e);
}
//Include api modules.
const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');

//Include api rest functions.
const api = require('./api.js');

//Include config.
const configLib  = require('../../lib/config.js');

//Include resource routes.
const routes = require('./routes/routes.js');

//Start Express-js
const app    = express();
const server = http.createServer(app);

//Add bodyparser and CORS.
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(api.CORS);

try{

  //Load config file.
  let config  = configLib.getConfig('./config/config.json');

  //Bind the api routes.
  app.use('/restaurant/',routes.restaurant);
  app.use('/meal/',routes.meal);
  app.use('/user/',routes.user);
  app.use('/order/',routes.order);

  //Inicio el server.
  app.listen(config.services.api.port,
             config.services.api.ip,
             api.onListen);

} catch(e){
  console.log('Error in boostrap',e);
}
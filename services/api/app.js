//Include api modules.
const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');

//Include api rest functions.
const api = require('./api.js');

//Start Express-js
const app    = express();
const server = http.createServer(app);

//Add bodyparser and CORS.
app.use(bodyParser.json());
app.use(api.CORS);

//Include custom libs.
const configLib = require('../../lib/config.js');
const errorLib  = require('../../lib/error.js');

//Load config File.
configLib.getConfig('./config/config.json').then((configData)=>{

  global.config = configData;

  //Include resource routes.
  const routes = require('./routes/routes.js');

  //Bind the api routes.
  app.use('/restaurant/',routes.restaurant);
  app.use('/meal/',routes.meal);
  app.use('/user/',routes.user);
  app.use('/order/',routes.order);

  try{

    //Bind the socket.
    app.listen(config.services.api.port,config.services.api.ip,api.onListen);

  } catch(e){
    console.log(errorLib.msg('SOCKET'));
  }

}).catch((error)=>{  
  console.log(error);
  console.log(errorLib.msg('CONFIG'));

});


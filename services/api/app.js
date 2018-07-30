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
const mqLib     = require('../../lib/rabbit.js');

//All the server start process in one async function.
const boostrap = async ()=>{

  //Load config File.
  try{
    
    let configData = await configLib.getConfig('./config/config.json');
    global.config  = configData;

  } catch(error){
    console.log(errorLib.msg('CONFIG'));
    process.exit();
  }

  //Include resource routes and load routes.
  const routes = require('./routes/routes.js');

  //Bind the api routes.
  app.use('/restaurant/',routes.restaurant);
  app.use('/meal/',routes.meal);
  app.use('/user/',routes.user);
  app.use('/order/',routes.order);
  
  //Rabbitmq load.
  global.rabbit = {conn:null,ch:null,ex:null};

  //Create connections, channels and exchange.
  global.rabbit.conn = await mqLib.connection(global.config.rabbitmq.url);
  global.rabbit.ch   = await mqLib.createChannel(global.rabbit.conn);
  global.rabbit.ex   = await mqLib.newExchange(global.rabbit.ch);

  //Start and bind sockets.
  try{

    //Bind the socket.
    app.listen(config.services.api.port,config.services.api.ip,api.onListen);

  } catch(e){
    console.log(errorLib.msg('SOCKET'));
  }

  return true;

}

//Start the server.
boostrap().then((stat)=>{

  console.log(errorLib.msg('OKSRV'));

}).catch((err)=>{

  console.log(errorLib.msg('SERVER'),err);

})

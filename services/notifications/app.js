const amqp      = require('amqplib/callback_api');

//Include custom libs.
const configLib = require('../../lib/config.js');
const errorLib  = require('../../lib/error.js');
const notify    = require('./notify.js');

//All the server start process in one async function.
const boostrap = async ()=>{

  try{

    //Load config.
    let configData = await configLib.getConfig('./config/config.json');
    global.config  = configData;

  } catch(error){

    console.log(errorLib.msg('CONFIG'));
    process.exit();

  }

  //Start rabbitmq client.
  await notify.enableMqClient();

  return true;

}

//Start the server.
boostrap().then((stat)=>{

  console.log(errorLib.msgOk('OKSRV'));

}).catch((err)=>{

  console.log(errorLib.msg('SERVER'),err);

});
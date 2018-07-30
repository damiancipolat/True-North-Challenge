const mqLib  = require('../../lib/rabbit.js');
const sms    = require('./sms.js');
const email  = require('./email.js');

//Enable and config the connection to the server.
const enableMqClient = async ()=>{

  //Rabbitmq load.
  let rabbit = {conn:null,ch:null,ex:null,q:null};

  //Create connections, channels and exchange.
  rabbit.conn = await mqLib.connection(global.config.rabbitmq.url);
  rabbit.ch   = await mqLib.createChannel(rabbit.conn);
  rabbit.ex   = await mqLib.newExchange(rabbit.ch);
  rabbit.q    = await mqLib.assertQueue(rabbit.ch,'');  

  //Bind notifications from this queues.
  await mqLib.bindQueue(rabbit.ch,rabbit.q.queue,'notif-exchange','notif');
  await mqLib.bindQueue(rabbit.ch,rabbit.q.queue,'notif-exchange','order');

  let logFile = global.config.services.notifications.logFile;
    
  //Consume events.
  mqLib.consume(rabbit.ch,rabbit.q.queue,(dataMsg)=>{

  	console.log('> Receive from queue',dataMsg);

  	if (dataMsg.routeKey=='order'){
  		email.send(dataMsg)
  			.then(()      => console.log('> Notification sent. email'))
  			.catch((err)  => console.log('> Error in notification sent. email',err));
  	}

  	if (dataMsg.routeKey=='notif'){
  		sms.send(dataMsg,logFile)
  			.then(()     => console.log('> Notification sent. sms'))
  			.catch((err) => console.log('> Error in notification sent. sms'));
  	}

  });

	return 1;

}

module.exports.enableMqClient = enableMqClient;

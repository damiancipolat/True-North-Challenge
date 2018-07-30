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
  mqLib.consume(rabbit.ch,rabbit.q.queue,(data)=>{

  	if (data.routeKey=='order'){
  		email.send(data)
  			.then(()  => console.log('> Notification sent. email'))
  			.catch((ee) => console.log('> Error in notification sent. email',ee));
  	}

  	if (data.routeKey=='notif'){
  		sms.send(data,logFile)
  			.then(()  => console.log('> Notification sent. sms'))
  			.catch((err) => console.log('> Error in notification sent. sms',err));
  	}

  });

	return 1;

}

module.exports.enableMqClient = enableMqClient;

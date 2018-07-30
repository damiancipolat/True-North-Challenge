const amqp  = require('amqplib/callback_api');

const exchangeName = 'notif-exchange';

const queueList = {
	ORDER : 'order',
	NOTIF : 'notif',
	INFO  : 'info',
};

//Connect to server.
const connection = (url)=>{

	return new Promise((resolve,reject)=>{

		amqp.connect(url, (err, conn)=>{

			if (err)
				reject(err);
			else
				resolve(conn);

		});

	});

}

//Create channel.
const createChannel = (conn)=>{

	return new Promise((resolve,reject)=>{

		conn.createChannel((err,ch)=>{

			if (err)
				reject(err);
			else
				resolve(ch);

		});

	});

}

//Create Exchange.
const newExchange = (channel,)=>{

	return new Promise((resolve,reject)=>{

		try {

			channel.assertExchange(exchangeName, 'direct', {durable: false});
			resolve(channel);

		} catch(error){
			reject(error);
		}

	});

}

//Publish Message.
const publishMsg = (channel,qeue,msgObj)=>{

	return new Promise((resolve,reject)=>{

		try {
			console.log(exchangeName, queueList[qeue], new Buffer(msgObj));
			let res = channel.publish(exchangeName, queueList[qeue], new Buffer(msgObj));
			resolve(res);

		} catch(error){
			console.log(error);
			reject(error);
		}

	});

}

module.exports.connection 	 = connection;
module.exports.createChannel = createChannel;
module.exports.newExchange   = newExchange;
module.exports.publishMsg    = publishMsg;
module.exports.queueCode     = queueList;
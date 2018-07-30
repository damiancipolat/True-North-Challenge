const logger     = require('../../lib/logger.js');
const nodemailer = require('nodemailer');

//Create transport nodemail
const createTransport = ()=>{

  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
		user: global.config.mailer.user,
        pass: global.config.mailer.pwd
    }
  });

}

//Create email body.
const createBody = (origin,destiny,subject,content)=>{

	return {
    	from: origin,
    	to: destiny,
	    subject: subject,
    	html: content
  }

}

//Send sms.
const send = (dataNotif)=>{

	return new Promise((resolve,reject)=>{

		let content     = JSON.parse(dataNotif.content);
		let transporter = createTransport();	
		
  	if (content.restaurant.email!=null){

  		let destiny = content.restaurant.email;
  		let origin  = 'noreply@api.com';
  		let html    = '<h3><b>You receive a new order</b></h3><br> ID:'+content.restaurant.order.id+' cost USD$ '+content.restaurant.order.cost;
			let body    = createBody(origin,destiny,'New order',html);
			
	  	transporter.sendMail(body, (err, info) => {

	  		if (err)
		  		reject(err);
	  		else
		  		resolve(info);

	  	});

  	}else
  		reject({"error":"message with email null"});  	

  });

}

module.exports.send = send;
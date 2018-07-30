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
const send = (dataNotif,file)=>{

	let transport = createTransport();
	let body 	    = createBody();

	return new Promise((resolve,reject)=>{

	  transporter.sendMail(mailOptions, (err, info) => {

	  	if (err)
	  		reject(err);
	  	else
	  		resolve(info);
	  	
	  };

	});

}

module.exports.send = send;
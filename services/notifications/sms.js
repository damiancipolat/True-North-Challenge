const logger  = require('../../lib/logger.js');

//Simulate sms send
const send = (dataNotif,file)=>{
  
  let content = JSON.parse(dataNotif.content);
  let smsText = 'To > '+content.client.phone+', hello your order is on the way, arrival time '+content.client.eta+'\r\n';
  
  //Log to file.
  return logger.log(smsText,file);

}

module.exports.send = send;
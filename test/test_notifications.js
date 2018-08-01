const assert  = require('assert');
const config  = require('../config/config.json');

global.config  = config;
const rabbitmq = require('../lib/rabbit.js');
const logger   = require('../lib/logger.js');
const mailer   = require('../services/notifications/email.js');

describe("Order messaging service - TEST", ()=>{

  //RabbitMQ .
  describe("RabbitMQ", ()=>{

    it("Test connection", (done)=>{

      rabbitmq.connection(config.rabbitmq.url)
        .then((result) =>{
          assert(result!=null);
          done();
        })
        .catch((err) =>{
          assert(false);
          done();            
        });

    });

  });

  //Log to file.
  describe("Lof to file", ()=>{

    it("Log to file", (done)=>{

      logger.log('> test write \r\n',config.services.notifications.logFile)
        .then((eta) =>{
          assert(eta!='');
          done();
        })
        .catch((err) =>{
          assert(false);
          done();            
        });

    });

  });

  //Send email.
  describe("Send E-mail", ()=>{    

    it("Sending email", (done)=>{

      let data = {
        restaurant:{          
          email : 'damian.cipolat@gmail.com',
          order :{
            id   : 1,
            cost : 100           
          }
        }
      };

      mailer.send({content:JSON.stringify(data)})
        .then((result) =>{
          assert(result!='');
          done();
        })
        .catch((err) =>{
          assert(false);
          done();            
        });

    }).timeout(5000);

  });


});
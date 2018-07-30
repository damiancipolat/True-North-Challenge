const assert  = require('assert');
const config  = require('../config/config.json');

global.config  = config;
const rabbitmq = require('../lib/rabbit.js');
const logger   = require('../lib/logger.js');

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


});
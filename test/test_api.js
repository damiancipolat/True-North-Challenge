const assert  = require('assert');
const config  = require('../config/config.json');

global.config       = config;
global.config.debug = false;

const db       = require('../models/db.js').connection();
const models   = require('../models/models.js');
const mapsApi  = require('../lib/mapsApi/baseApi.js')
const Point    = require('../lib/mapsApi/point.js');
const rabbitmq = require('../lib/rabbit.js');

describe("Api Rest service - TEST", ()=>{

  //Test db connection.
  describe("Database test", ()=>{

    it("Connecting", (done)=>{

      db.authenticate()
        .then((status) =>{
          assert(true);
          done();
        })
        .catch((err) =>{
          assert(false);
          done();            
        });

    });

    it("Model check - USER", (done)=>{

      models.User.findOne()
        .then((user)=>{
          assert(user!=null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    it("Model check - RESTAURANT", (done)=>{

      models.Restaurant.findOne()
        .then((store)=>{
          assert(store!=null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    it("Model check - MEAL", (done)=>{

      models.Meal.findOne()
        .then((meal)=>{
          assert(meal!=null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    it("Model create - RATE", (done)=>{

      models.Rate.create({
        value : 10,
        restaurant_id : 1,
        user_id : 1
      })
        .then((add)=>{
          assert(add!=null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    it("Model create - ORDER", (done)=>{

      models.Order.create({
        address   : 'test street', 
        latitude  : 0,
        longitude : 0, 
        user_id   : 1,
        restaurant_id : 1,
        eta : '10 min',
        cost : 100
      })
        .then((add)=>{
          assert(add!=null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    it("Model create - ORDER_MEAL", (done)=>{

      models.OrderMeal.create({
        order_id : 1, 
        meal_id  : 1
      })
        .then((add)=>{
          assert(add!=null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

  });

  //Test Google Maps API.
  describe("Google Maps Api", ()=>{

    it("ETA - Calc", (done)=>{

      //Some randoms points.
      let origin = new Point(-34.6108573,-58.4149374);
      let destiny= new Point(-34.860601,-58.3959097);

      //Instance api maps.
      let api   = new mapsApi('googleMaps',origin,destiny,config.services.api.mapsKey);

      api.calc()
        .then((eta) =>{
          console.log(eta);
          assert(eta!='');
          done();
        })
        .catch((err) =>{
          assert(false);
          done();            
        });

    });

  });

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

});
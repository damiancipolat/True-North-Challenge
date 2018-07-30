const express = require('express');
const router  = express.Router();

//Include module
const models  = require('../../../models/models.js');

//Custom libs
const error    = require('../../../lib/error.js');
const promise  = require('../../../lib/promise.js');
const mapsApi  = require('../../../lib/mapsApi/baseApi.js');
const point    = require('../../../lib/mapsApi/point.js');
const rabbitmq = require('../../../lib/rabbit.js');

//Validate format.
const validRequest = (req)=>{

  if (req)
    return ((req.address)&&(req.userId)&&(req.restaurantId)&&(req.meals)&&(req.position));
  else
    return null;

}

//Calc the cost of the order.
const calcOrderCost = async (idList)=>{

  //Find all the meals.
  let meals = await models.Meal.findAll({
                where: {
                    id: idList 
                }
            });

  //Calc the full cost.
  let cost = 0;

  meals.forEach((meal)=> cost+= meal.dataValues.cost);

  return cost;

}

//Save order meal list.
const newOrderMeal = (orderId,mealList)=>{

  let prom = [];

  mealList.forEach((mealId)=>{

    prom.push(models.OrderMeal.create({
      order_id :orderId,
      meal_id  :mealId
    }));

  });

  return Promise.Complete(prom);

}

//Build notification object.
const buildNotifObj = (user,store,order,cost,eta)=>{

  return {
    restaurant:{          
      email : store.email,
      order :{
        id   : order.id,
        cost : cost           
      }
    },
    client:{
      phone : user.phone,
      eta   : eta
    }
  };

}

//Send notifications.
const sendNotification =  (msg,queueName)=>{

  return new Promise((resolve,reject)=>{

    let jsonMsg = JSON.stringify(msg);

    rabbitmq.publishMsg(global.rabbit.ch,queueName,jsonMsg)
      .then((data) => resolve(data))
      .catch((err) => reject(err));

  });

}

//Save new order.
const newOrder = async (data)=>{

  try {

    //Get user by id.
    let user = await models.User.findById(data.userId);

    //Get store by id.
    let store= await models.Restaurant.findById(data.restaurantId);

    //If the ids are valids.
    if ((user!=null)&&(store!=null)){
 
      //Position.
      let origin  = new point(data.position.lat,data.position.lng);
      let destiny = new point(store.latitude,store.longitude);

      //Calc ETA time.
      let etaTime = '';

      try{
        etaTime  = await new mapsApi('googleMaps',origin,destiny,global.config.services.api.mapsKey).calc();
      }catch(e){
        console.log(error.msg('MAPS'));        
      }     
               
      //Calc the order cost.
      let orderCost = await calcOrderCost(data.meals);
     
      //Save the order.
      let orderNew = await models.Order.create({
        address   : data.address,
        latitude  : data.position.lat,
        longitude : data.userId.lng,
        user_id   : data.userId,
        restaurant_id : data.restaurantId,
        eta  : etaTime,
        cost : orderCost
      });

      //Save the meal order list.
      await newOrderMeal(orderNew.id,data.meals);

      //Notif the new order.
      let msg = buildNotifObj(user,store,orderNew,orderCost,etaTime);

      //Send notification to the queue server.
      await sendNotification(msg,'ORDER');
      await sendNotification(msg,'NOTIF');      

      //Response object.
      return {
        id   : orderNew.id,
        eta  : etaTime,
        cost : orderCost
      }   
      
    } else
        return error.msg('BADREQ');

    return 0;

  }catch(error){

    throw new Error(error.msg('QUERY'));
  }

}

//Get the order by Id.
const getOrder = async (id)=>{

  let order = await models.Order.findById(id);
  
  if (order)
    return order;
  else
    return {};

}

//Get the promise info.
router.get('/:id',(req,res)=>{

  getOrder(req.params.id)
    .then((data) => res.status(200).json({"order":data}))
    .catch((err) => res.status(500).json(error.msg('API')));

})

//Add new restaurant rate.
router.post('/',(req,res)=>{

  //Validate format.
  if (validRequest(req.body)){

    //Process save order.
    newOrder(req.body)
      .then((data) => res.status(200).json({"order":data}))
      .catch((err) => res.status(500).json(error.msg('API')));    

  } else
      res.status(400).json(error.msg('BADREQ'));

});


module.exports = router;
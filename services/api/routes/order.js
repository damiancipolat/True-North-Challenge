const express = require('express');
const router  = express.Router();

//Include module
const models  = require('../../../models/models.js');

//Custom libs
const error   = require('../../../lib/error.js');
const promise = require('../../../lib/promise.js');
const mapsApi = require('../../../lib/mapsApi/baseApi.js');
const point   = require('../../../lib/mapsApi/point.js');

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
			let etaTime  = await new mapsApi('googleMaps',origin,destiny,'AIzaSyAVqBwjx92F0bRh8f9c9tY8XBnxyJTihYg').calc();
					
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

			//Response object.
			return {
				id   : orderNew.id,
				eta  : etaTime,
				cost : orderCost
			}

  	} else
  			return error.msg('BADREQ');

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
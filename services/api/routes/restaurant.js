const express     = require('express');
const router      = express.Router();
const models      = require('../../../models/models.js');

//Retrieve the list of meals.
const getAll = async ()=>{

	try {

		//Get all the elements.
		let restaurants = await models.Restaurant.findAll();

		//Return and parse the result.
		return restaurants.map((rest) => rest.dataValues);

	}catch(error){
		throw new Error('request error');
	}

}

//Retrieve the list of meals filtering by rate.
const getByRate = async (rateValue)=>{

	try {

		//Get all the elements.
		let restaurants = await models.Restaurant.findAll({where: {rate:rateValue}});

		//Return and parse the result.
		return restaurants.map((rest) => rest.dataValues);

	}catch(error){
		throw new Error('request error');
	}

}

//Get restaurant rate.
const calcRate = async (restaurantId)=>{

	try{

		//Get all the rates.
		let rates = await models.Rate.findAll({where: {restaurant_id:restaurantId}});

		if (rates!=null){

			//Sum all the rates of the restaurant.
			let rateSum = rates.reduce((rateLast,rateActual) => {

				return ((rateLast.dataValues!=undefined)?rateLast.dataValues.value:0)+
								((rateActual.dataValues!=undefined)?rateActual.dataValues.value:0);

			});

			//Calc the rate average.
			return Math.floor(rateSum/rates.length)

		} else 
			return null;

	} catch(error){
		console.log(error);
		throw new Error(error);
	}

}

//Add a new Rate.
const newRate = async (restaurantId,userId,rateValue)=>{

	try {

		//Get user by id.
		let user = await models.User.findById(userId);

		//Get store by id.
		let store= await models.Restaurant.findById(restaurantId);

		//If the ids are valids.
		if ((user!=null)&&(store!=null)){

			//Create new rate.
			await models.Rate.create({value:rateValue, restaurant_id:restaurantId, userid:userId});

			//Calculate new rate.
			let newRate = await calcRate(restaurantId);

			console.log(rewRate);

  	} else
  		console.log('err',user,store);

	}catch(error){
		throw new Error('request error');
	}

}

//List all the resturants list.
router.get('/',(req,res)=>{

	//get the list of meals.
	getAll()
		.then((data) => res.status(200).json({"restaurants":data}))
		.catch((err) => res.status(500).json(err));

});

//List all the resturants list.
router.get('/rate/:value',(req,res)=>{

	if (req.params.value!=null){

		//Find by rate.
		getByRate(req.params.value)
			.then((data) => res.status(200).json({"restaurants":data}))
			.catch((err) => res.status(500).json(err));

	} else
		res.status(400).json({"err":"error in request"});

});

//Add new restaurant rate.
router.post('/rate/',(req,res)=>{

	//If the parametes are defined.
	if ((req.body.restaurantId!=null)&&(req.body.userId)&&(req.body.rateValue)){

		//Find by rate.
		newRate(req.body.restaurantId,req.body.userId)
			.then((data) => res.status(200).json({"restaurants":data}))
			.catch((err) => res.status(500).json(err));

	} else
		res.status(400).json({"err":"error in request"});

});

module.exports = router;
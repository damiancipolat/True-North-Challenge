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
		let rates = await models.Rate.findAll({raw:true,where: {restaurant_id:restaurantId}});

		if (rates!=null){
	
			let rateSum = 0;

			//Sum all the rates of the restaurant.		
			rates.forEach((rate) => rateSum+=rate.value);			

			//Calc the rate average.
			return Math.floor(rateSum/rates.length);

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
			await models.Rate.create({value:rateValue, restaurant_id:restaurantId, user_id:userId});

			//Calculate the new rate.
			let newRate = await calcRate(restaurantId);

			if (newRate!=null){

				//Update the restaunt rate.
				await models.Restaurant.update({rate:newRate},{where:{id:restaurantId}});

				return newRate;
			}			

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
		newRate(req.body.restaurantId,req.body.userId,req.body.rateValue)
			.then((data) => res.status(200).json({"restaurants":data}))
			.catch((err) => res.status(500).json(err));

	} else
		res.status(400).json({"err":"error in request"});

});

module.exports = router;
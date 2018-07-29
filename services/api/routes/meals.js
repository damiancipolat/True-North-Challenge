const express     = require('express');
const router      = express.Router();
const models      = require('../../../models/models.js');

//Retrieve the list of meals.
const getMeals = async ()=>{

	try {

		//Get all the elements.
		let meals = await	models.Meal.findAll();

		//Return and parse the result.
		return meals.map((meal) => meal.dataValues);

	}catch(error){
		throw new Error('request error');
	}

}

//List all the meals list.
router.get('/',(req,res)=>{

	//get the list of meals.
	getMeals()
		.then((data) => res.status(200).json({"meals":data}))
		.catch((err) => res.status(500).json(err));

});

module.exports = router;
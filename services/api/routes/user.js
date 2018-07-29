const express     = require('express');
const router      = express.Router();
const models      = require('../../../models/models.js');

//Retrieve the list of users.
const getUsers = async ()=>{

	try {

		//Get all the elements.
		let users = await	models.User.findAll();

		//Return and parse the result.
		return users.map((user) => user.dataValues);

	}catch(error){
		throw new Error('request error');
	}

}

//List all the meals list.
router.get('/',(req,res)=>{

	//get the list of users.
	getUsers()
		.then((data) => res.status(200).json({"users":data}))
		.catch((err) => res.status(500).json(err));

});

module.exports = router;
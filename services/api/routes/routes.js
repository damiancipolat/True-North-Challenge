//Include resource routes.
const routeRestaurant = require('./restaurant.js');
const routeMeal       = require('./meals.js');
const routeUser       = require('./user.js');
const routeOrder      = require('./order.js');

module.exports = {
	restaurant:routeRestaurant,
	meal:routeMeal,
	user:routeUser,
	order:routeOrder
}
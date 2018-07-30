//Load the sequlize.
const Sequelize = require('Sequelize');
const db        = require('./db.js').connection();

//User model.
const User = db.define('user',{
  firstName : Sequelize.STRING,
  lastName  : Sequelize.STRING,
  email     : Sequelize.STRING
});

//Restaurant model.
const Restaurant = db.define('restaurant',{
  name      : Sequelize.STRING,
  address   : Sequelize.STRING,
  phone     : Sequelize.STRING,
  email     : Sequelize.STRING,
  latitude  : Sequelize.FLOAT,
  longitude : Sequelize.FLOAT,
  rate      : Sequelize.INTEGER
});

//Rate model.
const Rate = db.define('rate',{
  value         : Sequelize.INTEGER,
  restaurant_id : Sequelize.INTEGER,
  user_id       : Sequelize.INTEGER
});

//Define relation between the restaurants and his rates.
Restaurant.hasMany(Rate, {
  foreignKey  : 'restaurant_id',
  constraints : false
});

Rate.belongsTo(Restaurant, {
  foreignKey  : 'restaurant_id',
  constraints : false,
  as          : 'restaurant'
});

//Define relation between the rates and the user how made it.
Rate.belongsTo(User, {
  foreignKey  : 'user_id',
  constraints : false,
  as          : 'user'
});

//Meal model.
const Meal = db.define('meal',{
  name  : Sequelize.STRING,  
  cost  : Sequelize.FLOAT
});

//Order model.
const Order = db.define('order',{
  address       : Sequelize.STRING,  
  latitude      : Sequelize.FLOAT,
  longitude     : Sequelize.FLOAT,  
  user_id       : Sequelize.INTEGER,
  restaurant_id : Sequelize.INTEGER,
  eta           : Sequelize.STRING,
  cost          : Sequelize.FLOAT
});

//Define relation between a order and hist user.
Order.belongsTo(User, {
  foreignKey  : 'user_id',
  constraints : false,
  as          : 'user'
});

//Define relation between a order and hist restaurant.
Order.belongsTo(User, {
  foreignKey  : 'restaurant_id',
  constraints : false,
  as          : 'restaurant'
});

//Order - meal model.
const OrderMeal = db.define('order_meal',{
  order_id : Sequelize.INTEGER,
  meal_id  : Sequelize.INTEGER
});

//Relations with the order.
OrderMeal.belongsTo(Meal, {
  foreignKey  : 'meal_id',
  constraints : false,
  as          : 'meal'
});

OrderMeal.belongsTo(Order, {
  foreignKey  : 'order_id',
  constraints : false,
  as          : 'order'
});

module.exports.Meal       = Meal;
module.exports.Rate       = Rate;
module.exports.User       = User;
module.exports.Restaurant = Restaurant;
module.exports.Order      = Order;
module.exports.OrderMeal  = OrderMeal;
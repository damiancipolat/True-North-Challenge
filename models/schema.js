//Include config.
const configLib  = require('../lib/config.js');

//Create tables.
const createSchema = async ()=>{

  const models = require('./models.js');

	console.log('\n> Creating tables !!\n');

	await models.User.sync({force: true});
	await models.Restaurant.sync({force: true});
	await models.Rate.sync({force: true});  
	await models.Meal.sync({force: true});
  await models.Order.sync({force: true});
  await models.OrderMeal.sync({force: true});

	console.log('\n> Loading Data!!\n');

	//Loading basic restaurant data.
	console.log('\n> Restaurant\n');

	await models.Restaurant.create({
      name      : 'El palacio de la pizza',
      address   : 'Av. Corrientes 751, C1043AAH CABA',
      phone     : '011 4322-9762',
      email     : 'test@gmail.com',
      latitude  : -34.6033082,
      longitude : -58.3772945,
      rate      : 0
  });

  await models.Restaurant.create({
    name      : 'Las cuartetas',
    address   : 'Av. Corrientes 838, C1043AAV CABA',
    email     : 'test@gmail.com',    
    phone     : '011 4326-0171',
    latitude  : -34.6041581,
    longitude : -58.37853140000001,
    rate      : 0
  });

  await models.Restaurant.create({
    name      : 'La Americana',
    address   : 'Av. Callao 83, C1022AAA CABA',
    email     : 'test@gmail.com',    
    phone     : '011 4371-0202',
    latitude  : -34.6082465,
    longitude : -58.3918225,
    rate      : 0
  });

  await models.Restaurant.create({
    name      : 'Gran Pizzería La Rey',
    address   : 'Av. Corrientes 965, C1009 CABA',
    email     : 'test@gmail.com',    
    phone     : '011 4328-1928',
    latitude  : -34.6035271,
    longitude : -58.3804746,
    rate      : 0
  });

  await models.Restaurant.create({
    name      : 'Banchero',
    address   : 'Av. Corrientes 1300, C1043AAZ CABA',
    email     : 'test@gmail.com',    
    phone     : '011 4382-3353',
    latitude  : -34.6041122,
    longitude : -58.3849166,
    rate      : 0
  });		

  //Loading basic users data.
	console.log('\n> Users\n');

  await models.User.create({
    firstName : 'Damian',
    lastName  : 'Cipolat',
    phone     : '1566587382',
    email     : 'damian.cipolat@gmail.com'
  });

  await models.User.create({
    firstName : 'Bruce',
    lastName  : 'Wayne',
    phone     : '1566587382',    
    email     : 'bruce.wayne@gmail.com'
  });

  await models.User.create({
    firstName : 'Homer',
    lastName  : 'Simpson',
    phone     : '1566587382',    
    email     : 'hsimpson@gmail.com'
  });

  await models.User.create({
    firstName : 'Developer',
    lastName  : 'Developer',
    phone     : '1566587382',    
    email     : 'developer@gmail.com'
  });

  //Loading basic meals data.
	console.log('\n> MEALS\n');

 	await models.Meal.create({name : 'Pizza',  cost : 200});
  await models.Meal.create({name : 'Burger', cost : 150});
  await models.Meal.create({name : 'Chicken',cost : 100});
  await models.Meal.create({name : 'Salmon',cost  : 300});
  await models.Meal.create({name : 'French fries',cost : 50});
  await models.Meal.create({name : 'Noodles',cost  : 50});
  await models.Meal.create({name : 'Meatballs',cost : 80});
  await models.Meal.create({name : 'Coke',cost  : 40});
  await models.Meal.create({name : 'Beer',cost  : 30});
  await models.Meal.create({name : 'Water',cost : 20});

}

//Load config.
const loadConfig = async ()=>{

  let configData = await configLib.getConfig('./config/config.json');
  global.config  = configData;

  await createSchema();
  return true;

}

loadConfig().then(()=>{

  console.log('\n> Schema created OK.\n');
  process.exit();

}).catch(()=>{

  console.log('\n> Error creating schema.\n',err);
  process.exit();    

});
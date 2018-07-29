const Sequelize = require('Sequelize');
const configLib = require('../lib/config.js');

let config = configLib.getConfig('./config/config.json');

const connection = ()=>{

	return new Sequelize(
		config.database.db,
		config.database.user, 
		config.database.pwd, {
  	host    : config.database.host,
  	dialect : config.database.type,
	  operatorsAliases : false
	});

}

module.exports.connection = connection;
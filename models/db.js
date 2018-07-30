const Sequelize = require('Sequelize');

const config    = global.config;

const connection = ()=>{

	return new Sequelize(
		config.database.db,
		config.database.user, 
		config.database.pwd, {
  	host    : config.database.host,
  	dialect : config.database.type,
	  operatorsAliases : false,
	  logging : config.debug
	});

}

module.exports.connection = connection;
const errorCodes = {
	CONFIG : 'There are a problem loading configuration file',
	SOCKET : 'There are a problem binding the server socket',
	SERVER : 'Boostrap error in starting server',
	BD 		 : 'There are a problem connecting with the database',
	QUERY  : 'There are a query error',
	OKSRV  : 'Server started ok!',
	MAPS   : 'There a problem in google maps api.',
	MQ     : 'There a problem connecting to rabbitmq server',
	API    : 'There are a internal Api error',
	BADREQ : 'The request format is incorrect',
	MSG    : 'Problem sending notifications',
	LOG    : 'There a problem writing log file'
}

const msjError = (code)=>{
	return {"error_code" : code,"description":errorCodes[code]};
}

const msgOk = (code)=>{
	return {"succes" : code,"description":errorCodes[code]};
}

module.exports.codes = errorCodes;
module.exports.msg   = msjError;
module.exports.msgOk = msgOk;

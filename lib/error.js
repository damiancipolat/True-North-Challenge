const errorCodes = {
	CONFIG : 'There are a problem loading configuration file',
	SOCKET : 'There are a problem binding the server socket',
	BD 		 : 'There are a problem connecting with the database',
	QUERY  : 'There are a query error',
	API    : 'There are a internal Api error',
	BADREQ : 'The request format is incorret'
}

const msjError = (code)=>{
	return {"error_code" : code,"description":errorCodes[code]};
}

module.exports.codes = errorCodes;
module.exports.msg   = msjError;

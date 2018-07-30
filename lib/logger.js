const fs     = require('fs');
const error  = require('./error.js');

const logFile = (text,file)=>{

	return new Promise((resolve,reject)=>{

		try {

			fs.writeFile(file, text,{'flag':'a'},(err)=>{

	    	if(err)
	        reject(err);
	      else
	      	resolve(true);
	    
			});

		} catch(e) {
			console.log(e);
			throw new Error(error.msg('LOG'));
		}

	});

}

module.exports.log = logFile;

//Include dependencies
const fs   = require('fs');
const path = require('path');

//Load JSON file.
module.exports.getConfig = (file)=>{  

	return new Promise((resolve,reject)=>{

		try{

			resolve(JSON.parse(fs.readFileSync(file).toString()));

		} catch(error){
			reject(err);
		}

	});
  
}
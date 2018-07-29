//Include dependencies
const fs   = require('fs');
const path = require('path');

//Load JSON file.
module.exports.getConfig = (file)=>{  
  return JSON.parse(fs.readFileSync(file).toString());
}
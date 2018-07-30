const configLib = require('../config.js');
const config    = configLib.getConfig('./config/config.json');

const googleMaps = require('./googleMaps.js');
const point      = require('./point.js');

//Strategy ETA distance - calculator.
class baseApi{

	constructor(provider,pOrigin,pDestiny,key){

		this.provider = provider;
		this.calculer = null;
		this.origin   = pOrigin;
		this.destiny  = pDestiny;
		this.apiKey   = key;

	}

	setProviderObj(){

		if (this.provider=='googleMaps')
			 this.calculer = new googleMaps(this.apiKey);

	}

	calc(){

		this.setProviderObj();

		//Calculate the distance.
		return this.calculer.calcDistance(this.origin.strPoint(),this.destiny.strPoint());
		
	}

}

let origin  = new point(-34.6082465,-58.3918225);
let destiny = new point(-34.6108573,-58.4149374);

console.log(config.services.api.mapsKey);
let tmp     = new baseApi('googleMaps',origin,destiny,config.services.api.mapsKey);

tmp.calc().then((ok)=>console.log(ok)).catch((err)=>console.log(err));


/*
const configLib = require('./config.js');
let   config    = configLib.getConfig('./config/config.json');


const distance = require('google-distance-matrix');

distance.key(config.services.api.mapsKey);
distance.mode('driving');
distance.units('metric');
distance.traffic_model('optimistic');


var origins = ['-34.6082465,-58.3918225'];
var destinations = ['-34.6108573,-58.4149374'];

distance.departure_time(9404696787);
//distance.arrival_time(9404696787);
 
distance.matrix(origins, destinations, function (err, distances) {
   
    console.log(err,distances.rows[0].elements[0].duration);
});*/
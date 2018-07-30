class point{

	constructor(lat,lng){

		this.latitude  = lat;
		this.longitude = lng;

	}

	strPoint(){

		return this.latitude+','+this.longitude;

	}
	
}

module.exports = point;
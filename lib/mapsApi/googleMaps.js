class googleMapsDistance{

  constructor(apiKey){

    //Load googlemaps.
    this.distance = require('google-distance-matrix');

    //Define api configuration.
    this.distance.key(apiKey);
    this.distance.mode('driving');
    this.distance.units('metric');
    this.distance.traffic_model('optimistic');
    this.distance.departure_time(9404696787);

  }

  parseResult(response){

    return (response.rows[0].elements[0].duration.text!=undefined)?response.rows[0].elements[0].duration.text:null;

  }

  calcDistance(origin,destiny){

    return new Promise((resolve,reject)=>{

      //Make request to google api.
      this.distance.matrix([origin],[destiny], (err, distances)=>{
   
        if (err)
          reject(err);
        else{

          //Parse response structure.
          let result = this.parseResult(distances);

          if (result!=null)
            resolve(result);
          else
            reject(null);

        }

      });

    });

  }

}

module.exports = googleMapsDistance;
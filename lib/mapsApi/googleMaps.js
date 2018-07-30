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


/*

let origin  = new point(-34.6082465,-58.3918225);
let destiny = new point(-34.6108573,-58.4149374);

console.log(config.services.api.mapsKey);
let tmp     = new baseApi('googleMaps',origin,destiny,config.services.api.mapsKey);

tmp.calc().then((ok)=>console.log(ok)).catch((err)=>console.log(err));


*/
const chai    = require('chai');
const request = require('request');

const host = 'http://127.0.0.1:8080';

describe('Test Api endpoints', ()=>{

  describe('Meal', ()=>{

    it(`${host}/meal/ - Check response`, (done)=>{

      request.get(`${host}/meal/`, (err, res, body)=>{

        body = JSON.parse(res.body);
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(body).to.be.a('object');
        chai.expect(body).to.have.property('meals');
        chai.expect(body.meals).that.is.an('array');
        chai.expect(body.meals).to.have.length.above(0);
        done();
        
      });

    });

  });

  describe('User', ()=>{

    it(`${host}/user/ - Check response`, (done)=>{

      request.get(`${host}/user/`, (err, res, body)=>{

        body = JSON.parse(res.body);
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(body).to.be.a('object');
        chai.expect(body).to.have.property('users');
        chai.expect(body.users).that.is.an('array');
        chai.expect(body.users).to.have.length.above(0);
        done();
        
      });

    }); 

  });

  describe('Restaurant', ()=>{

    it(`${host}/restaurant/ - GET Check response`, (done)=>{

      request.get(`${host}/restaurant/`, (err, res, body)=>{

        body = JSON.parse(res.body);
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(body).to.be.a('object');
        chai.expect(body).to.have.property('restaurants');
        chai.expect(body.restaurants).that.is.an('array');
        chai.expect(body.restaurants).to.have.length.above(0);
        done();
        
      });

    });

    it(`${host}/restaurant/rate/ - GET Check response`, (done)=>{

      request.get(`${host}/restaurant/rate/0`, (err, res, body)=>{

        body = JSON.parse(res.body);
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(body).to.be.a('object');
        chai.expect(body).to.have.property('restaurants');
        chai.expect(body.restaurants).that.is.an('array');
        chai.expect(body.restaurants).to.have.length.above(0);
        done();
        
      });

    });

    it(`${host}/restaurant/rate/ - POST New Rate Check response`, (done)=>{

      let json = '{"restaurantId":3,"userId":3,"rateValue":10}';

      request.post({
        headers: {'content-type':'application/json'},
        url    : `${host}/restaurant/rate/`,
        body   : json
      }, (err, res, body)=>{
        
        body = JSON.parse(res.body);        

        chai.expect(res.statusCode).to.equal(200);
        chai.expect(body).to.be.a('object');
        chai.expect(body).to.have.property('rate');

        done();

      });

    });

  });

  describe('Order', ()=>{

    it(`${host}/order/1 - Check response`, (done)=>{

      request.get(`${host}/order/1`, (err, res, body)=>{

        body = JSON.parse(res.body);
        chai.expect(res.statusCode).to.equal(200);
        chai.expect(body).to.be.a('object');
        chai.expect(body).to.have.property('order');
        chai.expect(body.order).that.is.an('object');      
        done();
        
      });

    });

    it(`${host}//order/ - POST New Order Check response`, (done)=>{

      let jsonObj = {
       "address":"av rivadavia 3438,caba",
       "userId":3,
       "position":{"lat":-34.860601,"lng":-58.3959097},
       "restaurantId":3,
       "meals":[1,2,4,3,1]  
      };

      request.post({
        headers: {'content-type':'application/json'},
        url    : `${host}/order/`,
        body   : JSON.stringify(jsonObj)
      }, (err, res, body)=>{
        
        body = JSON.parse(res.body);

        chai.expect(res.statusCode).to.equal(200);
        chai.expect(body).to.be.a('object');
        chai.expect(body).to.have.property('order');
        done();

      });

    }).timeout(5000);

  });

});
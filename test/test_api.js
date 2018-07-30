const assert = require('assert');
const config = require('../lib/config.js');
const db     = require('../models/db.js');

const test = (config)=>{

  global.config = config;  

  describe("Test cases", ()=>{

    //Test db connection.
    describe("DB CONNECTION", ()=>{

      it("Test db", (done)=>{

        db.authenticate()
          .then((status) =>{
            assert(true);
            done();
          })
          .catch((err) =>{
            assert(false);
            done();            
          });

      });

    });

  });

}

config.getConfig('./config/config.json')
  .then((config) => test(config))
  .catch((err)   => console.log('Error loading config.'));


/*
const config = require('../utils/config.js');
const db     = require('../lib/db/db.js');
const Tweet  = require('../lib/twitterEvents.js');

//Define global config.
global.settings = config.getConfig('./settings.json');

//Test case.
describe("Test cases", ()=>{

  //Test config module.
  describe("Config module", ()=>{

    it("Load server settings", (done)=>{

      assert(config.getConfig('./settings.json')!=null);
      done();

    });

  });

  //Databse module.
  describe("Database module", ()=>{

    //Enable connection.
    it("Try connection", (done)=>{

      db.connect(global.settings.bd.url).then((bdConex)=>{

        assert(true);
        done();
        bdConex.close();

      }).catch((err)=>{

        assert(false);
        done();

      });

    });

    //Save tweet.
    it("Save tweet", (done)=>{

      //Connect to mongodb.
      db.connect(global.settings.bd.url).then((bdConex)=>{

        let tweet = {"date" : "2018-03-12",
                     "id"   : 111111,
                     "text" : "Mocha Test",
                     "user" : "Test JS"};

        //Save tweet.
        db.saveTweet(bdConex,tweet).then((result)=>{
          bdConex.close();
          assert(true);
          done();
        }).catch((err)=>{
          bdConex.close();
          assert(false);
          done();
        });

      }).catch((err)=>{
        assert(false);
        done();
      });

    });

    //Find tweets.
    it("Find tweets", (done)=>{

      //Connect to mongodb.
      db.connect(global.settings.bd.url).then((bdConex)=>{

        //Find tweet.
        db.findTweets(bdConex,{user:'Pliny'}).then((result)=>{
          bdConex.close();
          assert(true);
          done();
        }).catch((err)=>{
          bdConex.close();
          assert(false);
          done();
        });

      }).catch((err)=>{
        assert(false);
        done();
      });

    });

  });

  //Twitter module.
  describe("Twitter module", ()=>{

    //Connect to twitter api.
    it("Connect to Twitter API", (done)=>{

      try{

        const tweetEvents = new Tweet();

        tweetEvents.trackWord(tweetWord,()=>{
          assert(true);
          done();
        });

      } catch(err){        
        assert(false);
        done();
      }

    });

  }); 

});*/
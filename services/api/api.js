const processObj = require('process'); 

//Add CORS to middleware.
const allowCrossDomain = (req, res, next)=>{

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // Intercepts OPTIONS method
  if ('OPTIONS' === req.method)      
    res.sendStatus(200);
  else
    next();

}

//onListen event.
const onListen = ()=>{

  //Logeo arranque del server.
  console.log('Restaurant API');
  console.log('> Listenig in ip: 127.0.0.1 port:8080');
  console.log('> Process Id:',processObj.pid);
  console.log('');

}

module.exports.CORS     = allowCrossDomain;
module.exports.onListen = onListen;
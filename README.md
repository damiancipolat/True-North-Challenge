# True-North-Challenge
My solution for the True North Node.js Sr - Challenge

### Install:

Install dependences, node modules:
```sh
$ npm install
```

### Configuration:
Go to the file /config/config.json, NOTE: for this example I provide a running environment, using Postgresql DB as service "elephantsql.com" and Rabbitmq as service "cloudamqp.com" for the email service I user Gmail with a real but test account.

```json
{
	"debug"   : true,
	"database":{
		"user"  : "snigmgei",
		"db"    : "snigmgei",
		"pwd"   : "BpbVMSMR4JlTQ-fGjBjhpiVxOlKanmHr",
		"host"  : "baasu.db.elephantsql.com",
		"type"  : "postgres"
	},
	"rabbitmq":{
		"url" : "amqp://kewhjifg:d3-DSmkKl9mSzU8xYxORDF_guR7SHI_x@lion.rmq.cloudamqp.com/kewhjifg"
	},
	"mailer":{
		"user": "kikijs2018@gmail.com",
		"pwd" : "kikijs2018ABC",
		"type": "gmail"
	},
	"services":{
		"api":{
			"ip"      : "127.0.0.1",
			"port" 	  : 8080,
			"mapsKey" : "AIzaSyAVqBwjx92F0bRh8f9c9tY8XBnxyJTihYg"
		},
		"notifications":{
			"logFile" : "./services/notifications/log.txt"
		}
	}
}

```
### Schema:
To create all the tables that user the api service, you must run this command.

```sh
#To create schema.
$ npm run create-schema

#To run Order messaging sevice.
$ npm run notif
```

### Run:
To start the two services "Restaurant Api-rest" and "Order messaggin":

```sh
#To run Api rest service.
$ npm run api

#To run Order messaging sevice.
$ npm run notif
```

### Test:
To run the test:

```sh
$ npm run test
```


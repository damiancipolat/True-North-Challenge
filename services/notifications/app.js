var amqp = require('amqplib/callback_api');

amqp.connect('amqp://kewhjifg:d3-DSmkKl9mSzU8xYxORDF_guR7SHI_x@lion.rmq.cloudamqp.com/kewhjifg', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'notif-exchange';

    ch.assertExchange(ex, 'direct', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      ch.bindQueue(q.queue, ex, 'info');
      

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});
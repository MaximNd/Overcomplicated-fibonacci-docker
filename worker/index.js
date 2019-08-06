const redis = require('redis');

const config = require('./config');
const fib = require('./fib');

const redisClient = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

sub.on('message', (_channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');

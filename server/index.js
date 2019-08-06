const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pg = require('pg');

const config = require('./config');

// EXPRESS
const app = express();

app.use(cors());
app.use(bodyParser.json());

// POSTGRES
const pgClient = new pg.Pool({
  user: config.pgUser,
  host: config.pgHost,
  port: config.pgPort,
  database: config.pgDatabase,
  password: config.pgPassword
});

pgClient.on('error', () => console.log('Lost connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS indices (index INT)')
  .catch(err => console.log(err));

// REDIS
const redisClient = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// ROUTES
app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/indices', async (req, res) => {
  const indices = await pgClient.query('SELECT * FROM indices');
  res.send(indices.rows);
});

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    if (err) console.log(err);
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;

  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);

  pgClient.query('INSERT INTO indices(index) VALUES($1)', [index]);

  res.send({ status: 'OK' });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, err => {
  console.log(`Listening at port ${PORT}`);
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const con = require('./connection');

console.log(process.env.CLEARDB_DATABASE_URL);

// Serve static files from the React app.
// Note: the path that you provide to the express.static function is relative to the directory from
// where you launch your node process. If you run the express app from another directory, it’s safer to
// use the absolute path of the directory that you want to serve.
// app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// COMPONENT TWO: EXPRESS MIDDLEWARE
app.post('/feedback', (req, res) => {
  const userData = Object.assign({}, req.body, { date: moment().format() });

  const postToDB = new Promise((resolve, reject) => {
    con.query('INSERT INTO user_data SET ?', userData, (err, res) => {
      err ? reject() : resolve();
    });
  });

  postToDB.then(() => res.sendStatus(200))
    .catch(() => {
      res.status(500).send('Warning! The data was not saved.');
    })
});

// catchall handler — any requests that don't match the one(s) outlined above
// will be sent here.

// app.get('*', (req, res) => {
//   console.log('catchall endpoint');
//   res.sendFile(path.join(__dirname + '../client/build/index.html'))
// });

module.exports = app;

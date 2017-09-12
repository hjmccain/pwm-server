const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const con = require('./connection');

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
  
  postToDB.then(() => res.sendStatus(201))
    .catch(() => {
      res.status(503).send('Warning! The data was not saved.');
    });
});

module.exports = app;

const mysql = require('mysql');

const con = process.env.NODE_ENV === 'development' ?
mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'pwm_test'
}) :
mysql.createConnection({
  host: 'pwm-wifi.cgyttdbn6ax6.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'pwmwifi',
  password: '1wYOp2s3v3fgCi0CZw61!',
  database: 'pwm_wifi'
});

con.connect((err) => {
  if (err){
    console.log('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database in', process.env.NODE_ENV, 'mode.');
});

module.exports = con;

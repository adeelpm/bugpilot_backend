// const mysql = require('mysql');
// var con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "adeelpm_bugpilot",
//   password: "",
//   database: "adeelpm_bugPilot"

// });

// import {DATABASE_URL} from './env'
const {DATABASE_URL}=require('./env')
const { Client } = require('pg');

console.log("object",DATABASE_URL)
const con = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


con.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})


module.exports=con;
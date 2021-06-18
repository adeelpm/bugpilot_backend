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


const { Client } = require('pg');

console.log("object",process.env.DATABASE_URL)
const con = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


con.connect((err) => {
  try {
    if (err) throw err;
    
  } catch (error) {
    console.log("caught''''''''''",error)
    
    
  }
  
  
  console.log("Connected!");
});


module.exports=con;
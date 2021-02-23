const mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bugPilot"

});

try {
  
} catch (error) {
  
} 


con.connect((err) => {
  try {
    if (err) throw err;
    
  } catch (error) {
    console.log("caught''''''''''",error)
    
    
  }
  
  
  console.log("Connected!");
});


module.exports=con;
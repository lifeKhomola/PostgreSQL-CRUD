const Pool = require("pg").Pool
// Allows us to set what or where to 
// connect the database

 const pool = new Pool({

    user: "postgres",
    password:"Letsdoit!",
    database: "mydb",
    host:"localhost",
    port: 5432
 });

 module.exports = pool;
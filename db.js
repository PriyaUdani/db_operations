import mysql from "mysql2";

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "crud_node"
});

export default db
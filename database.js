var mysql = require("mysql");
///koneksi db

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hhhhh",
  database: "lear_apinode",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Koneksi database sukses");
});

module.exports = db;

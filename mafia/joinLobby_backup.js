const mysql = require('mysql')
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toybox",
  database: "mydb"
});

function addPlayer () {
  var username = document.getElementById('usernameInput').value;
  window.alert(username);
/*
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = `INSERT INTO mafia (username) VALUES ("${username}")`;
    connection.query(sql, function (err, result) {
      connection.release();
      if (err) throw err;
    });
  });
*/
/*
  con.connect(function(err) {
  if (err) throw err;
  window.alert("connection made");
  let sql = `INSERT INTO mafia (username) VALUES ("me")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    window.alert("sql updated");
  });
  });
  */
};


con.connect(function(err) {
if (err) throw err;
//window.alert("connection made");
window.alert("connection made");
let sql = `INSERT INTO mafia (username) VALUES ("me")`;
con.query(sql, function (err, result) {
  if (err) throw err;
  //window.alert("sql updated");
  window.alert("sql updated");
});
});

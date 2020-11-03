const mysql = require('mysql')
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "toybox",
  database: "mydb"
});

function addPlayer () {
  var username = document.getElementById('usernameInput').value;
  window.alert(username);

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    let sql = `INSERT INTO mafia (username) VALUES ("${username}")`;
    connection.query(sql, function (err, result) {
      connection.release();
      if (err) throw err;
    });
  });
};

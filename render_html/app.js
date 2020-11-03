const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')
const port = 3000
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "toybox",
  database: "mydb"
})

/*
* Default route for the web app
*/
//app.get('/', (req, res) => res.send('Welcome To Code Handbook!'))

/*
* Route to render HTML Page
*/
app.use(express.static(__dirname + '/mafia'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})

app.get('/joinLobby.html', (req, res) => {
    res.sendFile('/joinLobby.html', {
        root: path.join(__dirname, './')
    })
})

app.get('/lobby.html', (req, res) => {
    res.sendFile('/lobby.html', {
        root: path.join(__dirname, './')
    })
})

pool.getConnection(function (err, connection) {
  if (err) throw err;
  let sql = "DELETE FROM mafia";
  connection.query(sql, function (err, result) {
    connection.release();
    if (err) throw err;
  });
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

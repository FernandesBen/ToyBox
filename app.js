const express = require('express')
const http = require('http');
const path = require('path')
//const mysql = require('mysql')
const socketio = require('socket.io');
//const port = 3000
const app = express()
var server = http.createServer(app)
const io = socketio(server);
var profiles = [];
/*
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "toybox",
  database: "mydb"
})
*/

app.use(express.static(__dirname + '/mafia'));


app.get('/', (req, res) => {
    res.sendFile('index.html', { //normally index.html
        root: path.join(__dirname, './')
    })
})

app.get('/joinLobby.html', (req, res) => {
    var myVar = "Hello world";
    res.send(myVar);
    res.sendFile('/joinLobby.html', {
        root: path.join(__dirname, './')
    })
})

app.get('/lobby.html', (req, res) => {
    res.sendFile('/lobby.html', {
        root: path.join(__dirname, './')
    })
})

/*
pool.getConnection(function (err, connection) {
  if (err) throw err;
  let sql = "DELETE FROM mafia";
  connection.query(sql, function (err, result) {
    connection.release();
    if (err) throw err;
  });
})



function runQuery(sql) {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(sql, function (err, result) {
      //console.log(result);
      //sessionStorage.setItem("SQL_RESULT", "hi");
      //var socket = io();
      //socket.emit('test', "hi");
      connection.release();
      if (err) throw err;
    });
  });
  //console.log(sessionStorage.getItem("SQL_RESULT"));
};
*/
function toString(array) {
  for (let row in array) {
    console.log(array[row]);
  }
}


var waitingRoom = [];
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinLobby', ({ username }) => {
    console.log(username + " joined the lobby as " + socket.id);
    //runQuery(`INSERT INTO mafia (socket, username) VALUES ("${socket.id}", "${username}")`);
    var ink =
      {
      "socket" : socket.id,
      "username" : username,
      "role" : null,
      "isAlive" : null,
      "isConnected" : null,
      "vote" : null,
      };
    profiles.push(ink);
    //console.log(profiles.length);
    //toString(profiles);
    waitingRoom.push(username);
    io.emit('updateWaitingRoom', waitingRoom);
  });



  socket.on('disconnect', () => {
    console.log('user disconnected');
    //runQuery(`DELETE FROM mafia WHERE socket = "${socket.id}"`);
    //updateRoster();
    let rowToDelete;
    for (let row in profiles) {
      if (profiles[row].socket == socket.id) {
        rowToDelete = row;
      }
    };
    if (rowToDelete != null) {
      console.log("the row to delete: "+rowToDelete);
      profiles.splice(rowToDelete, 1);
      toString(profiles);
      //console.log("the size of profiles: "+profiles.length);
    };
    waitingRoom = [];
    for (let row in profiles) {
      waitingRoom.push(profiles[row].username);
    };
    io.emit('updateWaitingRoom', waitingRoom);
  });
});

//app.listen(port, () => console.log(`App listening on port ${port}!`))
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

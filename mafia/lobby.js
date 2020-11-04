const tableID = document.getElementById('tableID');
var body = document.getElementById('pageBody');
var socket = io();

function start() {
  var username = localStorage.getItem("USERNAME");
  socket.emit('joinLobby', {username});
};


socket.on('updateWaitingRoom', waitingRoom => {
  //window.alert(waitingRoom);
  tableID.innerHTML = "";
  displayRoster(waitingRoom, tableID);
});


function swapBody() {
  //window.alert("hello there");
  /*
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  */
  body.innerHTML = "<body name=\"civColor\" class=\"civColor\"><p>test dom</p></body>";
}


function displayRoster(playerNames, myTable) {
  let tableRowObj;
  let tableCellObj;
  let tableWidth = 2;
  let tableRowNum = Math.ceil((playerNames.length)/tableWidth);
  //document.writeln(playerNames.join());

  for (let i=0; i<tableRowNum; i++) {
    tableRowObj = myTable.insertRow(i);
      for (let j=0; j<tableWidth; j++) {
        tableCellObj = tableRowObj.insertCell(j);
        let name = playerNames.shift();
        tableCellObj.innerHTML = ((name == null)? " " : name);
      }
  }
}

//app.listen(8080);
window.onload=start();

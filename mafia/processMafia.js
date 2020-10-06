
var lobby = new Array();
var tableID = document.getElementById("tableID");

function start() {
  //["Ben", "Dan", "Ryan", "Nathan", "Paul", "Rizwan"]
  lobby.push('Ben');
  lobby.push('Dan');
  lobby.push('Ryan');
  lobby.push('Nathan');
  lobby.push('Paul');
  lobby.push('Rizwan');
  lobby.push('Patrick');
}

function updateLobby() {
  let newName = document.getElementById("username").value;
  lobby.push(newName);

  document.getElementById("header").innerHTML = "<h2>Please wait while everyone joins...</h2>";
  document.getElementById("startButSpot").innerHTML = "<input type=\"button\" id=\"startBut\" value=\"Start Game\" />";

  //all form elements must be collected before this comment
  document.getElementById("joinGame").innerHTML = "";
  displayRoster(lobby, tableID);
}

function displayRoster(playerNames, myTable) {
  let tableRowObj;
  let tableCellObj;
  let tableWidth = 2;
  let tableRowNum = Math.ceil((lobby.length)/tableWidth);
  //document.writeln(playerNames.join());

  for (let i=0; i<tableRowNum; i++) {
    tableRowObj = myTable.insertRow(i);
      for (let j=0; j<tableWidth; j++) {
        tableCellObj = tableRowObj.insertCell(j);
        tableCellObj.innerHTML = playerNames.shift();
      }
  }
}

window.addEventListener("load", start, false);
document.getElementById("submitName").addEventListener("click", updateLobby, false);

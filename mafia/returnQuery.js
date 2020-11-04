const mysql = require("mysql");

//left here for testing purposes, although there is only one colour in DB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toybox",
  database: "mydb"
});

function getColour(username, roomCount, callback) {
  connection.query("SELECT socket FROM mafia", [roomCount], function(err, result) {//'SELECT hexcode FROM colours WHERE precedence = ?'
    if (err)
      callback(err,null);
    else
      callback(null,result);
  });
};

getColour("yourname",4, function(err,data){
  if (err) {
    console.log("ERROR : ",err);
  } else {
    console.log("result from db is : ",data);
  }
});


/* Original version from github, but with my table values. Works fine, uses rooms.
  //"username" has nothing to do with my mafia table outside of the query.
(async () => {
  connection.connect();
  const result = await getColour("username", 2);
  console.log(result);
  connection.end();
})();

function getColour(username, roomCount) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT username FROM mafia",
      [roomCount],
      (err, result) => {
        return err ? reject(err) : resolve(result); //result[0].username
      }
    );
  });
}
*/

/*
var outcome;
outcome = (async () => {
    connection.connect();
    const result = await getColour("SELECT socket FROM mafia");
    connection.end();
    //console.log(result);
    return result;

  })();

  function getColour(query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
          return err ? reject(err) : resolve(result);
        }
      );
    });
  };

  console.log(outcome);
*/
/*
  for (let row in result) {
    x = result[row];
    y = x.indexOf("Raw");
    console.log(y);
  };
*/


/*
function runQuery() {
  function getColour(query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
          return err ? reject(err) : resolve(result);
        }
      );
    });
  };

  return (async () => {
    connection.connect();
    const result = await getColour("SELECT socket FROM mafia");
    connection.end();
    //console.log(result);
    return result;
  })();
};

console.log(runQuery());
*/

var db2 = require('ibm_db');
var db2ConnSettings = "DRIVER={DB2};DATABASE=mydb;HOSTNAME=localhost;UID=root;PWD=toybox;PORT=3306;PROTOCOL=TCPIP";

var err, conn;
var callbacks = [];

module.exports = function(callback) {
  // db2 module is called

  if (err || conn) {
    // connection has already been established
    //   (results of db2.open have been stored)
    // callback immediately
    callback(err, conn);
  }
  else {
    // connection has not been established
    // store the callback for when db connects
    callbacks.push(callback);
  }
};

db2.open(db2ConnSettings, function(_err, _conn){
  // db has connected

  err = _err; conn = _conn; // store results
  var next_callback;

  // array.pop() removed the last item from the array
  // and returns it. if no items are left, returns null.
  // so this loops through all stored callbacks.
  while(next_callback = callbacks.pop()) {
    // the removed item is stored in next_callback
    next_callback(err, conn); // send connection results to callback
  }

  // no more items in callbacks to trigger
});

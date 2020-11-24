//gameboard setup
var column = 32
var row = 18
var columnScale = 10000
var rowScale = 1

var collisionHash = new Map();

//server logic
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

var data ={
    "snakes": {},
    "apples":[]
};

app.use(express.static("public"));

app.get('/', function(req,res) {
    res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection', function(socket) {
    var socketid = socket.id;
    data["snakes"][socketid] = {
        "body":[randPixel(socketid)],
        "direction": 0,
        "score":1,
    };

    data["apples"].push(randPixel("apple"));

    socket.on("left", function() {
        if(typeof data["snakes"][socket.id] !== 'undefined') {
            data["snakes"][socket.id]["direction"] = -10000;
        }
    });
    socket.on("right", function() {
        if(typeof data["snakes"][socket.id] !== 'undefined') {
            data["snakes"][socket.id]["direction"] = 10000;
        }
    });
    socket.on("up", function() {
        if(typeof data["snakes"][socket.id] !== 'undefined') {
            data["snakes"][socket.id]["direction"] = -1;
        }
    });
    socket.on("down", function() {
        if(typeof data["snakes"][socket.id] !== 'undefined') {
            data["snakes"][socket.id]["direction"] = 1;
        }
    });
    socket.on("disconnect", function() {
        if(typeof data["snakes"][socket.id] !== 'undefined') {
            var body = data["snakes"][socket.id]["body"];
            deleteSnake(body, socket.id)
            data["apples"].pop();
        }
    })
});

server.listen(process.env.PORT || 3000);
console.log('server is running...');


function deleteSnake(body, key) {
    /*
    var item = collisionHash.get(body[0])
    console.log(body);
    if(item.includes(key)) {
        if(item==key) {
            collisionHash.delete(body[0])
        } else {
            item = item.replace(key, '');
            collisionHash.set(body[0], item)
        }
    }
    if(body.length>0) {
        for(var i=1; i<body.length; i++) {
            collisionHash.delete(body[i]);
        }
    }*/
    for(var i=0; i<body.length; i++) {
        collisionHash.delete(body[i]);
    }
    delete data["snakes"][key];
    console.log(collisionHash);
}

function updateGameBoard() {
    var snakes = data["snakes"]; //snakes data from data JSON object
    var howdied;
    for(var key in snakes) {
        //useful variables
        var body = snakes[key]["body"];
        var prevHead = body[0];
        var tail = body[body.length-1];
        var snakeId = key;
        //check if disconnect, append body to dead array
        if(body.length==0) {
        } else {
            //add new head
            var newHead = prevHead + snakes[key]["direction"];
            snakes[key]["body"].unshift(newHead);

            //update Hash

            //check if apple
            if(collisionHash.get(newHead)=="apple") {
                //add tail and apple and score
                snakes[key]["body"].push(tail);
                data["apples"].push(randPixel("apple"));
                snakes[key]["score"]+=1;
                //delte from hash
                collisionHash.delete(newHead);
                //delete from data
                var appleAte = data.apples.indexOf(newHead);
                data.apples.splice(appleAte,1);
            }


            //remove tail
            collisionHash.delete(tail);
            snakes[key]["body"].pop();

            //check if hit wall, other snake, itself
            if(collisionHash.has(newHead)) {
                howdied = collisionHash.get(newHead);
                console.log("YOUR KEY" + key)
                console.log("YOUR BODY" + body)
                console.log(collisionHash)
                io.to(key).emit("the end", howdied);//snakes[key]["score"]);
                deleteSnake(body, key);
            }

            //add head to hashmap
            collisionHash.set(newHead, snakeId);
        }
    }
}


function randPixel(hashValue) {
    var xCoor = Math.floor(Math.random()*column)*10000;
    var yCoor = Math.floor(Math.random()*row);
    var space = xCoor+yCoor;
    if(collisionHash.has(space)) {
        return randPixel(hashValue)
    }
    collisionHash.set(space, hashValue);
    return space;
}

function calculateWalls() {
    for(i=0; i<row; i++) {
        collisionHash.set(-columnScale+i,"wall");
        collisionHash.set((column*columnScale)+i,"wall");
    }

    for(i=0; i<column; i++) {
        collisionHash.set((i*columnScale)-rowScale,"wall");
        collisionHash.set((i*columnScale)+row,"wall");
    }
}

calculateWalls();

//gameloop
function gameloop() {
    updateGameBoard()
    io.emit("update", data);
}

let game = setInterval(gameloop, 150);

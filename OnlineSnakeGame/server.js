//game logic
const pixel = 20;
const rows = 20; //canvas.height/pixel
const columns = 20; //canvas.width/pixel
let allFruit = [];

function X() {
    return (Math.floor(Math.random()*columns-1)+1)*pixel;
}

function Y() {
    return (Math.floor(Math.random()*rows-1)+1)*pixel;
}

//server logic
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

var users = [];
app.use(express.static("public"));

app.get('/', function(req,res) {
    res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection', function(socket) { 
    users.push({
        id: socket.id,
        body: [[X(),Y()]],
        score: 0  
    });
    allFruit.push({
        x: X(),
        y: Y()
    });
    console.log('%s sockets connected', users.length);

    socket.on("left", function() {
        let index = Search(socket.id);
        let newBody = users[index].body[0][0]-pixel;
        users[index].body.unshift([newBody,users[index].body[0][1]]);
        fruitCollision(users[index]);
        snakeCollision(users[index])
        io.emit("update", users, allFruit);

    });

    socket.on("right", function() {
        let index = Search(socket.id);
        let newBody = users[index].body[0][0]+pixel;
        users[index].body.unshift([newBody,users[index].body[0][1]]);
        fruitCollision(users[index]);
        snakeCollision(users[index])
        io.emit("update", users, allFruit);

    });

    socket.on("down", function() {
        let index = Search(socket.id);
        let newBody = users[index].body[0][1]+pixel;
        users[index].body.unshift([users[index].body[0][0],newBody]);
        fruitCollision(users[index]);
        snakeCollision(users[index])
        io.emit("update", users, allFruit);

    });

    socket.on("up", function() {
        let index = Search(socket.id);
        let newBody = users[index].body[0][1]-pixel;
        users[index].body.unshift([users[index].body[0][0],newBody]);
        fruitCollision(users[index]);
        snakeCollision(users[index])
        io.emit("update", users, allFruit);

    });

    socket.on('disconnect',function() {
        let index = Search(socket.id);
        users.splice(index,1);
        allFruit.splice(0,1);
        io.emit("update", users, allFruit);
        console.log('%s sockets connected', users.length);
    });

    //gameloop
    function gameloop() {
        io.emit("update", users, allFruit);
    }
    gameloop()
    //let game = setInterval(gameloop, 500);

});

server.listen(process.env.PORT || 3000);
console.log('server is running...');


function Search(findSnakeID) {
    for(i=0;i<users.length;i++) {
        if(users[i].id == findSnakeID) {
            return i;
        }
    }
}

function fruitCollision(snake) {
    //fruit collision
    for(i=0;i<allFruit.length;i++) {
        if(snake.body[0][0] == allFruit[i].x && snake.body[0][1] == allFruit[i].y) {
            allFruit.splice(i,1);
            allFruit.push({
                x: X(),
                y: Y()
            });
            return ;
        }
    }
    snake.body.pop()
    snake.score=snake.body.length-1;
}

function snakeCollision(snake) {
    for(i=0;i<users.length;i++) { //goes through users
        for(k=0;k<users[i].body.length;k++) { //goes through other snakes
            for(j=0;j<snake.body.length;j++) {
                //self-collision
                if(users[i].id == snake.id) {
                    if(j>0 && snake.body[0][0]==snake.body[j][0] && snake.body[0][1]==snake.body[j][1]){
                        destroySnake(snake);
                    }
                } else {
                    //other collision
                    if(users[i].body[k][0]==snake.body[j][0] && users[i].body[k][1]==snake.body[j][1]) {
                        destroySnake(snake);
                    }
                }
            }
        }
    }
}




function destroySnake(snake) {
    snake.destroy;
    io.to(snake.id).emit("the end", snake.score);
}
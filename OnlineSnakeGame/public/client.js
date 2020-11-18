//server logic
const socket = io.connect();
var clientSnake;
var fruits;

socket.on("update", function(allSnakes,allFruit) {
    console.log(allSnakes)
    drawBackground();
    for(f =0; f<allFruit.length; f++) {
        drawFruit(allFruit[f]);
    }  
    for(s =0; s<allSnakes.length; s++) {
        drawSnakes(allSnakes[s]);
        if(allSnakes[s].id == socket.id){
            clientSnake = allSnakes[s];
        }
    }
    console.log(clientSnake)
    document.getElementById("score").innerHTML=clientSnake.score;
});

socket.on("the end", function(finalScore) {
    document.defaultView.alert("You died :( \n Score: " + finalScore);
})

//game logic
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const pixel = 20;

function drawBackground() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawFruit(fruit) {
    ctx.fillStyle="#ff0400";
    ctx.fillRect(fruit.x,fruit.y,pixel,pixel);
}

function drawSnakes(snake) {
    for(i=0; i<snake.body.length; i++) {
        ctx.strokeStyle = "#ff0400";
        ctx.strokeRect(snake.body[i][0],snake.body[i][1],pixel,pixel)
        ctx.fillStyle="white";
        ctx.fillRect(snake.body[i][0],snake.body[i][1],pixel,pixel);
    }
}

function direction(event) {
    if(event.keyCode == 37) {
        socket.emit("left")
    } else  if(event.keyCode == 38) {
        socket.emit("up")
    } else  if(event.keyCode == 39) {
        socket.emit("right");
    } else  if(event.keyCode == 40) {
        socket.emit("down")
    }
}

document.addEventListener("keydown",direction);

//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5; //The snake will start at 5,5
var snakeY = blockSize * 5;

var speedX = 0;
var speedY = 0;

var snakeBody = []; //each segment of the array will be part of the snakes body

//food
var foodX; 
var foodY;

//Collision
var collision = false;


window.onload = function () { //event handler that is triggeres a function when window finishes loading
    board = document.getElementById("board"); //gets the canvas element with id of board from HTML doc and assigns it to variable board.
    
    board.height = rows * blockSize; //set height of canvas tp equal the num of rows multiplied by block size. (height of grid)
    
    board.width = cols * blockSize; //set width of canvas to equal num of columns multiplied by the block size.
    context = board.getContext("2d"); //drawing on the board.

    foodDrop(); //if you call food drop after update it wont work
    document.addEventListener("keyup", changeDirection); //event listener will look for keyup then call function change direction.
    //update()
    setInterval(update, 1000/10);
}

    /*you cant call update function once because the game is always redrawing
    itself to show that the snake is moving.*/
    /* divide 1000 milliseconds by 10
    every 100 miliseconds sI will call update function */ 

//want to stop updating canvas (drawing on canvas) once collision occurs
function update()  {
    if (collision) { 
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    if(snakeX == foodX && snakeY == foodY) { //this will grow the part where the food was
        snakeBody.push([foodX, foodY])
        foodDrop();
    }
    
    for (let i = snakeBody.length-1; i > 0; i--){ //starting from the tail towards the head, moving each segment by one
        snakeBody[i] = snakeBody[i-1];            //moving each segment to the spot of its predecessor
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "blue";
    snakeX += speedX * blockSize; //snake * block size will make it move one square at a time instead of a pixel at a time
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // X and Y coord, and width and height of 1 square
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize); //X and y coords 
    }

    //game over conditions, (when colliding with edge of the map)
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        collision = true;
        alert("Game Over...");
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            collision = true;
            alert("Game Over...") 
        }
    }
}
/*

-1 ↑          
 Y |       -1 ←- x -→ +1
+1 ↓

*/
// All possiblities of movement:
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { //snake cannot go directly backwards or it will just eat itself
        speedX = 0;                           // if going right you cant go left, and if going up you cant go down
        speedY = -1; 
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0; 
        speedY = 1;  
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1; 
        speedY =  0; 
    }
    if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1; 
        speedY = 0; 
    }

}

//random food drop function will randomly place food on refresh
function foodDrop(){
    /*math.random chooses a number between 0-1 then multiply between columns and rows so it becomes a number 
     (0-20) but does not include 20.|math.floor is used to get rid of decimals of the 19.9... then multiply by block size (25)
      0-1 * cols --> (0-19.999) --> (0-19) * 25
      The Math.random() method returns a random floating point number between 0 (inclusive) and 1 (exclusive).
    */
    foodX = Math.floor(Math.random()* cols) * blockSize;
    foodY = Math.floor(Math.random()* cols) * blockSize;
}
// Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

// define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 150;
let gameStarted = false;
let highScore = 0;
let coinCollected = new Audio('coinCollected.mp3');
let gameOver = new Audio("gameOver.mp3");



// Draw game map, snake, and food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

// Draw Snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

//create a snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set position of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

function generateFood(){
    const x = Math.floor(Math.random() * 20) + 1;
    const y = Math.floor(Math.random() * 20) + 1;
    return {x, y};
}

function move(){
    const head = { ...snake[0] };
    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    //adds new position as the new head of the snake
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        coinCollected.play();
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval); // clear past interval
        gameInterval = setInterval(() =>{
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

// Start game function 
function startGame() {
    gameStarted = true; // keep track of game state
    instructionText.style.display = 'none';
    logo.style.display = "none";
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

// key press event listener
function handleKeyPress(event){
    if ((!gameStarted && event.code === "Space") || (!gameStarted && event.key === " ")) {
        startGame();
    } else {
        switch (event.key) {
            case "ArrowUp":
                if (direction !== "down") {
                    direction = "up";
                }
                break;
            case "ArrowDown":
                if (direction !== "up") {
                    direction = "down";
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    direction = "left";
                }
                break;
            case "ArrowRight":
                if (direction !== "left") {
                    direction = "right";
                }
                break;
        }   
    }
}

function increaseSpeed(){
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision(){
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame(){
    food = generateFood();
    direction = "right";
    gameSpeedDelay = 200;
    
    updateScore();
    updateHighScore();
    
    snake = [{x : 10, y : 10}];

    stopGame();
}

function updateScore(){
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
}

function updateHighScore(){
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, "0");
    }
    highScoreText.style.display = "block";
}

function stopGame(){
    gameOver.play();
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = "block";
    logo.style.display = "block";
}

document.addEventListener('keydown', handleKeyPress);
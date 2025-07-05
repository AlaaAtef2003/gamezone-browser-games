let lastrender = 0;
const snakespeed = 5;

const snakebody = [
    {x: 11, y: 12},
];

let inputdirection = {x: 0, y: 0};
let lastinputdirection = {x: 0, y: 0};

let food = {x: 5, y: 5}; // موقع الطعام

const gameboard = document.getElementById("game-board");

let amount = 1;
let newsegment = 0;
let gameover = false;
function main(currenttime) {
    if (gameover) {
        if (confirm("Game Over! Press OK to restart.")) {
            window.location.reload();
        }
        return;
    }

    window.requestAnimationFrame(main);
    const seconds = (currenttime - lastrender) / 1000;
    if (seconds < 1 / snakespeed) return;

    lastrender = currenttime;
    update();
    draw();
}


window.requestAnimationFrame(main);

function update() {
    updatesnake();
    updatefood();
    checkdeath();
    addsegment();
}

function draw() {
    gameboard.innerHTML = "";
    drawsnake(gameboard);
    drawfood(gameboard);
}

function updatesnake() {
    inputdirection = getinputdirection();

    // تحريك الجسم من الخلف إلى الأمام
    for (let i = snakebody.length - 2; i >= 0; i--) {
        snakebody[i + 1] = { ...snakebody[i] };
    }

    // تحريك الرأس
    snakebody[0].x += inputdirection.x;
    snakebody[0].y += inputdirection.y;

    // إضافة أجزاء جديدة بعد الأكل
   
}

function drawsnake(gameboard) {
    snakebody.forEach((segment) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameboard.appendChild(snakeElement);
    });
}

function drawfood(gameboard) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameboard.appendChild(foodElement);
}

function updatefood() {
    if (onsnake(food)) {
        expandSnake();
        // تغيير موقع الطعام عشوائيًا في الشبكة
        food = {
            x: Math.floor(Math.random() * 21) + 1,
            y: Math.floor(Math.random() * 21) + 1
        };
    }
}

function onsnake(position) {
    return snakebody.some(segment => segment.x === position.x && segment.y === position.y);
}

function expandSnake() {
    newsegment += amount;
}

function addsegment() {
    for (let i = 0; i < newsegment; i++) {
        snakebody.push({ ...snakebody[snakebody.length - 1] });
    }
    newsegment = 0;
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (lastinputdirection.y !== 0) break;
            inputdirection = {x: 0, y: -1};
            event.preventDefault();
            break;
        case "ArrowDown":
            if (lastinputdirection.y !== 0) break;
            inputdirection = {x: 0, y: 1};
            event.preventDefault();
            break;
        case "ArrowLeft":
            if (lastinputdirection.x !== 0) break;
            inputdirection = {x: -1, y: 0};
            event.preventDefault();
            break;
        case "ArrowRight":
            if (lastinputdirection.x !== 0) break;
            inputdirection = {x: 1, y: 0};
            event.preventDefault();
            break;
    }
});

function getinputdirection() {
    lastinputdirection = inputdirection;
    return inputdirection;
}
function checkdeath(){
    if (inputdirection.x === 0 && inputdirection.y === 0) return; 
    gameover = outsidegrid(snakebody[0]) || snakeintersectuion();
}
function outsidegrid(position) {
    return position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21;
}
function snakeintersectuion() {
    return snakebody.slice(1).some(segment => segment.x === snakebody[0].x && segment.y === snakebody[0].y);
}
function move(direction) {
    switch (direction) {
        case 'up':
            if (lastinputdirection.y !== 0) break;
            inputdirection = {x: 0, y: -1};
            break;
        case 'down':
            if (lastinputdirection.y !== 0) break;
            inputdirection = {x: 0, y: 1};
            break;
        case 'left':
            if (lastinputdirection.x !== 0) break;
            inputdirection = {x: -1, y: 0};
            break;
        case 'right':
            if (lastinputdirection.x !== 0) break;
            inputdirection = {x: 1, y: 0};
            break;
    }
}
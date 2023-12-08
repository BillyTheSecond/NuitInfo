
// board
let board;
let boardWidth = 1000;
let boardHeight = 500;
let context;

// velo
let veloWidth = 188;
let veloHeight = 168;
let veloX = 50;
let veloY = boardHeight - veloHeight;
let veloImg;

let velo = {
    x: veloX,
    y: veloY,
    width: veloWidth,
    height: veloHeight
}

// caillou
let caillouArray = [];

let caillou1Width = 104;
let caillou2Width = 200;
let caillou3Width = 236;
let caillouHeight = 96;

let caillouX = boardWidth  - 50;
let caillouY = boardHeight - caillouHeight;

let caillou1Img;
let caillou2Img;

// physics
let velocityX = -8;
let velocityY = 0;
let gravity = .2;

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("game");
    board.width = boardWidth;
    board.height = boardHeight;

    context = board.getContext("2d");
    veloImg = new Image();
    veloImg.src = "/static/media/velo.png";
    veloImg.onload = function () {
        context.drawImage(veloImg, velo.x, velo.y, velo.width, velo.height);
    }

    caillou1Img = new Image();
    caillou1Img.src = "/static/media/caillou1.png";
    caillou2Img = new Image();
    caillou2Img.src = "/static/media/caillou2.png";
    caillou3Img = new Image();
    caillou3Img.src = "/static/media/caillou3.png";

    requestAnimationFrame(update);
    setInterval(placeCaillou, 1000);
    document.addEventListener("keydown", moveVelo);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, boardWidth, boardHeight)


    // velo
    velocityY += gravity;
    velo.y = Math.min(velo.y + velocityY, veloY);
    context.drawImage(veloImg, velo.x, velo.y, velo.width, velo.height);

    // caillou
    for (let i = 0; i < caillouArray.length; i++) {
        let caillou = caillouArray[i];
        caillou.x += velocityX;
        context.drawImage(caillou.img, caillou.x, caillou.y, caillou.width, caillou.height);
        if (detectCollision(velo, caillou)) {
            gameOver = true;
            veloImg.src = "/static/media/velodead.png"
            veloImg.onload = function () {
                context.drawImage(veloImg, velo.x, velo.y, velo.width, velo.height);
            }
        }
    }

    // score
    context.fillStyle ="#479260";
    context.font= "30px Lato";
    score++;
    context.fillText(score,10,35);
}

function moveVelo(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") ) {
        e.preventDefault();
        if (velo.y == veloY) {
            velocityY = -10;
        }

    }
}

function placeCaillou() {
    if (gameOver) {
        return;
    }

    let caillou = {
        img: null,
        x: caillouX,
        y: caillouY,
        width: null,
        height: caillouHeight
    }

    let placeCaillouChance = Math.random(); // 0-0.99
    if (placeCaillouChance > .80) {
        caillou.img = caillou3Img;
        caillou.width = caillou3Width;
        caillouArray.push(caillou)
    } else if (placeCaillouChance > .60) {
        caillou.img = caillou2Img;
        caillou.width = caillou2Width;
        caillouArray.push(caillou)
    } else if (placeCaillouChance > .40) {
        caillou.img = caillou1Img;
        caillou.width = caillou1Width;
        caillouArray.push(caillou)
    }

    if (caillouArray.length > 5) {
        caillouArray.shift();
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
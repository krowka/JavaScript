// 1200px x 600px
// 48 x 24 = 1152
// 24 x 12 = 576

// Store data
// var someData = 'The data that I want to store for later.';
// localStorage.setItem('myDataKey', someData);

// Get data
// var data = localStorage.getItem('myDataKey');
// console.log(localStorage.getItem('myDataKey'));

// Remove data
// localStorage.removeItem('myDatakey');

var stageEnded = 0;
var colsNumber = 24;
var rowsNumber = 12;
var a = 50; // block's side length

var requestID;

const stageTime = 60000;
var score = 0;
var timer;

var baseBlocksAmount = Math.min(parseInt(window.prompt("Enter base number of block", "70")), colsNumber * rowsNumber*0.8);
var baseSpeed = parseFloat(window.prompt("Enter base ball's speed", "5"));
var basePeriod = parseFloat(window.prompt("Enter base period", "1000"));

//default parameters - medium difficulty
var period = 1000; // after period block's counter is decremented
var speed = 2.5;
var minExpiration = 10;
var blocksAmount = 50;

var dx = 0;
var dy = 0;

var ball = {x: 600, y: 300, r: 25};
ball.row = parseInt(ball.y / rowsNumber);
ball.col = parseInt(ball.x / colsNumber);

var map = new Map();

var playerName = document.getElementById("player_name");
var playerScore = document.getElementById("player_score");

// var playerName = document.querySelectorAll("table").item(1).querySelectorAll("tr").item(1).querySelectorAll("td").item(0);
// var playerScore = document.querySelectorAll("table").item(1).querySelectorAll("tr").item(1).querySelectorAll("td").item(1);

playerScore.textContent = score;

var start = document.getElementById("start");
var startButton = document.getElementById("start-btn");

var popUpBox = document.getElementById("popUp");
var boxText = document.getElementById("boxText");
var clickCounter = 0;
var btn = document.getElementById("btn");

var requestStage = 0;
var iter = 0;

var canvas = document.getElementById("canvas");
var canvasLoad = document.getElementById("canvasLoad");
var ctx = canvas.getContext('2d');
window.addEventListener("keydown", recognizeKey, true);

btn.addEventListener("click", function () {
    clickCounter++;
    popUpBox.style.display = "none";
}, false);

startButton.addEventListener("click", function () {
    start.style.display = "none";
    canvasLoad.style.display = "none";
    playerName.textContent = window.prompt("Enter your name", "Player");
    document.querySelector("main").style.display = "block";
    startGame();
}, false);

function startGame() {
    if (iter == 0) {
        boxText.textContent = "You have finished STAGE 1!\r\nClick button below to start STAGE 2.";
        btn.textContent = "STAGE 2";
        iter++;
        selectStage("EASY", baseBlocksAmount, baseSpeed, basePeriod, 10);
    }
    if (clickCounter == 1 && iter == 1) {
        popUpBox.style.display = "none";
        boxText.textContent = "You have finished STAGE 2!\r\nClick button below to start STAGE 3.";
        btn.textContent = "STAGE 3";
        iter++;
        selectStage("MEDIUM", Math.min(baseBlocksAmount*2, colsNumber*rowsNumber*0.8), baseSpeed*2, basePeriod*0.5, 35);
    }
    if (clickCounter == 2 && iter == 2) {
        popUpBox.style.display = "none";
        boxText.textContent = "You have finished all three stages!";
        btn.textContent = "YEAH!!!";
        iter++;
        selectStage("HARD", Math.min(baseBlocksAmount*4, colsNumber*rowsNumber*0.8), baseSpeed*3, basePeriod*0.2 , 100);
        cancelAnimationFrame(requestStage);
    }
    if(stageEnded == 3){
        updateRank();
        score = 0;
        cancelAnimationFrame(requestStage);
    }
    requestStage = requestAnimationFrame(startGame);

    // SEPARATE STAGES USING CONFIRM (WITH UGLY WHILE LOOP)
    // setTimeout(function () {
    //     selectStage("EASY", 70, 5, 1000, 10);
    // }, 1000);
    //
    // setTimeout(function () {
    //     while (!confirm("Ready for next stage?")) {
    //     }
    //     selectStage("MEDIUM", 100, 10, 500, 35);
    // }, stageTime + 3000);
    //
    // setTimeout(function () {
    //     while (!confirm("Ready for next stage?")) {
    //     }
    //     selectStage("HARD", 120, 15, 200, 100);
    // }, 2 * stageTime + 5000);

    //SEPARATE STAGES USING TIMEOUT CALCULATIONS
    // setTimeout(function () {
    //     selectStage("EASY", 50, 2.5, 1000);
    // }, 2000);
    // setTimeout(function () {
    //     selectStage("MEDIUM", 100, 5, 750);
    // }, stageTime + 4000);
    // setTimeout(function () {
    //     selectStage("HARD", 200, 10, 500);
    // }, 2*stageTime + 7000);
}

function selectStage(modeDifficulty, modeBlocksAmount, modeSpeed, modePeriod, modeMinExpiration) {
    document.getElementById("difficulty").textContent = modeDifficulty;
    document.getElementById("timer").style.color = "black";
    document.getElementById("timer").style.fontSize = "";
    document.getElementById("timer").style.fontWeight = "";
    blocksAmount = modeBlocksAmount;
    speed = modeSpeed;
    dx = dy = 0;
    period = modePeriod;
    minExpiration = modeMinExpiration;
    for (var i = 0; i < blocksAmount; i++) {
        generateBlock();
    }
    timer = performance.now();
    runGame();
}

function runGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let [key, obj] of map) {
        if (obj.counter < obj.expiration) {
            map.delete(key);
            generateBlock();
            continue;
        }
        if (obj.counter < 0) {
            obj.color = "red";
        }
        drawBlock(obj);
    }
    detectCollision();
    drawBall(dx, dy);
    if (performance.now() - timer <= stageTime) {
        var tmp = performance.now() - timer;
        if (parseInt(tmp) > 50000) {
            document.getElementById("timer").style.color = "red";
            document.getElementById("timer").style.fontSize = "xx-large";
            document.getElementById("timer").style.fontWeight = "bold";
        }
        requestID = window.requestAnimationFrame(runGame);
        if (parseInt(tmp) > 50000) {
            document.getElementById("timer").textContent = (tmp / 1000).toFixed(2);
        } else {
            document.getElementById("timer").textContent = (tmp / 1000).toFixed() + " s";
        }
        // document.getElementById("timer").textContent = ((performance.now() - timer) / 1000).toFixed(2);
    } else {
        cancelAnimationFrame(requestID);
        timer = performance.now();
        map.clear();
        console.log(score);
        stageEnded++;
        // updateRank();
        // score = 0;
        popUpBox.style.display = "block";
    }
    // console.log(map);
}

function updateRank() {
    var firstScore = document.getElementById("firstRow").querySelectorAll("td").item(2);
    var secondScore = document.getElementById("secondRow").querySelectorAll("td").item(2);
    var thirdScore = document.getElementById("thirdRow").querySelectorAll("td").item(2);
    if (score > firstScore.textContent) {
        thirdScore.textContent = secondScore.textContent;
        document.getElementById("thirdRow").querySelectorAll("td").item(1).textContent = document.getElementById("secondRow").querySelectorAll("td").item(1).textContent;
        secondScore.textContent = firstScore.textContent;
        document.getElementById("secondRow").querySelectorAll("td").item(1).textContent = document.getElementById("firstRow").querySelectorAll("td").item(1).textContent;
        firstScore.textContent = score;
        document.getElementById("firstRow").querySelectorAll("td").item(1).textContent = playerName.textContent;
    } else if (score > secondScore.textContent) {
        thirdScore.textContent = secondScore.textContent;
        document.getElementById("thirdRow").querySelectorAll("td").item(1).textContent = document.getElementById("secondRow").querySelectorAll("td").item(1).textContent;
        secondScore.textContent = score;
        document.getElementById("secondRow").querySelectorAll("td").item(1).textContent = playerName.textContent;
    } else if (score > thirdScore.textContent) {
        thirdScore.textContent = score;
        document.getElementById("thirdRow").querySelectorAll("td").item(1).textContent = playerName.textContent;
    }
}

function detectCollision() {
    // center of the ball
    // var ballKey = ball.row * colsNumber + ball.col;

    // transform four edges of circles into number of field in which they are located
    var tmp = [[0, -ball.r], [ball.r, 0], [0, ball.r], [-ball.r, 0],
        [(-ball.r) / Math.sqrt(2), (-ball.r) / Math.sqrt(2)],
        [(-ball.r) / Math.sqrt(2), (ball.r) / Math.sqrt(2)],
        [(ball.r) / Math.sqrt(2), (-ball.r) / Math.sqrt(2)],
        [(ball.r) / Math.sqrt(2), (ball.r) / Math.sqrt(2)],
    ];
    var edges = [];

    for (var i = 0; i < tmp.length; i++) {
        edges[i] = parseInt((ball.x + tmp[i][0]) / a) + parseInt((ball.y + tmp[i][1]) / a) * colsNumber;
    }

    for (var key of edges) {
        if (map.has(key)) {
            //update player's score
            score += map.get(key).counter;
            playerScore.textContent = score;

            map.delete(key);
            generateBlock();
        }
    }

    // if(x+r > block.col*a && x+r < block.col*a + a && y > block.row*a && y < block.row*a + a)
    //     map.delete(key);
    // if(x-r > block.col*a && x-r < block.col*a + a && y > block.row*a && y < block.row*a + a)
    //     map.delete(key);
    // if(x > block.col*a && x < block.col*a + a && y+r > block.row*a && y+r < block.row*a + a)
    //     map.delete(key);
    // if(x > block.col*a && x < block.col*a + a && y-r > block.row*a && y-r < block.row*a + a)
    //     map.delete(key);
    // if(x+r > block.col*a && x+r < block.col*a + a && y+r > block.row*a && y+r < block.row*a + a)
    // map.delete(key);
}

function drawBall(dx, dy) {
    // update ball's coordinates
    ball.x = mod(ball.x + dx, canvas.width);
    ball.y = mod(ball.y + dy, canvas.height);
    ball.row = parseInt(ball.y / a);
    ball.col = parseInt(ball.x / a);

    //draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function generateBlock() {
    var key, row, col;
    do {
        row = parseInt(Math.random() * rowsNumber);
        col = parseInt(Math.random() * colsNumber);
        key = row * colsNumber + col;

    } while (map.has(key));

    var block = {
        row: row,
        col: col,
        counter: 20,
        time: performance.now(),
        expiration: (-1) * parseInt(Math.random() * 100) - minExpiration,
        color: 'green'
    };
    map.set(key, block);
}

function drawBlock(block) {
    if (block.color == "green")
        ctx.globalAlpha = (block.counter / 20);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.fillStyle = block.color;
    ctx.fillRect(block.col * a, block.row * a, a, a);
    ctx.strokeRect(block.col * a, block.row * a, a, a);
    ctx.font = "25px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (performance.now() - block.time >= period) {
        block.counter--;
        block.time = performance.now();
    }
    ctx.fillText(block.counter, (block.col + 0.5) * a, (block.row + 0.5) * a);
    ctx.globalAlpha = 1;
    ctx.closePath();
}

//supports modulo for negative numbers
function mod(x, n) {
    return (x % n + n) % n;
}

function recognizeKey(e) {
    switch (e.key) {
        case "ArrowUp":
        case "w":
            dx = 0;
            dy = -1;
            break;
        case "ArrowRight":
        case "d":
            dx = 1;
            dy = 0;
            break;
        case "ArrowDown":
        case "s":
            dx = 0;
            dy = 1;
            break;
        case "ArrowLeft":
        case "a":
            dx = -1;
            dy = 0;
            break;
        default:
            dx = dy = 0;
    }

    dx *= speed;
    dy *= speed;
}

var rad = 100;
var direction = true;

var context = canvasLoad.getContext('2d');
var loadAnimID;

function drawCircle() {
    context.clearRect(0, 0, canvasLoad.width, canvasLoad.height);
    context.beginPath();
    context.arc(600, 300, rad, 0, 2 * Math.PI, false);
    context.stroke();
    if (rad > 300) {
        direction = false;
    }
    if (rad < 100) {
        direction = true;
    }
    if (direction)
        rad++;
    else
        rad--;
    loadAnimID = requestAnimationFrame(drawCircle);
}
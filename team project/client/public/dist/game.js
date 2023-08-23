"use strict";
exports.__esModule = true;
var userController_1 = require("../../API/userController");
var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");
// pipes section ///
var PIPE_WIDTH = 50;
var PIPE_SPACING = 150;
var PIPE_SPEED = 2;
var score = 0;
var level = 1;
var Pipe = /** @class */ (function () {
    function Pipe(x, y, height) {
        this.x = x;
        this.y = y;
        this.height = height;
    }
    Pipe.prototype.draw = function () {
        try {
            if (!canvasContext) {
                throw new Error("Canvas not found");
            }
            canvasContext.fillStyle = "green";
            if (level === 2) {
                canvasContext.fillStyle = "red";
            }
            canvasContext.fillRect(this.x, this.y, PIPE_WIDTH, this.height);
        }
        catch (error) {
            console.log(error);
        }
    };
    Pipe.prototype.move = function () {
        this.x -= PIPE_SPEED;
    };
    return Pipe;
}());
var PipePair = /** @class */ (function () {
    function PipePair(upperPipe, lowerPipe) {
        this.upperPipe = upperPipe;
        this.lowerPipe = lowerPipe;
    }
    PipePair.prototype.move = function () {
        this.upperPipe.move();
        this.lowerPipe.move();
    };
    PipePair.prototype.draw = function () {
        this.upperPipe.draw();
        this.lowerPipe.draw();
    };
    return PipePair;
}());
var pipePairs = [];
function createPipePair() {
    var minHeight = 50;
    var maxHeight = canvas.height - minHeight - PIPE_SPACING;
    var height = Math.random() * (maxHeight - minHeight) + minHeight;
    var upperPipe = new Pipe(canvas.width, 0, height);
    var lowerPipeHeight = canvas.height - (height + PIPE_SPACING);
    var lowerPipe = new Pipe(canvas.width, height + PIPE_SPACING, lowerPipeHeight);
    pipePairs.push(new PipePair(upperPipe, lowerPipe));
}
function movePipes() {
    for (var _i = 0, pipePairs_1 = pipePairs; _i < pipePairs_1.length; _i++) {
        var pipePair = pipePairs_1[_i];
        pipePair.move();
    }
}
function drawPipes() {
    for (var _i = 0, pipePairs_2 = pipePairs; _i < pipePairs_2.length; _i++) {
        var pipePair = pipePairs_2[_i];
        pipePair.draw();
    }
}
var pipeCreationInterval = null;
function createPipePairAndSetInterval() {
    createPipePair();
    if (level === 1 && pipeCreationInterval === null) {
        pipeCreationInterval = setInterval(createPipePair, 3000);
    }
}
createPipePairAndSetInterval();
function removePipes() {
    for (var i = pipePairs.length - 1; i >= 0; i--) {
        if (pipePairs[i].upperPipe.x + PIPE_WIDTH < 0) {
            pipePairs.splice(i, 1);
        }
    }
}
// bird section ///
var birdWidth = 34;
var birdHeight = 24;
var birdX = (canvas.width - birdWidth) / 2;
var birdY = (canvas.height - birdHeight) / 2;
var GameBird = /** @class */ (function () {
    function GameBird(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    GameBird.prototype.draw = function () {
        if (!canvasContext) {
            console.error("Canvas context not found");
            return;
        }
        canvasContext.fillStyle = "yellow";
        canvasContext.fillRect(this.x, this.y, this.width, this.height);
        canvasContext.fillStyle = "white";
        canvasContext.font = "24px Ariel";
        canvasContext.fillText("score: " + score, 10, 30);
    };
    return GameBird;
}());
var birdYPosition = birdY;
var bird = new GameBird(birdX, birdY, birdWidth, birdHeight);
function drawBird() {
    bird.draw();
    bird.y = birdYPosition;
}
var keys = {};
document.addEventListener("keydown", function (event) {
    keys[event.code] = true;
});
document.addEventListener("keyup", function (event) {
    keys[event.code] = false;
});
function handleKeyboardInput() {
    if (keys["ArrowUp"] && birdYPosition > 0) {
        birdYPosition -= 3;
    }
    if (keys["ArrowDown"] && birdYPosition + birdHeight < canvas.height) {
        birdYPosition += 3;
    }
}
function getLeaderboard() {
    fetch("/api/users/leaderboard")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
    })["catch"](function (error) {
        console.error(error);
    });
}
// controller section ///
var gameOver = false;
function stopGame() {
    gameOver = true;
    var gameOverMessage = document.getElementById("gameOverMessage");
    gameOverMessage.style.display = "block";
    // score keeper
    userController_1.saveScore("username", score);
    getLeaderboard();
}
function checkCollision() {
    for (var _i = 0, pipePairs_3 = pipePairs; _i < pipePairs_3.length; _i++) {
        var pipePair = pipePairs_3[_i];
        var upperPipe = pipePair.upperPipe;
        var lowerPipe = pipePair.lowerPipe;
        var pipeTop = upperPipe.height;
        var pipeBottom = lowerPipe.y;
        console.log("Upper Pipe Height:", pipeTop);
        console.log("Lower Pipe Height:", pipeBottom);
        if (bird.x + birdWidth > upperPipe.x &&
            bird.x < upperPipe.x + PIPE_WIDTH &&
            (bird.y < pipeTop || bird.y + birdHeight > pipeBottom)) {
            console.log("Collision Detected!");
            stopGame();
        }
    }
}
var startTime = Date.now();
function drawLevel() {
    var drawLevel2 = document.getElementById("levelMessage");
    if (drawLevel2) {
        drawLevel2.style.display = "block";
        setTimeout(function () {
            drawLevel2.style.display = "none";
        }, 2000);
    }
}
var levelChanged = false;
function updateLevel() {
    try {
        var currentTime = Date.now();
        if (!levelChanged && currentTime - startTime >= 15000) {
            level = 2;
            PIPE_SPEED = 3.5;
            if (pipeCreationInterval) {
                clearInterval(pipeCreationInterval);
                pipeCreationInterval = null;
                setInterval(createPipePair, 1500);
            }
            drawLevel();
            levelChanged = true;
        }
    }
    catch (error) {
        console.log(error);
    }
}
function gameLoop() {
    try {
        if (!canvasContext) {
            throw new Error("there is no canvasContext");
        }
        if (gameOver) {
            return;
        }
        handleKeyboardInput();
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        movePipes();
        drawBird();
        drawPipes();
        removePipes();
        checkCollision();
        updateLevel();
        requestAnimationFrame(gameLoop);
    }
    catch (error) {
        console.log(error);
    }
}
gameLoop();

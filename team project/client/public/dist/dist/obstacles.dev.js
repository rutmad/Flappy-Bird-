"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");
var PIPE_WIDTH = 50;
var PIPE_SPACING = 250;
var PIPE_SPEED = 1;
var score = 0;
var level = 1;

var Pipe =
/** @class */
function () {
  function Pipe(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.color = "green";
  }

  Pipe.prototype.draw = function () {
    try {
      if (!canvasContext) {
        throw new Error("didn't found canvas");
      }

      canvasContext.fillStyle = this.color;
      canvasContext.fillRect(this.x, this.y, PIPE_WIDTH, this.height);
    } catch (error) {
      console.log(error);
    }
  };

  Pipe.prototype.move = function () {
    this.x -= PIPE_SPEED;
  };

  return Pipe;
}();

var pipes = [];

function createPipe() {
  var minHeight = 50;
  var maxHeight = canvas.height - minHeight - PIPE_SPACING;
  var height = Math.random() * (maxHeight - minHeight) + minHeight;
  var upperPipe = new Pipe(canvas.width, 0, height);
  var lowerPipe = new Pipe(canvas.width, height + PIPE_SPACING, canvas.height - (height + PIPE_SPACING));

  if (level === 2) {
    upperPipe.color = "red";
    lowerPipe.color = "red";
  }

  pipes.push(upperPipe, lowerPipe);
} // adding a score each time the bird passes a pipe


pipes.forEach(function (pipe) {
  if (bird.x > pipe.x + PIPE_WIDTH && !pipe.scored) {
    score += 0.5;
    pipe.scored = true;
  }
});

function movePipe() {
  for (var _i = 0, pipes_1 = pipes; _i < pipes_1.length; _i++) {
    var pipe = pipes_1[_i];
    pipe.move();
  }
}

function drawPipe() {
  for (var _i = 0, pipes_2 = pipes; _i < pipes_2.length; _i++) {
    var pipe = pipes_2[_i];
    pipe.draw();
  }
} // function createPipeAndSetInterval() {
//   createPipe();
//   if (level === 1) {
//     setInterval(createPipe, 3000);
//   }
// }


var pipeCreationInterval = null;

function createPipeAndSetInterval() {
  createPipe();

  if (level === 1 && pipeCreationInterval === null) {
    pipeCreationInterval = setInterval(createPipe, 4000);
  }
}

createPipeAndSetInterval();

function removePipes() {
  for (var i = pipes.length - 1; i >= 0; i--) {
    if (pipes[i].x + PIPE_WIDTH < 0) {
      pipes.splice(i, 1);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("gameCanvas");
  var canvasContext = canvas.getContext("2d");

  if (!canvas) {
    console.error("Canvas element not found.");
    return;
  }

  if (!canvasContext) {
    console.error("Failed to get 2D context from canvas.");
    return;
  }

  canvasContext.fillStyle = "yellow";
  canvasContext.fillRect(300, 300, 50, 50);
});
var birdWidth = 34;
var birdHeight = 24;
var birdX = (canvas.width - birdWidth) / 2;
var birdY = (canvas.height - birdHeight) / 2;

var GameBird =
/** @class */
function () {
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
}();

var bird = new GameBird(birdX, birdY, birdWidth, birdHeight);

function drawBird() {
  bird.draw();
}

var gameOver = false;

function stopGame() {
  gameOver = true;
  var gameOverMessage = document.getElementById("gameOverMessage");
  gameOverMessage.style.display = "block";
}

function checkCollision() {
  for (var _i = 0, pipes_3 = pipes; _i < pipes_3.length; _i++) {
    var pipe = pipes_3[_i];

    if (bird.x + birdWidth > pipe.x && bird.y < pipe.height || bird.x + birdWidth > pipe.x && bird.y > pipe.height + PIPE_SPACING) {
      stopGame();
    }
  }
}

var startTime = Date.now();

function drawLevel() {
  if (level === 2) {
    if (canvasContext) {
      canvasContext.font = "30px";
      canvasContext.fillStyle = "black";
      canvasContext.fillText("great - level 2", canvas.width / 2, canvas.height / 2);
    }
  }
}

var levelChanged = false;

function updateLevel() {
  try {
    var currentTime = Date.now();

    if (!levelChanged && currentTime - startTime >= 15000) {
      level = 2;
      PIPE_SPEED = 2;

      if (pipeCreationInterval) {
        clearInterval(pipeCreationInterval);
        pipeCreationInterval = null;
        setInterval(createPipe, 2000);
      }

      levelChanged = true;
    }
  } catch (error) {
    console.log(error);
  }
}

function gameLoop() {
  return __awaiter(this, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2,, 3]);

          if (!canvasContext) {
            throw new Error("there is no canvasContext");
          }

          if (gameOver) {
            return [2
            /*return*/
            ];
          }

          canvasContext.clearRect(0, 0, canvas.width, canvas.height);
          return [4
          /*yield*/
          , movePipe()];

        case 1:
          _a.sent();

          drawPipe();
          removePipes();
          drawLevel();
          drawBird();
          checkCollision();
          updateLevel();
          requestAnimationFrame(gameLoop);
          return [3
          /*break*/
          , 3];

        case 2:
          error_1 = _a.sent();
          console.log(error_1);
          return [3
          /*break*/
          , 3];

        case 3:
          return [2
          /*return*/
          ];
      }
    });
  });
}

startTime = Date.now();
gameLoop();
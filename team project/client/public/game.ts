const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d");

// pipes section ///

const PIPE_WIDTH = 50;
let PIPE_SPACING = 150;
let PIPE_SPEED = 2;
let score = 0;
let level = 1;

class Pipe {
  x: number;
  y: number;
  height: number;

  constructor(x: number, y: number, height: number) {
    this.x = x;
    this.y = y;
    this.height = height;
  }

  draw() {
    try {
      if (!canvasContext) {
        throw new Error("Canvas not found");
      }
      canvasContext.fillStyle = "green";
      if (level === 2) {
        canvasContext.fillStyle = "red";
      }
      canvasContext.fillRect(this.x, this.y, PIPE_WIDTH, this.height);
    } catch (error) {
      console.log(error);
    }
  }

  move() {
    this.x -= PIPE_SPEED;
  }
}

class PipePair {
  upperPipe: Pipe;
  lowerPipe: Pipe;

  constructor(upperPipe: Pipe, lowerPipe: Pipe) {
    this.upperPipe = upperPipe;
    this.lowerPipe = lowerPipe;
  }

  move() {
    this.upperPipe.move();
    this.lowerPipe.move();
  }

  draw() {
    this.upperPipe.draw();
    this.lowerPipe.draw();
  }
}

const pipePairs: PipePair[] = [];

function createPipePair() {
  const minHeight = 50;
  const maxHeight = canvas.height - minHeight - PIPE_SPACING;
  const height = Math.random() * (maxHeight - minHeight) + minHeight;
  const upperPipe = new Pipe(canvas.width, 0, height);
  const lowerPipeHeight = canvas.height - (height + PIPE_SPACING);
  const lowerPipe = new Pipe(
    canvas.width,
    height + PIPE_SPACING,
    lowerPipeHeight
  );

  pipePairs.push(new PipePair(upperPipe, lowerPipe));
}

function movePipes() {
  for (const pipePair of pipePairs) {
    pipePair.move();
  }
}

function drawPipes() {
  for (const pipePair of pipePairs) {
    pipePair.draw();
  }
}

let pipeCreationInterval: number | null = null;

function createPipePairAndSetInterval() {
  createPipePair();
  if (level === 1 && pipeCreationInterval === null) {
    pipeCreationInterval = setInterval(createPipePair, 3000);
  }
}

createPipePairAndSetInterval();

function removePipes() {
  for (let i = pipePairs.length - 1; i >= 0; i--) {
    if (pipePairs[i].upperPipe.x + PIPE_WIDTH < 0) {
      pipePairs.splice(i, 1);
    }
  }
}

// bird section ///

const birdWidth = 34;
const birdHeight = 24;

const birdX = (canvas.width - birdWidth) / 2;
const birdY = (canvas.height - birdHeight) / 2;

class GameBird {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    if (!canvasContext) {
      console.error("Canvas context not found");
      return;
    }

    canvasContext.fillStyle = "yellow";
    canvasContext.fillRect(this.x, this.y, this.width, this.height);

    canvasContext.fillStyle = "white";
    canvasContext.font = "24px Ariel";
    canvasContext.fillText("score: " + score, 10, 30);
  }
}

let birdYPosition = birdY;

const bird = new GameBird(birdX, birdY, birdWidth, birdHeight);

function drawBird() {
  bird.draw();
  bird.y = birdYPosition;
}

const keys: { [key: string]: boolean } = {};

document.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
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

// controller section ///

let gameOver = false;

function stopGame() {
  gameOver = true;
  const gameOverMessage = document.getElementById("gameOverMessage");
  gameOverMessage!.style.display = "block";
}

function checkCollision() {
  for (const pipePair of pipePairs) {
    const upperPipe = pipePair.upperPipe;
    const lowerPipe = pipePair.lowerPipe;
    const pipeTop = upperPipe.height;
    const pipeBottom = lowerPipe.y;

    console.log("Upper Pipe Height:", pipeTop);
    console.log("Lower Pipe Height:", pipeBottom);

    if (
      bird.x + birdWidth > upperPipe.x &&
      bird.x < upperPipe.x + PIPE_WIDTH &&
      (bird.y < pipeTop || bird.y + birdHeight > pipeBottom)
    ) {
      console.log("Collision Detected!");
      stopGame();
    }
  }
}

let startTime = Date.now();

function drawLevel() {
  const drawLevel2 = document.getElementById("levelMessage");
  if (drawLevel2) {
    drawLevel2.style.display = "block";
    setTimeout(() => {
      drawLevel2.style.display = "none";
    }, 2000);
  }
}

let levelChanged = false;

function updateLevel() {
  try {
    const currentTime = Date.now();
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
  } catch (error) {
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
  } catch (error) {
    console.log(error);
  }
}

gameLoop();

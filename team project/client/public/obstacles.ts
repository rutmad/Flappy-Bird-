const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d");

const PIPE_WIDTH = 50;
let PIPE_SPACING = 150;
let PIPE_SPEED = 1;
let score = 0;

class Pipe {
  x: number;
  y: number;
  height: number;
  color: string;

  constructor(x: number, y: number, height: number) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.color = "green";
  }

  draw() {
    try {
      if (!canvasContext) {
        throw new Error("didn't found canvas");
      }
      canvasContext.fillStyle = this.color;
      canvasContext.fillRect(this.x, this.y, PIPE_WIDTH, this.height);
    } catch (error) {
      console.log(error);
    }
  }

  move() {
    this.x -= PIPE_SPEED;
  }
}

const pipes: Pipe[] = [];

function createPipe() {
  const minHeight = 50;
  const maxHeight = canvas.height - minHeight - PIPE_SPACING;
  const height = Math.random() * (maxHeight - minHeight) + minHeight;

  const upperPipe = new Pipe(canvas.width, 0, height);
  const lowerPipe = new Pipe(
    canvas.width,
    height + PIPE_SPACING,
    canvas.height - (height + PIPE_SPACING)
  );

  // adding a score each time the bird passes a pipe
  pipes.forEach((pipe) => {
    if (bird.x > pipe.x + PIPE_WIDTH && !pipe.scored) {
      score += 0.5;
      pipe.scored = true;
    }
  });

  pipes.push(upperPipe, lowerPipe);
}

function movePipe() {
  for (const pipe of pipes) {
    pipe.move();
  }
}

function drawPipe() {
  for (const pipe of pipes) {
    pipe.draw();
  }
}

function createPipeAndSetInterval() {
  createPipe();
  setInterval(createPipe, 3000);
}

createPipeAndSetInterval();

function removePipes() {
  for (let i = pipes.length - 1; i >= 0; i--) {
    if (pipes[i].x + PIPE_WIDTH < 0) {
      pipes.splice(i, 1);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

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

const bird = new GameBird(birdX, birdY, birdWidth, birdHeight);

function drawBird() {
  bird.draw();
}

let gameOver = false;

function stopGame() {
  gameOver = true;
  const gameOverMessage = document.getElementById("gameOverMessage");
  gameOverMessage!.style.display = "block";
}

function checkCollision() {
  for (const pipe of pipes) {
    if (
      (bird.x + birdWidth > pipe.x && bird.y < pipe.height) ||
      (bird.x + birdWidth > pipe.x && bird.y > pipe.height + PIPE_SPACING)
    ) {
      stopGame();
    }
  }
}

let startTime = Date.now();
let level = 1;

function drawLevel() {
  if (level === 2) {
    if (canvasContext) {
      canvasContext.font = "30px";
      canvasContext.fillStyle = "black";
      canvasContext.fillText(
        "great - level 2",
        canvas.width / 2,
        canvas.height / 2
      );
    }
  }
}

let levelChanged = false;

function updateLevel() {
  try {
    const currentTime = Date.now();
    if (!levelChanged && currentTime - startTime >= 7000) {
      level = 2;
      PIPE_SPACING = 120;
      PIPE_SPEED = 2;
      for (const pipe of pipes) {
        pipe.color = "red";
      }
      const levelMessage = document.getElementById("levelMessage");
      if (levelMessage) {
        levelMessage.style.display = "block";
        levelChanged = true;
        setTimeout(() => {
          if (levelMessage) {
            levelMessage.style.display = "none";
          } else {
            throw new Error("no levelMessage");
          }
        }, 2000);
      } else {
        throw new Error("no levelMessage");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function gameLoop() {
  try {
    if (!canvasContext) {
      throw new Error("there is no canvasContext");
    }
    if (gameOver) {
      return;
    }
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    await movePipe();
    drawPipe();
    removePipes();
    drawLevel();
    drawBird();
    checkCollision();
    updateLevel();
    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.log(error);
  }
}

startTime = Date.now();
gameLoop();

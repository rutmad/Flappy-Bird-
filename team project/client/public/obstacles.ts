const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d");

const PIPE_WIDTH = 50;
const PIPE_SPACING = 120;
const PIPE_SPEED = 1;

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
        throw new Error("didn't found canvas");
      }
      canvasContext.fillStyle = "green";
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

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Failed to get 2D context from canvas.");
    return;
  }

  ctx.fillStyle = "yellow";
  ctx.fillRect(300, 300, 50, 50);
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
  move() {
    this.x -= 1;
  }

  draw() {
    if (!canvasContext) {
      console.error("Canvas context not found");
      return;
    }

    canvasContext.fillStyle = "yellow";
    canvasContext.fillRect(this.x, this.y, this.width, this.height);
  }
}

const bird = new GameBird(birdX, birdY, birdWidth, birdHeight);

function drawBird() {
  bird.draw();
}

function moveBird() {
  bird.move();
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
    drawBird();
    checkCollision();
    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.log(error);
  }
}

gameLoop();

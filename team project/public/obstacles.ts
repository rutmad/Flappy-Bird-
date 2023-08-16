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

async function gameLoop() {
  try {
    if (!canvasContext) {
      throw new Error("there is no canvasContext");
    }
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    await movePipe();
    drawPipe();
    removePipes();
    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.log(error);
  }
}

gameLoop();

// This will run when the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the canvas element and assert its type to HTMLCanvasElement
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

  // Check if the canvas isn't null and get the 2D context
  if (canvas) {
    const ctx = canvas.getContext("2d");

    // Ensure we successfully got the context
    if (ctx) {
      // Set the fill color to black
      ctx.fillStyle = "black";

      // Draw the black box. The parameters for fillRect are (x, y, width, height)
      ctx.fillRect(10, 10, 50, 50);
    } else {
      console.error("Failed to get 2D context from canvas.");
    }
  } else {
    console.error("Canvas element not found.");
  }
});

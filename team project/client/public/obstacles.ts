const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d");

const PIPE_WIDTH = 50;
let PIPE_SPACING = 250;
let PIPE_SPEED = 1;
let score = 0;
let level = 1;

class Pipe {
  x: number;
  y: number;
  height: number;
  color: string;
  scored?: boolean;  

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

// pipes
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
  if (level === 2) {
    upperPipe.color = "red";
    lowerPipe.color = "red";
  }

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

// function createPipeAndSetInterval() {
//   createPipe();
//   if (level === 1) {
//     setInterval(createPipe, 3000);
//   }
// }

let pipeCreationInterval: number | null = null;

function createPipeAndSetInterval() {
  createPipe();
  if (level === 1 && pipeCreationInterval === null) {
    pipeCreationInterval = setInterval(createPipe, 4000);
  }
}

createPipeAndSetInterval();

function removePipes() {
  for (let i = pipes.length - 1; i >= 0; i--) {
    if (pipes[i].x + PIPE_WIDTH < 0) {
      pipes.splice(i, 1);
    }
  }
}

let birdImg

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const canvasContext = canvas.getContext("2d");

  if (!canvas) {
    console.error("Canvas element not found.");
    return;
  }

  if (!canvasContext) {
    console.error("Failed to get 2D context from canvas.");
    return;
  }

  const birdWidth = 42;
  const birdHeight = 42;

  const birdX = (canvas.width - birdWidth) / 2;
  const birdY = (canvas.height - birdHeight) / 2;

  class GameBird {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityY: number;   

     constructor(x: number, y: number, width: number, height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.velocityY = 0;
    }

  draw() {
    if (!canvasContext) {
      console.error("Canvas context not found");
      return;
    }

  this.velocityY += 0.2; // Gravity effect
      this.y += this.velocityY;

      if (this.y > canvas.height - this.height) {
        this.y = canvas.height - this.height;
        this.velocityY = 0;
      }

      // canvasContext.fillStyle = "yellow";
      // canvasContext.fillRect(this.x, this.y, this.width, this.height);

     birdImg = new Image();
     birdImg.src = "./pictures/flappybird.png"
     canvasContext.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)


     // score code :
      canvasContext.fillStyle = "white";
      canvasContext.font = "24px Arial";
      canvasContext.fillText("score: " + score, 10, 30);
      pipes.forEach((pipe) => {
        if (birdX > pipe.x + PIPE_WIDTH && !pipe.scored) {
          // score += 0.5;
          const userScore = score += 0.5;
          console.log("score: ", userScore);
          pipe.scored = true;
        }
      });
      

    }


    flap() {
      this.velocityY = -5; // Move the bird up when flapping
    //    canvasContext.fillStyle = "yellow";
    // canvasContext.fillRect(this.x, this.y, this.width, this.height);
  }
}

// bird code
const bird = new GameBird(birdX, birdY, birdWidth, birdHeight);


function drawBird() {
  bird.draw();
}

// function moveBird() {
//   bird.move();
// }

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
      PIPE_SPEED = 2;
      if (pipeCreationInterval) {
        clearInterval(pipeCreationInterval);
        pipeCreationInterval = null;
        setInterval(createPipe, 2000);
      }
      drawLevel();
      levelChanged = true;
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

// The code for the bird to move up and down
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    bird.flap();
  }
});

function saveScore(name: any, score: any) {
  fetch("/saveScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, score: score }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Score saved successfully");
      } else {
        console.error("Failed to save score");
      }
    });
}

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
  scored: boolean;

  constructor(x: number, y: number, height: number) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.scored = false;
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
    pipeCreationInterval = setInterval(createPipePair, 3000) as any;
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

const birdWidth = 40;
const birdHeight = 40;

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

    const birdImage = new Image();
    birdImage.src = "pictures/flappybird.png";
    canvasContext.drawImage(birdImage, this.x, this.y, this.width, this.height);

    // canvasContext.fillStyle = "yellow";
    // canvasContext.fillRect(this.x, this.y, this.width, this.height);

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

function getLeaderboard() {
  fetch("/api/leaderboard")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

canvasContext!.fillStyle = "white";
canvasContext!.font = "24px Arial";
canvasContext!.fillText("score: " + score, 10, 30);
function updateScore() {
  pipePairs.forEach((pipePair) => {
    const upperPipe = pipePair.upperPipe;
    if (birdX > upperPipe.x + PIPE_WIDTH && !upperPipe.scored) {
      const userScore = (score += 1);
      console.log("Score: ", userScore);
      upperPipe.scored = true;
    }
  });
}

function saveScore(token: string, score: any): void {
  fetch("/api/saveScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ score }),
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

// function stopGame(): void {
//   gameOver = true;
//   const gameOverMessage = document.getElementById("gameOverMessage");
//   gameOverMessage!.style.display = "block";
//   saveScore("delete me", score);
//   getLeaderboard();
// }

function openLeaderboardModal() {
  try {
    const modal = document.getElementById("leaderboardModal");
    const closeBtn = document.getElementById("closeLeaderboardModal");
    const leaderboardTableBody = document.querySelector(
      "#leaderboardList tbody"
    );

    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (!leaderboardTableBody) {
          throw new Error("there is no leaderboardTableBody");
        }

        leaderboardTableBody.innerHTML = "";
        data.leaderboard.forEach((entry, index) => {
          const row = document.createElement("tr");
          const rankCell = document.createElement("td");
          const nameCell = document.createElement("td");
          const scoreCell = document.createElement("td");

          rankCell.textContent = (index + 1).toString();
          nameCell.textContent = entry.name;
          scoreCell.textContent = entry.score.toString();

          row.appendChild(rankCell);
          row.appendChild(nameCell);
          row.appendChild(scoreCell);

          leaderboardTableBody.appendChild(row);
        });

        if (!modal) {
          throw new Error("there is no modal");
        }
        modal.style.display = "block";
      })
      .catch((error) => {
        console.error(error);
      });
    if (!closeBtn) {
      throw new Error("there is no closeBtn");
    }
    closeBtn.addEventListener("click", () => {
      if (!modal) {
        throw new Error("there is no modal");
      }
      modal.style.display = "none";
    });

    const restartButtonLeaderboard = document.getElementById(
      "restartButtonLeaderboard"
    );
    if (restartButtonLeaderboard) {
      restartButtonLeaderboard.addEventListener("click", () => {
        location.reload();
      });
    }

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        if (!modal) {
          throw new Error("there is no modal");
        }
        modal.style.display = "none";
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// function openLeaderboardModal() {
//   try {
//     const modal = document.getElementById("leaderboardModal");
//     const closeBtn = document.getElementById("closeLeaderboardModal");
//     const leaderboardList = document.getElementById("leaderboardList");

//     fetch("/api/leaderboard")
//       .then((res) => res.json())
//       .then((data) => {
//         if (!leaderboardList) {
//           throw new Error("there is no leaderboardList");
//         }
//         leaderboardList.innerHTML = "";
//         data.leaderboard.forEach((entry) => {
//           const listItem = document.createElement("li");
//           listItem.textContent = `${entry.name}: ${entry.score}`;
//           leaderboardList.appendChild(listItem);
//         });
//         if (!modal) {
//           throw new Error("there is no modal");
//         }
//         modal.style.display = "block";
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     if (!closeBtn) {
//       throw new Error("there is no closeBtn");
//     }
//     closeBtn.addEventListener("click", () => {
//       if (!modal) {
//         throw new Error("there is no modal");
//       }
//       modal.style.display = "none";
//     });

//     const restartButtonLeaderboard = document.getElementById(
//       "restartButtonLeaderboard"
//     );
//     if (restartButtonLeaderboard) {
//       restartButtonLeaderboard.addEventListener("click", () => {
//         location.reload();
//       });
//     }

//     window.addEventListener("click", (event) => {
//       if (event.target === modal) {
//         if (!modal) {
//           throw new Error("there is no modal");
//         }
//         modal.style.display = "none";
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

function stopGame() {
  gameOver = true;
  const gameOverMessage = document.getElementById("gameOverMessage");

  const scoreDisplay = document.getElementById("gameOverResult");
  if (scoreDisplay) {
    scoreDisplay.textContent = "Your Score: " + score;
  }

  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
    restartButton.addEventListener("click", () => {
      location.reload();
    });
  }
  const leaderboardButton = document.getElementById("leaderboardButton");
  if (leaderboardButton) {
    leaderboardButton.addEventListener("click", () => {
      openLeaderboardModal();
    });
  }

  gameOverMessage!.style.display = "block";
  saveScore("delete me", score);
}

let gameOver = false;

function checkCollision() {
  const birdBoundingBox = {
    left: bird.x + 5,
    right: bird.x + birdWidth - 5,
    top: bird.y + 2,
    bottom: bird.y + birdHeight - 2,
  };

  for (const pipePair of pipePairs) {
    const upperPipe = pipePair.upperPipe;
    const lowerPipe = pipePair.lowerPipe;
    const pipeTop = upperPipe.height;
    const pipeBottom = lowerPipe.y;

    if (
      birdBoundingBox.right > upperPipe.x &&
      birdBoundingBox.left < upperPipe.x + PIPE_WIDTH &&
      (birdBoundingBox.top < pipeTop || birdBoundingBox.bottom > pipeBottom)
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
    updateScore();
    removePipes();
    checkCollision();
    updateLevel();
    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.log(error);
  }
}

gameLoop();

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d");

const PIPE_WIDTH = 50;
const PIPE_SPACING = 150;

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
    canvasContext!.fillStyle = "green";
    canvasContext!.fillRect(this.x, this.y, PIPE_WIDTH, this.height);
  }
}

const pipes: Pipe[] = [];

function createPipe() {
  const minHeight = 50;
  const maxHeight = canvas.height - minHeight - PIPE_SPACING;
  const height = Math.random() * (maxHeight - minHeight) + minHeight;

  pipes.push(new Pipe(canvas.width, 0, height));
  pipes.push(
    new Pipe(
      canvas.width,
      height + PIPE_SPACING,
      canvas.height - (height + PIPE_SPACING)
    )
  );
}

createPipe();

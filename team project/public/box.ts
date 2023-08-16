window.onload = function () {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  // Draw a black box
  const boxWidth = 50;
  const boxHeight = 50;
  const boxX = 100; // X coordinate
  const boxY = 100; // Y coordinate
  ctx.fillStyle = "Black";
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
};

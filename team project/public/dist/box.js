window.onload = function () {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    // Draw a black box
    var boxWidth = 50;
    var boxHeight = 50;
    var boxX = 100; // X coordinate
    var boxY = 100; // Y coordinate
    ctx.fillStyle = "Black";
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
};

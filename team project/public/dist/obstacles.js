var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");
var PIPE_WIDTH = 50;
var PIPE_SPACING = 150;
var Pipe = /** @class */ (function () {
    function Pipe(x, y, height) {
        this.x = x;
        this.y = y;
        this.height = height;
    }
    Pipe.prototype.draw = function () {
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(this.x, this.y, PIPE_WIDTH, this.height);
    };
    return Pipe;
}());
var pipes = [];
function createPipe() {
    var minHeight = 50;
    var maxHeight = canvas.height - minHeight - PIPE_SPACING;
    var height = Math.random() * (maxHeight - minHeight) + minHeight;
    pipes.push(new Pipe(canvas.width, 0, height));
    pipes.push(new Pipe(canvas.width, height + PIPE_SPACING, canvas.height - (height + PIPE_SPACING)));
}
createPipe();

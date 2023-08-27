document.addEventListener("DOMContentLoaded", function () {
    var startGameButton = document.getElementById("startGameButton");
    var countdownElement = document.getElementById("countdown");
    if (startGameButton && countdownElement) {
        startGameButton.addEventListener("click", function () {
            startCountdown(countdownElement, 3, function () {
                window.location.href = "./game.html";
            });
        });
    }
});
function startCountdown(element, seconds, onComplete) {
    var count = seconds;
    element.style.display = "block";
    var countdownInterval = setInterval(function () {
        if (count > 0) {
            element.textContent = count;
            count--;
        }
        else {
            element.style.display = "none";
            clearInterval(countdownInterval);
            onComplete();
        }
    }, 1000);
}

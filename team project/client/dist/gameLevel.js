document.addEventListener("DOMContentLoaded", function () {
    var startGameButton = document.getElementById("startGameButton");
    if (startGameButton) {
        startGameButton.addEventListener("click", function () {
            window.location.href = "./public/index.html";
        });
    }
});

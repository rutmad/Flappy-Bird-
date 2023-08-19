document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("startGameButton");

  if (startGameButton) {
    startGameButton.addEventListener("click", () => {
      window.location.href = "./public/index.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("startGameButton");
  const countdownElement = document.getElementById("countdown");

  if (startGameButton && countdownElement) {
    startGameButton.addEventListener("click", () => {
      startCountdown(countdownElement, 3, () => {
        window.location.href = "./game.html";
      });
    });
  }
});

function startCountdown(element: any, seconds: any, onComplete: any) {
  let count = seconds;
  element.style.display = "block";

  const countdownInterval = setInterval(() => {
    if (count > 0) {
      element.textContent = count;
      count--;
    } else {
      element.style.display = "none";
      clearInterval(countdownInterval);
      onComplete();
    }
  }, 1000);
}

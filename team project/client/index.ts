document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/get-user");
    const data = await response.json();

    if (data.ok) {
      const userHTML = document.querySelector("#username") as HTMLElement;
      if (userHTML) {
        userHTML.innerText = data.user.name;
      }
    } else {
      console.error();
    }
  } catch (error) {
    console.error(error);
  }
});

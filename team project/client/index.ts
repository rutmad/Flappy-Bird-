import { login } from "../API/userController";

interface User {
  name: string;
  password: string;
  uid?: string;
  _id?: string;
}

function handleGetUsers() {
  console.log("test");
  try {
    fetch("/api/users/get-users")
      .then((res) => res.json())
      .then(({ users }) => {
        try {
          if (!users) throw new Error("didn't find users");
          console.log(users);
          renderUsers(users);
        } catch (error) {
          console.error(error);
        }
      });
  } catch (error) {
    console.error(error);
  }
}

function renderUsers(users: Array<User>) {
  try {
    if (!users) throw new Error("No users");

    const html = users
      .map((user) => {
        return renderUsers(users);
      })
      .join(" ");
    const usersElement = document.querySelector("#users");
    if (!usersElement) throw new Error("couldn't find users");

    usersElement.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const registrationMessage = document.getElementById(
    "registrationMessage"
  ) as HTMLElement;

  if (!login) {
    registrationMessage.style.display = "block";
  }
});

function handleAddUser(ev: any) {
  try {
    ev.preventDefault();
    const name = ev.target.elements.name.value;
    const password = ev.target.elements.password.value;
    if (!name) throw new Error("No name");
    if (!password) throw new Error("No password");
    const newUser: any = { name, password };

    fetch("/api/add-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((data) => {
        console.log(data);
        if (data.ok) {
          window.location.href = "./index.html";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

function handleLogin(ev: any) {
  try {
    ev.preventDefault();
    console.log(ev.target.elements);
    const name = ev.target.elements.name.value;
    const password = ev.target.elements.password.value;
    if (!name) throw new Error("No name");
    if (!password) throw new Error("No Password");
    const newUser: any = { name, password };

    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          window.location.href = "./gameLevel.html";
        } else {
          const loginErrorMessage =
            document.getElementById("loginErrorMessage");
          if (loginErrorMessage) {
            loginErrorMessage.style.display = "block";
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

function saveScore(name: any, score: any) {
  fetch("/saveScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, score: score }),
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

function getLeaderboard() {
  fetch("/api/users/leaderboard")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

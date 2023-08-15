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
          if (!users) throw new Error("didnt find users");
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
    if (!usersElement) throw new Error("coundnt find users");

    usersElement.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function handleAddUser(ev: any) {
  try {
    ev.preventDefault();
    const name = ev.target.elements.name.value;
    const email = ev.target.element.email.value;
    const password = ev.target.elements.password.value;
    if (!name) throw new Error("No name");
    if (!email) throw new Error("No email");
    if (!password) throw new Error("No password");
    const newUser: any = { name, email, password };

    fetch("/api/add-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

// async function handleGetUser() {
//   try {
//     const response = await fetch("/api/get-user");
//     const data = await response.json();
//     console.log("data", data);
//     const { user } = data;
//     const userHTML: HTMLDivElement | null = document.querySelector("#username");

//     if (!user) throw new Error("didn't get user from DB");
//     if (!userHTML) throw new Error("No user element on DOM");
//     userHTML.innerText = user.name;
//   } catch (error) {
//     console.error(error);
//   }
// }

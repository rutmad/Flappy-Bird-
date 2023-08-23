"use strict";
exports.__esModule = true;
var userController_1 = require("../API/userController");
function handleGetUsers() {
    console.log("test");
    try {
        fetch("/api/users/get-users")
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var users = _a.users;
            try {
                if (!users)
                    throw new Error("didn't find users");
                console.log(users);
                renderUsers(users);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
function renderUsers(users) {
    try {
        if (!users)
            throw new Error("No users");
        var html = users
            .map(function (user) {
            return renderUsers(users);
        })
            .join(" ");
        var usersElement = document.querySelector("#users");
        if (!usersElement)
            throw new Error("couldn't find users");
        usersElement.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    var registrationMessage = document.getElementById("registrationMessage");
    if (!userController_1.login) {
        registrationMessage.style.display = "block";
    }
});
function handleAddUser(ev) {
    try {
        ev.preventDefault();
        var name = ev.target.elements.name.value;
        var password = ev.target.elements.password.value;
        if (!name)
            throw new Error("No name");
        if (!password)
            throw new Error("No password");
        var newUser = { name: name, password: password };
        fetch("/api/add-user", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(function (data) {
            console.log(data);
            if (data.ok) {
                window.location.href = "./index.html";
            }
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
function handleLogin(ev) {
    try {
        ev.preventDefault();
        console.log(ev.target.elements);
        var name = ev.target.elements.name.value;
        var password = ev.target.elements.password.value;
        if (!name)
            throw new Error("No name");
        if (!password)
            throw new Error("No Password");
        var newUser = { name: name, password: password };
        fetch("/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.ok) {
                window.location.href = "./gameLevel.html";
            }
            else {
                var loginErrorMessage = document.getElementById("loginErrorMessage");
                if (loginErrorMessage) {
                    loginErrorMessage.style.display = "block";
                }
            }
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
function saveScore(name, score) {
    fetch("/saveScore", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name, score: score })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if (data.success) {
            console.log("Score saved successfully");
        }
        else {
            console.error("Failed to save score");
        }
    });
}
function getLeaderboard() {
    fetch("/api/users/leaderboard")
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
    })["catch"](function (error) {
        console.error(error);
    });
}

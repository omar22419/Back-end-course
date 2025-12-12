const express = require("express");
const port = 3000;
const app = express();
const fs = require("node:fs");
const path = require("node:path");
const filePath = path.resolve("./users.json");
let userLenght = require("./users.json").length;

app.use(express.json());

function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeUsers(user) {
  fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
}

// 1- add user
app.post("/user", (req, res, next) => {
  const users = readUsers();
  const { name, age, email } = req.body;
  const existsUser = users.find((user) => user.email === email);
  if (existsUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const newUser = {
    id: userLenght + 1,
    name,
    age,
    email,
  };
  users.push(newUser);
  writeUsers(users);
  res.json({ message: "User added successfully.", user: newUser });
});

// 2- update user data

app.patch("/user/:id", (req, res) => {
  const users = readUsers();
  console.log(users);
  const id = req.params.id;
  const user = users.find((userId) => userId.id == id);
  if (!user) {
    return res.status(404).json({ message: "User ID not found." });
  }
  const { name, age, email } = req.body;
  if (name) {
    user.name = name;
  }
  if (age) {
    user.age = age;
  }
  if (email) {
    user.email = email;
  }
  writeUsers(users);
  res.json({ message: "User Updated", user });
});

// 3- delete user

app.delete("/user/:id", (req, res) => {
  const users = readUsers();
  const id = req.params.id;
  console.log(id);
  const newUsers = users.filter((user) => {
    user.id != id;
  });
  if (newUsers.length === users.length) {
    return res.status(404).json({ message: "User ID not found." });
  }
  writeUsers(newUsers);
  res.json({ message: "User deleted successfully." });
});

// 4- get user by his name

app.get("/user/getByName", (req, res) => {
  const users = readUsers();
  const { name } = req.query;

  const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase());
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
});

// 5- get all users

app.get("/user", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// 6- filter users by mininum age

app.get("/user/filter", (req, res) => {
  const users = readUsers();
  const { minAge } = req.query;

  const result = users.filter((u) => u.age >= Number(minAge));
  res.json(result);
});

// 7- get user by id

app.get("/user/:id", (req, res) => {
  const users = readUsers();
  const { id } = req.params;

  const user = users.find((u) => u.id == id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});

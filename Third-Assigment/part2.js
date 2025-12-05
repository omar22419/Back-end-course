const http = require("node:http");
let port = 3000;
const fs = require("node:fs");
const path = require("node:path");
const filePath = path.resolve("./user.json");
// function listen(){

// }

function readUser() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeUser(user) {
  fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
}

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/user" && method === "POST") {
    let data = "";
    const users = readUser();
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const { name, email, age } = JSON.parse(data);
      const checkUserExist = users.find((user) => {
        return user.email == email;
      });
      if (checkUserExist) {
        res.writeHead(409, { "content-type": "application/json" });
        return res.end(JSON.stringify({ message: "Email already exists" }));
      }
      users.push({ name, age, email });
      writeUser(users);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ massage: "User added successfully.", user: data })
      );
    });
  } else if (url.startsWith("/user/") && method === "PATCH") {
    const id = Number(url.split("/")[2]);
    const users = readUser();
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ massage: "User not found" }));
    } else {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      const { name, age, email } = JSON.parse(data);
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
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "User updated.", user }));
    }
  } else if (url.startsWith("/user/") && method === "DELETE") {
    const id = Number(url.split("/")[2]);
    const users = readUser();

    const newUsers = users.filter((user) => user.id !== id);

    if (newUsers.length === users.length) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "User not found." }));
    }

    writeUsers(newUsers);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User deleted successfully." }));
  } else if (url === "/user" && method === "GET") {
    const users = readUser();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(users));
  } else if (url.startsWith("/user/") && method === "GET") {
    const id = Number(url.split("/")[2]);
    const users = readUsers();
    const user = users.find((u) => u.id === id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ msg: "User not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Invalid application routing</h1>");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`The server is running on port:: ${port}🚀`);
});

server.on("error", (error) => {
  if (error === "EADDRINUSE") {
    ++port;
    server.listen(port, "127.0.0.1", 511, () => {
      console.log(`The server is running on port:: ${port}🚀`);
    });
  } else {
    server.close();
  }
});

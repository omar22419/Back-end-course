//1. Write a function that logs the current file path and directory. (0.5 Grade)

const path = require("node:path");
function currentPathAndDirectory() {
  return console.log(`File: ${__filename}, Dir: ${__dirname}`);
}

currentPathAndDirectory();

////////////////////////////////////////////////////////////

//2. Write a function that takes a file path and returns its file name. (0.5 Grade)

function fileName(filePath) {
  return console.log(path.basename(filePath));
}
fileName(__filename);

////////////////////////////////////////////////////////////

//3. Write a function that builds a path from an object (0.5 Grade)

function buildPath(pathObject) {
  return `${pathObject.dir}/${pathObject.name}.${pathObject.ext}`;
}

console.log(
  buildPath({
    dir: "/folder",
    name: "app",
    ext: "js",
  })
);

////////////////////////////////////////////////////////////

// 4. Write a function that returns the file extension from a given file path. (0.5 Grade)

function fileExtension(filePath) {
  return console.log(path.extname(filePath));
}

fileExtension(__filename);

////////////////////////////////////////////////////////////

// 5. Write a function that parses a given path and returns its name and ext. (0.5 Grade)

function parsePath(filePath) {
  const { name, ext } = path.parse(filePath);

  return console.log({ name, ext });
}

parsePath(__filename);

////////////////////////////////////////////////////////////

// 6. Write a function that checks whether a given path is absolute. (0.5 Grade)

function pathIsAbsolute(filePath) {
  return console.log(path.isAbsolute(filePath));
}

pathIsAbsolute(__filename);

////////////////////////////////////////////////////////////

// 7. Write a function that joins multiple segments (0.5 Grade)

function joinsMultipleSegments(...segments) {
  const filters = segments.filter((segment) => segment);
  return console.log(filters.join("/"));
}
joinsMultipleSegments("src", "components", "app.js");

////////////////////////////////////////////////////////////

// 8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)

function resolvesRelativePath(relativePath) {
  return console.log(path.resolve(relativePath));
}

resolvesRelativePath("./bouns.js");

////////////////////////////////////////////////////////////

// 9. Write a function that joins two paths. (0.5 Grade)

function joinsTwoPaths(path1, path2) {
  return console.log(path.join(path1, path2));
}
joinsTwoPaths("folder1", "folder2/file.txt");

////////////////////////////////////////////////////////////

// 10. Write a function that deletes a file asynchronously. (0.5 Grade)

const fs = require("fs");
async function deleteFile(pathfile) {
  try {
    await fs.unlink(pathfile);
    const fileName = path.basename(pathfile);
    console.log(`${fileName} is deleted`);
  } catch (error) {
    return console.log(error);
  }
}

// deleteFile("./test.txt");

////////////////////////////////////////////////////////////

// 11. Write a function that creates a folder synchronously. (1 Grade)
function createFolder(folderName) {
  fs.mkdirSync(folderName, { recursive: true });
  return "Success";
}

createFolder("test");

////////////////////////////////////////////////////////////

// 12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
const EventEmitter = require("events");
const { platform, arch } = require("node:os");
const emitter = new EventEmitter();

emitter.on("start", () => {
  console.log("Welcome event triggered");
});

emitter.emit("start");

////////////////////////////////////////////////////////////

// 13. Emit a custom "login" event with a username parameter. (0.5 Grade)

emitter.on("login", (username) => {
  console.log(`user logged in: ${username}`);
});

emitter.emit("login", "Ahmed");

////////////////////////////////////////////////////////////

// 14. Read a file synchronously and log its contents. (1 Grade)

function readFileSync(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  console.log(data);
  return console.log(`the file content => "${data}"`);
}

readFileSync("notes.txt");

////////////////////////////////////////////////////////////

const fileSystemPromises = require("fs").promises;
// 15. Write asynchronously to a file. (1 Grade)

async function writeFileAsync(path, content) {
  await fileSystemPromises.writeFile(path, content);
}

writeFileAsync("./async.txt", "Async save");

////////////////////////////////////////////////////////////

// 16. Check if a directory exists. (0.5 Grade)

function existsDirectory(directorPath) {
  return console.log(fs.existsSync(directorPath));
}

existsDirectory(__dirname);

////////////////////////////////////////////////////////////

// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)

const os = require("os");
function getInformation() {
  return console.log({ platform: os.platform(), arch: os.arch() });
}

getInformation();

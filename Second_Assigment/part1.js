//1. Write a function that logs the current file path and directory. (0.5 Grade)

const path = require("node:path");
function currentPathAndDirectory(){
    return console.log(`File: ${__filename}, Dir: ${__dirname}`); 
}

currentPathAndDirectory()

////////////////////////////////////////////////////////////

//2. Write a function that takes a file path and returns its file name. (0.5 Grade)

function fileName(filePath){
    return console.log(path.basename(filePath))
}
fileName(__filename)

////////////////////////////////////////////////////////////

//3. Write a function that builds a path from an object (0.5 Grade)

function buildPath(pathObject){
    return `${pathObject.dir}/${pathObject.name}.${pathObject.ext}`
}

console.log(buildPath({
    dir:'/folder',
    name:'app',
    ext: 'js'
}));

////////////////////////////////////////////////////////////

// 4. Write a function that returns the file extension from a given file path. (0.5 Grade)

function fileExtension(filePath){
    return console.log(path.extname(filePath))
}

fileExtension(__filename)


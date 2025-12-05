const fs = require('node:fs');
const path = require('node:path');
// 1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)

const filePath = path.resolve('./big.txt');

const readStream = fs.createReadStream(filePath,{encoding:'utf-8'})
readStream.on('data',(chunk)=>{
    console.log(chunk);
})


////////////////////////////////////////////////////////////

// 2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)

const destPath = path.resolve('./dest.txt')
const sourcePath = path.resolve('./source.txt');
const readStream2 = fs.createReadStream(sourcePath,{encoding:'utf-8'});
const writeStream = fs.WriteStream(destPath);

readStream2.on('data',chunk=>{
    console.log(chunk);
    writeStream.write(chunk);
})

////////////////////////////////////////////////////////////

// 3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)

const zlib = require('node:zlib');
const {pipeline} = require('node:stream');

pipeline(fs.createReadStream('./data.txt'),zlib.createGzip(),fs.createWriteStream('data.txt.gz'),
(error)=>{
    if(error){
        console.log('Pieline has error',error);
    }else{
        console.log('Pipeline succeeded.');
    }
})
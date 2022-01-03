// 'fs': File System Node Module
const fs = require('fs');

// 'path': Path Node Module; to avoid slash-related problems when hardcoding a path (related to different OSs)
const path = require('path');

// Reading a file_____________________________
fs.readFile(
  // PATH
  path.join(__dirname, 'files', 'starter.txt'),
  // DATA TYPE TO RECIEVE
  'utf8',
  // ERR
  (err, data) => {
    if (err) throw err;
    console.log(data);
});

console.log('Hello...');

// Writing a file_______________________________
fs.writeFile(
  // PATH
  path.join(__dirname, 'files', 'reply.txt'),
  // CONTENT
  'Nice to meet you', 
  // ERR 
  (err) => {
    if (err) throw err;
    console.log('Succesfully created file');
});

// Appending a File____________________________
fs.appendFile(
  // PATH
  path.join(__dirname, 'files', 'test.txt'),
  // CONTENT
  'Testing text', 
  // ERR 
  (err) => {
    if (err) throw err;
    console.log('Succesfully appended file');
});

// Renaming File_______________________________
fs.rename(
  // PATH
  path.join(__dirname, 'files', 'test.txt'),
  // PATH WITH NEW NAME MODIFIED!!
  path.join(__dirname, 'files', 'testRenamed.txt'), 
  // ERR
  (err) => {
    if (err) throw err;
    console.log('Succesfully renamed file');
});

// Deleting File__________________________________
fs.unlink(
  // PATH
  path.join(__dirname, 'files', 'test.txt'),
  // ERR
  (err) => {
    if (err) throw err;
    console.log('Succesfully renamed file');
});


// Uncaught errors:__________________________________
process.on(
  'uncaughtException',
  err => {
    console.log(`Uncaught error: ${err}`);
    process.exit(1)
})
// The console is the terminal window
console.log('hello world');

// global object instead of window object
  // console.log(global);

// CommonJS modules instead of es6 modules

//  Imports: require('./PATH')

// OS module (builtin)
const os = require('os');
console.log('OS.TYPE(): ', os.type());
console.log('OS.VERSION(): ', os.version());
console.log('OS.HOMEDIR():', os.homedir());

// Directory variables
console.log('__DIRNAME: ', __dirname);
console.log('__FILENAME: ', __filename);

// Path module (builtin)
const path = require('path');
console.log('PATH.DIRNAME(__FILENAME): ', path.dirname(__filename));
console.log('PATH.BASENAME(__FILENAME): ', path.basename(__filename));
console.log('PATH.EXTNAME(__FILENAME): ', path.extname(__filename));
console.log('PATH.PARSE(__FILENAME): ', path.parse(__filename));

// Importing custom module ('./math) by destructuring its contents
const { add, subtract, multiply, divide } = require('./math');
console.log(subtract(5, 8));
console.log(divide(5, 8));

// Node missing some JS APIs like fetch; no problem (npm)


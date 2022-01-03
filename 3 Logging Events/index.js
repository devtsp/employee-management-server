// Custom module
const logEvents = require('./logEvents');

// Common core module
const EventEmitter = require('events');

// Event Emitter
class MyEmitter extends EventEmitter {};

// Initialize object
const myEmitter = new MyEmitter();

// Add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  // Emit event
  myEmitter.emit('log', 'Log event emmited!')
}, 2000);
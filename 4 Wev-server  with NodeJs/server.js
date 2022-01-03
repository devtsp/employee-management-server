const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();


// 
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

// Defining a port for local host
const PORT = process.env.PORT || 3500;

// CB to serve files
const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes('image') // png & jpeg includes 'image' in content type spec
        ? 'utf-8' // If not 'image' type found: display text
        : '' // String expected in this place: though this is recieved as unspecified
    );
    // Especial treatment to handle JSON
    const data = 
      contentType === 'application/json'
        ? JSON.parse(rawData)
        : rawData;
    // Setting the head of the response
    response.writeHead(
      filePath.includes('404.html') // Checking if it was a 404 to set first arg
        ? 404
        : 200, 
      {'Content-Type': contentType});
    // Responde ending
    response.end(
      contentType === 'application/json'
        ? JSON.stringify(data) 
        : data
    );
  } catch (err) {
    console.log(err);
    // Log event handler on error
    myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
    response.statusCode = 500;
    response.end();
  }
}

// Main Serving Function
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // Log event handler on success
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')

  // Getting the extension out of the whole requested URL
  const extension = path.extname(req.url);

  // Deciding type of content requested from extension
  let contentType;
  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  // Setting an auxiliar path for the requested file to work with
  let filePath = 
    // Looking for home dir
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      // Looking for sub-dirs
      : contentType === 'text/html' && req.url.slice(-1) === '/'
        ? path.join(__dirname, 'views', req.url, 'index.html')
        // Looking for other type of files
        : contentType === 'text/html'
          ? path.join(__dirname, 'views', req.url)
          : path.join(__dirname, req.url);
  
  // If no .html extension provided on the req
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html'

  // Binding a boolean helper to check existence of file in req
  const fileExists = fs.existsSync(filePath);
  
  // Procedure on file found/not found
  if (fileExists) {
    // Serve the file
    serveFile(filePath, contentType, res);
  } else {
    switch(path.parse(filePath).base) {
      // Redirect to new page case
      case 'old-page.html':
        // Redirect: 301
        res.writeHead(301, {'Location': '/new-page.html'});
        // End response
        res.end();
        break;
      // Redirect to homepage
      case 'www-page.html':
        // Redirect: 301
        res.writeHead(301, {'Location': '/'});
        // End response
        res.end();
      default:
        // Serve a 404 response
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
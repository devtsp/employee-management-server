const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
  origin: (origin, callback) => {
    // If index == -1 it means it doesnt exists
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // First arg null: error
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors());

// app.use() to apply middleware to all routes that are coming-in 
// (remember express works like a waterfall from top to bottom).
// Built-in middleware to handle urlencoded data (form data):
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json:
app.use(express.json());

// Serve static files such as images or stylesheets
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
  // If not provided express return a 302 by default
  // We need to specify a 301 for a permanent redirect
  res.redirect(301, '/new-page.html');  
});

// Route handlers: next()
app.get(
  '/hello(.html)?', 
  (req, res, next) => {
    console.log('attempted to load hello.html');
    // Here we move on to the next 'middleware', 
    // a chained function inside app.get args
    next();
  }, 
  // Here the chained 'middleware'
  (req, res) => {
    res.send('Hello World!')
  }
);

// Chaining middlewares with next() route handler
const one = (req, res, next) => {
  console.log('one');
  next();
};

const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res) => {
  console.log('three');
  res.send('Finished!');
};

app.get(
  '/chain(.html)?',
  // Here we argument an array containing the handlers in order
  [one, two, three]
);


// Express handles routes like a waterfall. At the end we can set a default,
// a 'catch all' in other words, if anything before fails to serve we're
// going to display the 404.html file in this last step via app.all()
app.all('*', (req, res) => {
  // We set status(404)
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found'});
  } else {
    res.type('txt').send('404 Not Found')
  } 
});

// Custom error middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
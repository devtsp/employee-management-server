const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials')
const PORT = process.env.PORT || 3500;

// Middleware
app.use(logger); // Logger (custom)
app.use(credentials); // Handle options credentials check before CORS and fetch cookies credentials requirement (custom)
app.use(cors()); // Cross Origin Resource sharing (third party)
app.use(express.urlencoded({ extended: false })); // Urlencoded form data (builtin)
app.use(express.json()); // Json (builtin)
app.use(cookieParser()); // Cookies (third party)

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT); // Everything after this line will use JWT middleware
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found'});
  } else {
    res.type('txt').send('404 Not Found')
  } 
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
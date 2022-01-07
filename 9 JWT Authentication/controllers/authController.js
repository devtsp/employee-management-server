const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
};
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
// We still simulating db with json files;
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required'});
  const foundUser = usersDB.users.find(person => person.username === user);
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // Create JWTs
    const accessToken = jwt.sign(
      // Payload (do not put secret info)
      { 'username': foundUser.username },
      // Secret we defined on .env file
      process.env.ACCESS_TOKEN_SECRET,
      // Options value
      { expiresIn: '60s' }
    );
    // Jsonwebtoken method: .sign()
    const refreshToken = jwt.sign(
      // Payload (do not put secret info)
      { 'username': foundUser.username },
      // Secret we defined on .env file
      process.env.REFRESH_TOKEN_SECRET,
      // Options value
      { expiresIn: '1d' }
    );
    // Store token within current user in db
    const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );
    res.cookie(
      'jwt', // Name of the cookie
      refreshToken, // Payload
      // Options obj: only http for security (not available to JavaScript), duration of 1 day (in ms)
      { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 *60 * 1000 }
    );
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
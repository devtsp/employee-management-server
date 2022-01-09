const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
};
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

// Check refreshToken existence on db
  const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie(
      'jwt', // Name of the cookie to be deleted 
      { httpOnly: true, sameSite: 'None', secure: true } // Pass the same options we passed on creation (but 'maxAge' or 'expiration')
    );
    return res.sendStatus(204); // Succesfull no content
  };
  // Remove refreshToken from db
  const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
  const currentUser = {
    ...foundUser, 
    refreshToken: '' // Setting token to blank basically
  };
  // Database update simulation
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); 
  res.sendStatus(204);
};

module.exports = { handleLogout };
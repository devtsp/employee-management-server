const User = require('../model/User');

const handleLogout = async (req, res) => {
	// On client, also delete the accessToken
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); //No content
	const refreshToken = cookies.jwt;

	// Check refreshToken existence on db
	const foundUser = await User.findOne({ refreshToken }).exec();
	if (!foundUser) {
		res.clearCookie(
			'jwt', // Name of the cookie to be deleted
			{ httpOnly: true, sameSite: 'None', secure: true } // Pass the same options we passed on creation (but 'maxAge' or 'expiration')
		);
		return res.sendStatus(204); // Succesfull no content
	}
	// 'Erasing' token
	foundUser.refreshToken = '';
	// Save changes to mongoDB document (instance/record) in users collection
  const result = await foundUser.save();
  // The logs have to be deleted on production!!
  console.log(result)
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	res.sendStatus(204);
};

module.exports = { handleLogout };

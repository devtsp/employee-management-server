const User = require('../model/User');

const handleLogout = async (req, res) => {
	// jwt refresh token cookie existence check
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);

	// Find logged user in DB by active refresh token
	const refreshToken = cookies.jwt;
	const foundUser = await User.findOne({ refreshToken }).exec();

	// If not just return
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		return res.sendStatus(204);
	}

	// If logged clear refresh token and 'jwt' cookie
	foundUser.refreshToken = '';
	await foundUser.save();
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	res.sendStatus(204);
};

module.exports = { handleLogout };

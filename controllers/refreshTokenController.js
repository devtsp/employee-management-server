const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
	// Check jwt refresh token cookie
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);

	// Find logged user by refresh token
	const refreshToken = cookies.jwt;
	const foundUser = await User.findOne({ refreshToken }).exec();

	// If user already logged out just return
	if (!foundUser) return res.sendStatus(403);

	//
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		// If error or user found differs from token return 403
		if (err || foundUser.username !== decoded.username)
			return res.sendStatus(403);

		// Sign refresh token with user and roles
		const roles = Object.values(foundUser.roles);
		const accessToken = jwt.sign(
			{
				'UserInfo': {
					'username': decoded.username,
					'roles': roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '60s' }
		);
		res.json({ accessToken });
	});
};

module.exports = { handleRefreshToken };

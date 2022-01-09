const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ 'message': 'Username and password are required' });
	const foundUser = await User.findOne({ username: user }).exec();
	if (!foundUser) return res.sendStatus(401); // Unauthorized
	// Evaluate password
	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		// Grab roles
		const roles = Object.values(foundUser.roles);
		// Create JWTs
		const accessToken = jwt.sign(
			// Payload (do not put secret info)
			// UserInfo as different namespace (considered to be a private JWT claim)
			// From reserved abbreviations/words (see docs))
			{
				'UserInfo': {
					'username': foundUser.username,
					'roles': roles,
				},
			},
			// Secret we defined on .env file
			process.env.ACCESS_TOKEN_SECRET,
			// Options value
			{ expiresIn: '60s' }
		);
		// Jsonwebtoken method: .sign()
		const refreshToken = jwt.sign(
			// No need to send role on refresh token
			// Payload (do not put secret info)
			{ 'username': foundUser.username },
			// Secret we defined on .env file
			process.env.REFRESH_TOKEN_SECRET,
			// Options value
			{ expiresIn: '1d' }
		);
		// Store token within current user in db
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result)

		res.cookie(
			'jwt', // Name of the cookie
			refreshToken, // Payload
			// Options obj: only http for security (not available to JavaScript), duration of 1 day (in ms)
			{
				httpOnly: true,
				sameSite: 'None',
				// 'secure: true' prop will need to be removed when testing refresh token with ThunderClient. This is required when working with chrome/on production
				// secure: true,
				maxAge: 24 * 60 * 60 * 1000,
			}
		);
		res.json({ accessToken });
	} else {
		res.sendStatus(401);
	}
};

module.exports = { handleLogin };

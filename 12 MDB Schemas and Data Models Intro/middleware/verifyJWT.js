const jwt = require('jsonwebtoken');

// Remainder: middleware have to handle next()
const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	// Check existence: if not set status to 401 Unauthorized
	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
	console.log(authHeader); // We'll see: Bearer token
	// Extraxct the token  from the header recieved via split() and indexing
	const token = authHeader.split(' ')[1];
	// jsonwebtoken method: .verify()
	jwt.verify(
		token, // Payload
		process.env.ACCESS_TOKEN_SECRET, // Secret
		(err, decoded) => {
			// Callback to handle error/display response
			if (err) return res.sendStatus(403);
			// Invalid Token
			req.user = decoded.UserInfo.username;
			req.roles = decoded.UserInfo.roles;
			next();
		}
	);
};

module.exports = verifyJWT;

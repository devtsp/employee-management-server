const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	// User and password existence check
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ 'message': 'Username and password are required.' });

	// Duplicate user registration check
	const duplicate = await User.findOne({ username: user }).exec();
	if (duplicate) return res.sendStatus(409);

	// Try save user and password into DB
	try {
		const hashedPwd = await bcrypt.hash(pwd, 10);
		const result = await User.create({
			'username': user,
			'password': hashedPwd,
		});
		console.log(result);
		res.status(201).json({ 'success': `New user ${user} created!` });
	} catch (err) {
		res.status(500).json({ 'message': err.message });
	}
};

module.exports = { handleNewUser };

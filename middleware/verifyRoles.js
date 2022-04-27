const verifyRoles = (...allowedRoles) => {
	// Return callback
	return (req, res, next) => {
		// Check roles in request
		if (!req?.roles) return res.sendStatus(401);

		// Check if user have at least 1 allowed role to dispatch the action
		const rolesArray = [...allowedRoles];
		const result = req.roles
			.map(role => rolesArray.includes(role))
			.find(val => val === true);
		if (!result) return res.sendStatus(401);

		next();
	};
};

module.exports = verifyRoles;

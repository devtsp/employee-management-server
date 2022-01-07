const verifyRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.roles) return res.sendStatus(401);
		// Allowed roles passed in
		const rolesArray = [...allowedRoles];
		console.log('Allowed roles: ',rolesArray);
		//Coming from JWT
		console.log('Requester roles: ',req.roles);
		// Compare the role arrays
		const result = req.roles
			.map(role => rolesArray.includes(role))
			.find(val => val === true);
		if (!result) return res.sendStatus(401);
		next();
	};
};

module.exports = verifyRoles;

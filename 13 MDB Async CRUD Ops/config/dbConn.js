const mongoose = require('mongoose');

// Mongoose is async
const connectDB = async () => {
	try {
		// process.env = searchs on .env file
		await mongoose.connect(
			process.env.DATABASE_URI,
			// Prevent warning from mongoDB
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectDB;

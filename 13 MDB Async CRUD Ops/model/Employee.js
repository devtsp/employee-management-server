const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
});

// The fisrst arg is the singular name of the collection of the model. Mongoose automatically looks for the plural lowercased version of the model name
// In this case the model 'Employee' is for the 'employees' collection in the DB
// .model() makes a copy of the schema (in this case 'employeeSchema')

module.exports = mongoose.model('Employee', employeeSchema);

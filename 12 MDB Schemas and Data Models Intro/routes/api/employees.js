const express = require('express');
const ROLES_LIST = require('../../config/roles_list');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const verifyRoles = require('../../middleware/verifyRoles');

router
	.route('/')
	.get(employeesController.getAllEmployees)
	.post(
		// Allow admin an editor to POST employee
		verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
		employeesController.createNewEmployee
	)
	.put(
		// Allow admin and editor to PUT employee
		verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
		employeesController.updateEmployee
	)
	.delete(
		// Allow only admin to DELETE employee
		verifyRoles(ROLES_LIST.Admin),
		employeesController.deleteEmployee
	);

router.route('/:id').get(employeesController.getEmployee);

module.exports = router;

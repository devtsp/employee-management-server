const data = {
  // Import database
  employees: require('../model/employees.json'),
  // Setter
  setEmployees: function (data) { this.employees = data }
};

const getAllEmployees = (req, res) => {
  res.json(data.employees)
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    // Create an id manually and chronologically
    id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
    // Requesting the data from the body recieved
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }

  // Making sure first and lastname were sent
  if (!newEmployee.firstname || !newEmployee.lastname) {
    // If not response status of 400
    return res.status(400).json({ 'message': 'First and last names are required' })
  }

  // Set new employee at end of data array
  data.setEmployees([...data.employees, newEmployee]);
  // Response on succeed
  res.status(201).json(data.employees);
};


// View: .sort() - .find()
const updateEmployee = (req, res) => {
  // Find the employee to be updated from the list
  const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
  // If not id found status 400
  if (!employee) {
    return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
  }
  // If so set first name 
  if (req.body.firstname) employee.firstname = req.body.firstname;
  // And last name
  if (req.body.lastname) employee.lastname = req.body.lastname;
  // List containing all other employees but the updated one
  const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
  // Spread that in another list and push the updated one
  const unsortedArray = [...filteredArray, employee];
  // Set sorted new list to data
  data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  // Respond the final result
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  // Find the one
  const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
  // Existence check
  if (!employee) {
    return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
  }
  // Make new list without the one
  const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
  // Set that to new state of data
  data.setEmployees([...filteredArray]);
  // Respond the final result
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  // Find employee by id on the params
  const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
  // Check existence
  if (!employee) {
    return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
  };
  // Simply respond with the employee data
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
};


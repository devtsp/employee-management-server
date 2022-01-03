const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
// Exporting all at once with 'module.exports' = {}
module.exports = { add, subtract };

// Exporting on function definition directly
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;



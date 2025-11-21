const Employees = require('../models/employees');
const Logs = require('../models/logs')

// Create new employee
const createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    if (!first_name || !last_name || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newEmployee = await Employees.create({
      first_name,
      last_name,
      email,
      phone,
      organisation_id: req.organisation_id, //gets from the middleware function (jwt token paylaod data)
    });
    await Logs.create({
        organisation_id:req.organisation_id,
        user_id : newEmployee.id, 
        action : `Employee  '${newEmployee.id}' is created in organisation id '${req.organisation_id}'`,
        timestamp: new Date()
    })
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Create Employee error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// List of all the  employees for the authenticated user's organisation
const getEmployees = async (req, res) => {
    try {
    const employees = await Employees.findAll({
      where: { organisation_id: req.organisation_id }
    })
    return res.json(employees)
  } catch (error) {
    console.error('Get Employees error:', error);
    return res.status(500).json({ message: 'Server error' })
  }
};

// Get employee by ID and  ensure belongs to organisation
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findOne({
      where: { id, organisation_id: req.organisation_id }
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await Logs.create({
        organisation_id:req.organisation_id,
        user_id : newEmployee.id, 
        action : `requested employee id  '${employee.id}' details in organisation id '${req.organisation_id}'`,
        timestamp: new Date()
    })
    return res.json(employee);
  } catch (error) {
    console.error('Get Employee by Id error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone } = req.body;

    const employee = await Employees.findOne({
      where: { id, organisation_id: req.organisation_id }
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.update({
      first_name: first_name || employee.first_name,
      last_name: last_name || employee.last_name,
      email: email || employee.email,
      phone: phone || employee.phone,
    });
    await Logs.create({
        organisation_id:req.organisation_id,
        user_id : employee.id, 
        action : `updated employee id  '${employee.id}' details in organisation id '${req.organisation_id}'`,
        timestamp: new Date()
    })
    return res.json(employee);
  } catch (error) {
    console.error('Update Employee error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findOne({
      where: { id, organisation_id: req.organisation_id }
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await Logs.create({
        organisation_id:req.organisation_id,
        user_id : employee.id, 
        action : `deleted employee id  '${employee.id}' details in organisation id '${req.organisation_id}'`,
        timestamp: new Date()
    })
    await employee.destroy();
    return res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error('Delete Employee error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

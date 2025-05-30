import { Router } from 'express';
import EmployeeController from '../controllers/EmployeeController';
import EmployeeValidator from '../validators/EmployeeValidator';

const router = Router();

// Create a new employee
router.post('/', EmployeeValidator.validateCreate, EmployeeController.createEmployee);

// Get all employees
router.get('/', EmployeeController.getAllEmployees);

// Get a specific employee by ID
router.get('/:id', EmployeeController.getEmployeeById);

// Update an employee by ID
router.put('/:id', EmployeeValidator.validateUpdate, EmployeeController.updateEmployee);

// Delete an employee by ID
router.delete('/:id', EmployeeController.deleteEmployee);

export default router;
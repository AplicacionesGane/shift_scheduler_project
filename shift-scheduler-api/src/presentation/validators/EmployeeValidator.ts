import { body, validationResult } from 'express-validator';

const EmployeeValidator = {
    createEmployee: [
        body('name')
            .isString()
            .withMessage('Name must be a string')
            .notEmpty()
            .withMessage('Name is required'),
        body('role')
            .isString()
            .withMessage('Role must be a string')
            .notEmpty()
            .withMessage('Role is required'),
        body('storeId')
            .isInt()
            .withMessage('Store ID must be an integer')
            .notEmpty()
            .withMessage('Store ID is required'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],
    updateEmployee: [
        body('name')
            .optional()
            .isString()
            .withMessage('Name must be a string'),
        body('role')
            .optional()
            .isString()
            .withMessage('Role must be a string'),
        body('storeId')
            .optional()
            .isInt()
            .withMessage('Store ID must be an integer'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ]
};

export default EmployeeValidator;
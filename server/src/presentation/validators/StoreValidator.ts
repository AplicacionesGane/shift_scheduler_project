import { body } from 'express-validator';

const StoreValidator = {
    createStore: [
        body('name')
            .isString()
            .withMessage('Name must be a string')
            .notEmpty()
            .withMessage('Name is required'),
        body('location')
            .isString()
            .withMessage('Location must be a string')
            .notEmpty()
            .withMessage('Location is required'),
    ],
    updateStore: [
        body('name')
            .optional()
            .isString()
            .withMessage('Name must be a string'),
        body('location')
            .optional()
            .isString()
            .withMessage('Location must be a string'),
    ],
};

export default StoreValidator;
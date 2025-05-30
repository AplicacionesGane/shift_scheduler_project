import { body } from 'express-validator';

const WorkScheduleValidator = {
    create: [
        body('employeeId')
            .notEmpty()
            .withMessage('Employee ID is required')
            .isInt()
            .withMessage('Employee ID must be an integer'),
        body('shiftId')
            .notEmpty()
            .withMessage('Shift ID is required')
            .isInt()
            .withMessage('Shift ID must be an integer'),
    ],
    update: [
        body('employeeId')
            .optional()
            .isInt()
            .withMessage('Employee ID must be an integer'),
        body('shiftId')
            .optional()
            .isInt()
            .withMessage('Shift ID must be an integer'),
    ],
};

export default WorkScheduleValidator;
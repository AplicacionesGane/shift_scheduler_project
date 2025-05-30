import { body, validationResult } from 'express-validator';

const ShiftValidator = {
    createShift: [
        body('startTime')
            .isISO8601()
            .withMessage('Start time must be a valid ISO 8601 date string'),
        body('endTime')
            .isISO8601()
            .withMessage('End time must be a valid ISO 8601 date string')
            .custom((value, { req }) => {
                if (new Date(value) <= new Date(req.body.startTime)) {
                    throw new Error('End time must be after start time');
                }
                return true;
            }),
        body('storeId')
            .isInt()
            .withMessage('Store ID must be an integer'),
    ],

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
};

export default ShiftValidator;
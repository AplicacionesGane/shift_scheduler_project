import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware for validating Employee data
export const validateEmployee = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('role').isString().notEmpty().withMessage('Role is required'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware for validating Shift data
export const validateShift = [
    body('startTime').isISO8601().withMessage('Start time must be a valid ISO 8601 date'),
    body('endTime').isISO8601().withMessage('End time must be a valid ISO 8601 date'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware for validating WorkSchedule data
export const validateWorkSchedule = [
    body('employeeId').isString().notEmpty().withMessage('Employee ID is required'),
    body('shiftId').isString().notEmpty().withMessage('Shift ID is required'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware for validating Store data
export const validateStore = [
    body('name').isString().notEmpty().withMessage('Store name is required'),
    body('location').isString().notEmpty().withMessage('Location is required'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
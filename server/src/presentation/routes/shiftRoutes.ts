import { Router } from 'express';
import ShiftController from '../controllers/ShiftController';

const router = Router();

// Define routes for shift operations
router.post('/', ShiftController.createShift);
router.get('/', ShiftController.getAllShifts);
router.get('/:id', ShiftController.getShiftById);
router.put('/:id', ShiftController.updateShift);
router.delete('/:id', ShiftController.deleteShift);

export default router;
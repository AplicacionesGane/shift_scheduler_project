import { Router } from 'express';
import WorkScheduleController from '../controllers/WorkScheduleController';

const router = Router();

// Define routes for work schedule operations
router.post('/', WorkScheduleController.create);
router.get('/:id', WorkScheduleController.getById);
router.put('/:id', WorkScheduleController.update);
router.delete('/:id', WorkScheduleController.delete);
router.get('/', WorkScheduleController.getAll);

export default router;
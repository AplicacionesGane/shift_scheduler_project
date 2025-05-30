import { Router } from 'express';
import employeeRoutes from './employeeRoutes';
import shiftRoutes from './shiftRoutes';
import workScheduleRoutes from './workScheduleRoutes';
import storeRoutes from './storeRoutes';

const router = Router();

router.use('/employees', employeeRoutes);
router.use('/shifts', shiftRoutes);
router.use('/work-schedules', workScheduleRoutes);
router.use('/stores', storeRoutes);

export default router;
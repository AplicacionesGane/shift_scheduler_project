import { MysqlShiftRepository } from '@infrastructure/persistence/repositories/MysqlShiftRepository';
import { MysqlStoreRepository } from '@/infrastructure/persistence/repositories/MysqlStoreRepository';

import { ShiftController } from '@presentation/controllers/shift.controller';
import { ShiftUseCases } from '@application/shifts/shift.usecases';
import { Router } from 'express';

const routerShift = Router();

/**
 * Inicial el repository
 */
const repository = new MysqlShiftRepository();
const storeRepository = new MysqlStoreRepository();

/**
 * iniciamos casos de uso
 */
const usecases = new ShiftUseCases(repository, storeRepository);

/**
 * iniciamos los controladores
 */
const controllers = new ShiftController(usecases);

/**
 * Definir rutas
 */

routerShift.post('/shifts', controllers.createShift);
routerShift.get('/shifts', controllers.getAllShifts);
routerShift.get('/shifts/:id', controllers.getShiftById);

export { routerShift };

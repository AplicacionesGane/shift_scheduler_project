import { MysqlShiftRepository } from '@infrastructure/persistence/repositories/MysqlShiftRepository';
import { ShiftController } from '@presentation/controllers/shift.controller';
import { ShiftUseCases } from '@application/shifts/shift.usecases';
import { Router } from 'express';

const routerShift = Router();

/**
 * Inicial el repository
 */
const repository = new MysqlShiftRepository();

/**
 * iniciamos casos de uso
 */
const usecases = new ShiftUseCases(repository);

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

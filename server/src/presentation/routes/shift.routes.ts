import { MysqlShiftRepository } from '@/infrastructure/repositories/mysql/MysqlShiftRepository';

import { ShiftController } from '@presentation/controllers/shift.controller';
import { ShiftUseCases } from '@application/shifts/shift.usecases';
import { Router } from 'express';

const routerShift = Router();

/**
 * * Inicial el repository de shifts
 * * Este repository es el encargado de interactuar con la base de datos
 * * para realizar las operaciones CRUD de los turnos.
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

routerShift.post('/shifts', controllers.registerCtrl);
routerShift.put('/shifts', controllers.updateCtrl);
routerShift.get('/shifts', controllers.getAllCtrl);
routerShift.get('/shifts/:id', controllers.getOneCtrl);
routerShift.delete('/shifts/:id', controllers.deleteCtrl);

export { routerShift };

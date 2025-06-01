import { MysqlWorkScheduleRepository } from '@infrastructure/persistence/repositories/MysqlWorkScheduleRepository';
import { MysqlEmployeeRepository } from '@infrastructure/persistence/repositories/MysqlEmployeeRepository';
import { MysqlShiftRepository } from '@infrastructure/persistence/repositories/MysqlShiftRepository';
import { MysqlStoreRepository } from '@infrastructure/persistence/repositories/MysqlStoreRepository';
import { WorkScheduleController } from '@presentation/controllers/workschedule.controller';
import { WorkScheduleUseCases } from '@application/workschedule/workschedule.usecases';
import { Router } from 'express';

const routerWorkSchedule = Router();

/**
 * Iniciar los repositories
 */
const workScheduleRepository = new MysqlWorkScheduleRepository();
const employeeRepository = new MysqlEmployeeRepository();
const shiftRepository = new MysqlShiftRepository();
const storeRepository = new MysqlStoreRepository();

/**
 * Iniciar los usecases
 */

const usecases = new WorkScheduleUseCases(
    workScheduleRepository,
    employeeRepository,
    shiftRepository,
    storeRepository
);

// Iniciar los controllers
const controllers = new WorkScheduleController(usecases);



routerWorkSchedule.post('/work-schedules', controllers.createWorkSchedule);
routerWorkSchedule.get('/work-schedules', controllers.getAllWorkSchedules);
routerWorkSchedule.get('/work-schedules/:storeId/:year/:month', controllers.findByStoreIdWhitMonthAndYear);
routerWorkSchedule.get('/work-schedules/:document/:date', controllers.getWorkScheduleByDocumentAndDate);

export { routerWorkSchedule };

import { MysqlWorkScheduleRepository } from '@/infrastructure/repositories/mysql/MysqlWorkScheduleRepository';
import { MysqlEmployeeRepository } from '@/infrastructure/repositories/mysql/MysqlEmployeeRepository';
import { MysqlShiftRepository } from '@/infrastructure/repositories/mysql/MysqlShiftRepository';
import { MysqlStoreRepository } from '@/infrastructure/repositories/mysql/MysqlStoreRepository';
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

routerWorkSchedule.post('/work-schedules', controllers.createWorkScheduleCtrl);
routerWorkSchedule.get('/work-schedules', controllers.getAllWorkSchedulesCtrl);
routerWorkSchedule.get('/work-schedules/:storeId/:year/:month', controllers.findByStoreIdWhitMonthAndYearCtrl);
routerWorkSchedule.get('/work-schedules/:document/:date', controllers.getWorkScheduleByDocumentAndDateCtrl);

export { routerWorkSchedule };

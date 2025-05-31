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

routerWorkSchedule.get('/work-schedules/:storeId', controllers.getWorkSchedulesByStoreId);

/*
// Obtener asignación por ID
routerWorkSchedule.get('/work-schedules/:id', controllers.getWorkScheduleById);

// Obtener asignaciones por empleado
routerWorkSchedule.get('/work-schedules/employee/:employeeDocument', controllers.getWorkSchedulesByEmployee);

// Obtener asignaciones por tienda
routerWorkSchedule.get('/work-schedules/store/:storeId', controllers.getWorkSchedulesByStore);

// Obtener asignaciones por fecha
routerWorkSchedule.get('/work-schedules/date/:date', controllers.getWorkSchedulesByDate);

// Obtener horario semanal de un empleado
routerWorkSchedule.get('/work-schedules/weekly/:employeeDocument/:startDate', controllers.getWeeklySchedule);

// Actualizar estado de una asignación
routerWorkSchedule.patch('/work-schedules/:id/status', controllers.updateWorkScheduleStatus);

// Cambiar turno de una asignación
routerWorkSchedule.patch('/work-schedules/:id/shift', controllers.changeWorkScheduleShift);

// Eliminar asignación
routerWorkSchedule.delete('/work-schedules/:id', controllers.deleteWorkSchedule);
*/
export { routerWorkSchedule };

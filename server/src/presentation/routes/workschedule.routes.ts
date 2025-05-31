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
 * Iniciamos casos de uso
 */
const usecases = new WorkScheduleUseCases(
    workScheduleRepository,
    employeeRepository,
    shiftRepository,
    storeRepository
);

/**
 * Iniciamos los controladores
 */
const controllers = new WorkScheduleController(usecases);

/**
 * Definir rutas para Work Schedules
 */

// Crear nueva asignación de turno
routerWorkSchedule.post('/work-schedules', controllers.createWorkSchedule);

// Obtener todas las asignaciones
routerWorkSchedule.get('/work-schedules', controllers.getAllWorkSchedules);

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

export { routerWorkSchedule };

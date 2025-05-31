import { MysqlEmployeeRepository } from '@infrastructure/persistence/repositories/MysqlEmployeeRepository';
import { EmployeeController } from '@presentation/controllers/employee.controller';
import { EmployeeUseCases } from '@application/employee/employe.usecases';
import { Router } from 'express';

const routerEmploye = Router();

/**
 * Inicial el repository
 */

const repository = new MysqlEmployeeRepository();

/**
 * iniciamos casos de uso
 */

const usecases = new EmployeeUseCases(repository);

/**
 * iniciamos los controladores
 */

const controllers = new EmployeeController(usecases);

/**
 * Definir rutas
 */

routerEmploye.get('/employees', controllers.getAllEmployees)
routerEmploye.get('/employees/:documento', controllers.getEmployeeById)

export { routerEmploye }
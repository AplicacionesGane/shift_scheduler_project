import { MockEmployeeRepository, MockStoreRepository } from '@infrastructure/persistence/repositories/MocksRepository'
import { MocksController } from '@presentation/controllers/mocks.controller';
import { EmployeeUseCases } from '@application/employee/employe.usecases';
import { StoreUseCases } from '@/application/store/store.usecases';
import { Router } from 'express';

const routerMocks = Router();

/**
 * Inicial el repository
 */

const employeeRepository = new MockEmployeeRepository();
const storeRepository = new MockStoreRepository();

/**
 * iniciamos casos de uso
 */

const employeeUseCases = new EmployeeUseCases(employeeRepository);
const storeUseCases = new StoreUseCases(storeRepository);

/**
 * iniciamos los controladores
 */
const employeeController = new MocksController(employeeUseCases, storeUseCases);
const storeController = new MocksController(employeeUseCases, storeUseCases);


/**
 * Definir rutas
 */

routerMocks.get('/mocks/employees', employeeController.getAllEmployees);
routerMocks.get('/mocks/stores', storeController.getAllStores);

export { routerMocks };
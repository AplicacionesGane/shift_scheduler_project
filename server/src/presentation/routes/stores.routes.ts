import { MysqlStoreRepository } from '@/infrastructure/repositories/mysql/MysqlStoreRepository';
import { StoreController } from '@presentation/controllers/store.controller';
import { StoreUseCases } from '@application/store/store.usecases';
import { Router } from 'express';

const routerStores = Router();

/**
 * Inicial el repository
 */

const repository = new MysqlStoreRepository();

/**
 * iniciamos casos de uso
 */

const usecases = new StoreUseCases(repository);

/**
 * iniciamos los controladores
 */

const controllers = new StoreController(usecases);

/**
 * Definir rutas
 */

routerStores.get('/stores', controllers.getAllStoresCtrl);
routerStores.get('/stores/:id', controllers.getStoreByIdCtrl);
routerStores.get('/stores/company/:company', controllers.getStoresByCompanyCtrl);

export { routerStores }
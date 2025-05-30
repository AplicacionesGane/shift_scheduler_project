import { Router } from 'express';
import StoreController from '../controllers/StoreController';

const router = Router();

// Define routes for store operations
router.post('/', StoreController.createStore);
router.get('/', StoreController.getAllStores);
router.get('/:id', StoreController.getStoreById);
router.put('/:id', StoreController.updateStore);
router.delete('/:id', StoreController.deleteStore);

export default router;
import { StoreUseCases } from '@application/store/store.usecases';
import { Request, Response } from 'express';

export class StoreController {
    constructor(private readonly storeUseCases: StoreUseCases) {}
    
    public getAllStores = async (req: Request, res: Response) => {
        try {
            const stores = await this.storeUseCases.findAllStores();
            res.status(200).json(stores);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error on server to find all stores' });
        }
    }

    public getStoreById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const store = await this.storeUseCases.findStoreById(id);
            if (!store) {
                res.status(404).json({ message: 'Store not found' });
                return;
            }
            res.status(200).json(store);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error on server to find store by id' });
        }
    }

}
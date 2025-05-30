import { StoreUseCases } from '@application/store/store.usecases';
import { Request, Response } from 'express';

export class StoreController {
    constructor(private readonly storeUseCases: StoreUseCases) {}
    
    public getAllStores = async (req: Request, res: Response) => {
        try {
            const stores = await this.storeUseCases.findAll();
            res.status(200).json(stores);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error on server to find all stores' });
        }
    }

}
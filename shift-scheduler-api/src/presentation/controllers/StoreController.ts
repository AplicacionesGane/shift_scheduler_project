import { Request, Response } from 'express';
import { StoreRepository } from '../../domain/repositories/StoreRepository';
import { StoreDto } from '../dtos/StoreDto';

export class StoreController {
    constructor(private storeRepository: StoreRepository) {}

    async createStore(req: Request, res: Response): Promise<Response> {
        const storeData: StoreDto = req.body;
        try {
            const newStore = await this.storeRepository.create(storeData);
            return res.status(201).json(newStore);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating store', error });
        }
    }

    async getStores(req: Request, res: Response): Promise<Response> {
        try {
            const stores = await this.storeRepository.findAll();
            return res.status(200).json(stores);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving stores', error });
        }
    }

    async getStoreById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const store = await this.storeRepository.findById(id);
            if (!store) {
                return res.status(404).json({ message: 'Store not found' });
            }
            return res.status(200).json(store);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving store', error });
        }
    }

    async updateStore(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const storeData: StoreDto = req.body;
        try {
            const updatedStore = await this.storeRepository.update(id, storeData);
            if (!updatedStore) {
                return res.status(404).json({ message: 'Store not found' });
            }
            return res.status(200).json(updatedStore);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating store', error });
        }
    }

    async deleteStore(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deleted = await this.storeRepository.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Store not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting store', error });
        }
    }
}
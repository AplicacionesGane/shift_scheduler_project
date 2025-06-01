import { StoreUseCases } from '@application/store/store.usecases';
import { Request, Response } from 'express';

export class StoreController {
  constructor(private readonly storeUseCases: StoreUseCases) { }

  getAllStoresCtrl = async (req: Request, res: Response) => {
    try {
      const stores = await this.storeUseCases.allStores();
      res.status(200).json(stores);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error on server to find all stores' });
    }
  }

  getStoreByIdCtrl = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || id.trim() === '') {
      res.status(400).json({ message: 'Store ID is required' });
      return;
    }

    try {
      const store = await this.storeUseCases.storeById(id);
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

  getStoresByCompanyCtrl = async (req: Request, res: Response) => {
    const { company } = req.params;

    if (!company || company.trim() === '') {
      res.status(400).json({ message: 'Company name is required' });
      return;
    }

    try {
      const stores = await this.storeUseCases.storesByCompany(company);
      if (!stores || stores.length === 0) {
        res.status(404).json({ message: 'No stores found for this company' });
        return;
      }
      res.status(200).json(stores);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error on server to find stores by company' });
    }
  }

}
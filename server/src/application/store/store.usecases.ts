import { StoreRepository } from '@domain/repositories/store.repository';
import { StoreEntity } from '@domain/entities/store.entity';

export class StoreUseCases {
  constructor(private readonly storeRepo: StoreRepository) { }

  allStores = async (): Promise<StoreEntity[] | []> => {
    const stores = await this.storeRepo.findAllStores();
    return stores;
  }

  storeById = async (id: string): Promise<StoreEntity | null> => {
    const store = await this.storeRepo.findStoreById(id);
    return store;
  }

  storesByCompany = async (company: string): Promise<StoreEntity[] | []> => {
    const stores = await this.storeRepo.findStoresByCompany(company);
    return stores;
  }
}

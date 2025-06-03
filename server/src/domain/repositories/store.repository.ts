import { StoreEntity } from '@domain/entities/store.entity'

export interface StoreRepository {
    findAllStores(): Promise<StoreEntity[] | []>;
    findStoreById(id: string): Promise<StoreEntity | null>;
    findStoresByCompany(company: string): Promise<StoreEntity[] | []>;
}
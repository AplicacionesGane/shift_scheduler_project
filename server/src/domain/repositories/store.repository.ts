import { StoreEntity } from '@domain/entities/store.entity'

export interface StoreRepository {
    findAll(): Promise<StoreEntity[] | null>;
    findById(id: string): Promise<StoreEntity | null>;
}
import { StoreRepository } from '@domain/repositories/store.repository';
import { StoreEntity } from '@domain/entities/store.entity';

export class StoreUseCases {
    constructor(private readonly storeRepo: StoreRepository) {}

    async findAll(): Promise<StoreEntity[] | null> {
        return this.storeRepo.findAll();
    }

    async findById(id: string): Promise<StoreEntity | null> {
        return this.storeRepo.findById(id);
    }
}

import { Store } from '../../domain/entities/Store';
import { StoreRepository } from '../../domain/repositories/StoreRepository';
import { StoreModel } from '../models/StoreModel';

export class SequelizeStoreRepository implements StoreRepository {
    async create(store: Store): Promise<Store> {
        const storeModel = await StoreModel.create(store);
        return storeModel.toJSON() as Store;
    }

    async findById(id: string): Promise<Store | null> {
        const storeModel = await StoreModel.findByPk(id);
        return storeModel ? (storeModel.toJSON() as Store) : null;
    }

    async update(store: Store): Promise<Store | null> {
        const [updatedCount, [updatedStore]] = await StoreModel.update(store, {
            where: { id: store.id },
            returning: true,
        });
        return updatedCount > 0 ? (updatedStore.toJSON() as Store) : null;
    }

    async delete(id: string): Promise<boolean> {
        const deletedCount = await StoreModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async findAll(): Promise<Store[]> {
        const storeModels = await StoreModel.findAll();
        return storeModels.map(storeModel => storeModel.toJSON() as Store);
    }
}
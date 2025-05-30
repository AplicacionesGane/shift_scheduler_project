import { Store } from '../entities/Store';

export interface StoreRepository {
    create(store: Store): Promise<Store>;
    findById(id: number): Promise<Store | null>;
    update(store: Store): Promise<Store>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Store[]>;
}
import { Shift } from '../entities/Shift';

export interface ShiftRepository {
    create(shift: Shift): Promise<Shift>;
    findById(id: number): Promise<Shift | null>;
    update(shift: Shift): Promise<Shift>;
    delete(id: number): Promise<void>;
    findAll(): Promise<Shift[]>;
}
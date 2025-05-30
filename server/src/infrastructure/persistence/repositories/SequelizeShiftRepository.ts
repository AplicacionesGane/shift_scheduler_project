import { Shift } from '../../domain/entities/Shift';
import { ShiftRepository } from '../../domain/repositories/ShiftRepository';
import { ShiftModel } from '../models/ShiftModel';

export class SequelizeShiftRepository implements ShiftRepository {
    async create(shift: Shift): Promise<Shift> {
        const shiftModel = await ShiftModel.create(shift);
        return shiftModel.toJSON() as Shift;
    }

    async findById(id: number): Promise<Shift | null> {
        const shiftModel = await ShiftModel.findByPk(id);
        return shiftModel ? (shiftModel.toJSON() as Shift) : null;
    }

    async update(id: number, shift: Shift): Promise<Shift | null> {
        const [updatedCount, [updatedShift]] = await ShiftModel.update(shift, {
            where: { id },
            returning: true,
        });
        return updatedCount > 0 ? updatedShift.toJSON() as Shift : null;
    }

    async delete(id: number): Promise<boolean> {
        const deletedCount = await ShiftModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async findAll(): Promise<Shift[]> {
        const shiftModels = await ShiftModel.findAll();
        return shiftModels.map(shiftModel => shiftModel.toJSON() as Shift);
    }
}
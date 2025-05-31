import { ShiftModel } from '@infrastructure/persistence/models/shitf.model';
import { ShiftValue } from '@domain/valueObjects/shift.value'
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { Shift } from '@domain/entities/shift.entity';

export class MysqlShiftRepository implements ShiftRepository {

    create = async (shift: Omit<Shift, "id" | "createdAt" | "updatedAt">): Promise<Shift> => {
        try {
            const newShift = new ShiftValue(shift);

            await ShiftModel.sync();
            
            const createdShift = await ShiftModel.create(newShift);
            return createdShift;
        } catch (error) {
            console.error('Error creating shift:', error);
            throw new Error('Error creating shift');
        }
    }

    findById = async (id: string): Promise<Shift | null> => {
        try {
            const shift = await ShiftModel.findByPk(id);
            return shift;
        } catch (error) {
            console.error('Error finding shift by ID:', error);
            throw new Error('Error finding shift by ID');
        }
    }

    findAll = async (): Promise<Shift[] | null> => {
        try {
            await ShiftModel.sync();
            return ShiftModel.findAll();
        } catch (error) {
            console.error('Error finding all shifts:', error);
            throw new Error('Error finding all shifts');
        }
    }
}

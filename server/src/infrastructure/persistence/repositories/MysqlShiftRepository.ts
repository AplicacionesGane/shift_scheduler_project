import { ShiftModel } from '@infrastructure/persistence/models/shitf.model';
import { ShiftValue } from '@domain/valueObjects/shift.value'
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { Shift } from '@domain/entities/shift.entity';

export class MysqlShiftRepository implements ShiftRepository {

    create = async (shift: Shift): Promise<Shift> => {
        try {
            await ShiftModel.sync();
            
            // El shift ya viene como ShiftValue del UseCase, solo extraemos los datos
            const shiftData = {
                id: shift.id,
                startTime: shift.startTime,
                endTime: shift.endTime,
                idStore: shift.idStore,
                date: shift.date,
                createdAt: shift.createdAt,
                updatedAt: shift.updatedAt
            };
            
            const createdShift = await ShiftModel.create(shiftData);
            
            // Convertir el resultado de Sequelize a ShiftValue
            return new ShiftValue({
                startTime: createdShift.startTime,
                endTime: createdShift.endTime,
                idStore: createdShift.idStore,
                date: createdShift.date
            });
            
        } catch (error) {
            console.error('Error creating shift:', error);
            throw new Error('Error creating shift');
        }
    }

    findById = async (id: string): Promise<Shift | null> => {
        try {
            const shift = await ShiftModel.findByPk(id);
            if (!shift) return null;
            
            // Convertir el modelo de Sequelize a ShiftValue
            return new ShiftValue({
                startTime: shift.startTime,
                endTime: shift.endTime,
                idStore: shift.idStore,
                date: shift.date
            });
        } catch (error) {
            console.error('Error finding shift by ID:', error);
            throw new Error('Error finding shift by ID');
        }
    }

    findAll = async (): Promise<Shift[]> => {
        try {
            await ShiftModel.sync();
            const shifts = await ShiftModel.findAll();
            
            // Convertir cada modelo a ShiftValue
            return shifts.map(shift => new ShiftValue({
                startTime: shift.startTime,
                endTime: shift.endTime,
                idStore: shift.idStore,
                date: shift.date
            }));
        } catch (error) {
            console.error('Error finding all shifts:', error);
            throw new Error('Error finding all shifts');
        }
    }
}
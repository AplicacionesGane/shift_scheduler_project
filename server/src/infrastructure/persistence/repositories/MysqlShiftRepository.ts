import { ShiftModel } from '@infrastructure/persistence/models/shitf.model';
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { ShiftValue } from '@domain/valueObjects/shift.value';
import { Shift } from '@domain/entities/shift.entity';

export class MysqlShiftRepository implements ShiftRepository {

  save = async (shift: Shift): Promise<Shift> => {
    try {
      await ShiftModel.sync();

      const createdShift = await ShiftModel.create(shift);

      // Convertir el resultado de Sequelize a ShiftValue
      return new ShiftValue({
        startTime: createdShift.startTime,
        endTime: createdShift.endTime,
        nameTurno: createdShift.nameTurno,
        description: createdShift.description
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
        nameTurno: shift.nameTurno,
        description: shift.description,
        endTime: shift.endTime
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
        nameTurno: shift.nameTurno,
        description: shift.description
      }));
    } catch (error) {
      console.error('Error finding all shifts:', error);
      throw new Error('Error finding all shifts');
    }
  }
}
import { ShiftModel } from '@infrastructure/persistence/models/shitf.model';
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { Shift } from '@domain/entities/shift.entity';

/**
 * * Repositorio de turnos para MySQL
 * * Capa de infraestructura que implementa la interfaz ShiftRepository
 * * para interactuar con la base de datos MySQL.
 */
export class MysqlShiftRepository implements ShiftRepository {
  saveShift = async (shift: Shift): Promise<Shift> => {
    try {
      await ShiftModel.sync(); // Asegurarse de que la tabla esté sincronizada
      const shiftModel = await ShiftModel.create(shift);
      return shiftModel
    } catch (error) {
      console.error('Error saving shift:', error);
      throw new Error('Error saving shift');
    }
  }

  findShiftById = async (id: string): Promise<Shift | null> => {
    try {
      await ShiftModel.sync(); // Asegurarse de que la tabla esté sincronizada
      const shiftModel = await ShiftModel.findByPk(id);
      if (!shiftModel) return null;
      return shiftModel
    } catch (error) {
      console.error('Error finding shift by ID:', error);
      return null;
    }
  }

  findShiftAll = async (): Promise<Shift[] | []> => {
    try {
      await ShiftModel.sync(); // Asegurarse de que la tabla esté sincronizada
      const shifts = await ShiftModel.findAll();
      if (!shifts || shifts.length === 0) return [];
      return shifts
    } catch (error) {
      console.error('Error finding all shifts:', error);
      return [];

    }
  }

  updateShift = async (shift: Shift): Promise<Shift> =>{
    try {
      const shiftModel = await ShiftModel.findByPk(shift.id);

      if (!shiftModel) {
        throw new Error('Shift not found');
      }

      const updateShift = await shiftModel.update({
        startTime: shift.startTime,
        endTime: shift.endTime,
        nameTurno: shift.nameTurno,
        description: shift.description
      });

      return updateShift;
    } catch (error) {
      console.error('Error updating shift:', error);
      throw new Error('Error updating shift');
    }
  }

  deleteShift = async (id: string): Promise<void> => {
    try {
      const shiftModel = await ShiftModel.findByPk(id);

      if (!shiftModel) {
        throw new Error('Shift not found');
      }
      
      await shiftModel.destroy();
    } catch (error) {
      console.error('Error deleting shift:', error);
      throw new Error('Error deleting shift');
    }
  }

}
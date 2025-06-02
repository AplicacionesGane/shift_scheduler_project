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
      const shifts = await ShiftModel.findAll({ order: [['nameTurno', 'ASC']] });
      if (!shifts || shifts.length === 0) return [];
      return shifts
    } catch (error) {
      console.error('Error finding all shifts:', error);
      return [];

    }
  }

  updateShift = async (shift: Shift): Promise<Shift> =>{
    try {

      const updateShift = await ShiftModel.update(shift, {
        where: { id: shift.id }
      });

      if (!updateShift) {
        throw new Error('Shift not found');
      }

      // Si se actualizó correctamente, buscamos el shift actualizado
      const updatedShift = await ShiftModel.findByPk(shift.id);

      if (!updatedShift) {
        throw new Error('Shift not found after update');
      }

      return updatedShift;
    } catch (error) {
      console.error('Error updating shift:', error);
      throw new Error('Error updating shift');
    }
  }

  deleteShift = async (id: string): Promise<void> => {
    try {
      await ShiftModel.destroy({ where: { id } });
    } catch (error) {
      console.error('Error deleting shift:', error);
      throw new Error('Error deleting shift');
    }
  }

}
import { ShiftValue, type ShiftDTO } from '@/domain/valueObjects/shift.value';
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { Shift } from '@domain/entities/shift.entity';

export class ShiftUseCases {
  constructor(private readonly shiftRepo: ShiftRepository) {}

  createShift = async (newData: ShiftDTO): Promise<Shift> => {
    const shiftValue = new ShiftValue(newData);
    const shiftCreated = await this.shiftRepo.saveShift(shiftValue);
    return shiftCreated;
  }

  getShiftById = async (id: string): Promise<Shift | null> => {
    return this.shiftRepo.findShiftById(id);
  }

  getAllShifts = async (): Promise<Shift[] | null> => {
    return this.shiftRepo.findShiftAll();
  }

  updateShift = async (shiftData: Shift): Promise<Shift> => {
    const updatedShift = await this.shiftRepo.updateShift(shiftData);
    return updatedShift;
  }

  deleteShift = async (id: string): Promise<void> => {
    await this.shiftRepo.deleteShift(id);
  }
}
import { ShiftValue, type ShiftDTO } from '@/domain/valueObjects/shift.value';
import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { Shift } from '@domain/entities/shift.entity';

export class ShiftUseCases {
  constructor(
    private readonly shiftRepo: ShiftRepository,
    private readonly worksScheduleRepo: WorkScheduleRepository
  ) {}

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
    // 1. Validar que el turno existe
    const shift = await this.shiftRepo.findShiftById(id);
    if (!shift) throw new Error(`Shift with id ${id} does not exist.`);

    // 2. Validar que el turno no esté asignado en un worksSchedule
    const existsInWorksSchedule = await this.worksScheduleRepo.findWorkScheduleByshiftId(id);
    if (existsInWorksSchedule) {
      throw new Error(`Shift with id ${id} is assigned to a work schedule and cannot be deleted.`);
    }
    // 3. Eliminar el turno
    await this.shiftRepo.deleteShift(id);
  }
}
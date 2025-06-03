import { Shift } from '@domain/entities/shift.entity'

export interface ShiftRepository {
  saveShift(shift: Shift): Promise<Shift>;
  findShiftById(id: string): Promise<Shift | null>;
  findShiftAll(): Promise<Shift[] | []>;
  updateShift(shift: Shift): Promise<Shift>;
  deleteShift(id: string): Promise<void>;
}

import { Shift } from '@domain/entities/shift.entity'

export interface ShiftRepository {
  create(shift: Shift): Promise<Shift>;
  findById(id: string): Promise<Shift | null>;
  // findAll(): Promise<Shift[]>;
  // update(id: string, shift: Partial<Shift>): Promise<Shift | null>;
  // delete(id: string): Promise<boolean>;
}

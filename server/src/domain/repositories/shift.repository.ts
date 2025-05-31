import { Shift } from '@domain/entities/shift.entity'

export interface ShiftRepository {
  save(shift: Shift): Promise<Shift>;
  findById(id: string): Promise<Shift | null>;
  findAll(): Promise<Shift[] | null>;
}

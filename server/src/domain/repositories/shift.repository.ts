import { Shift } from '@domain/entities/shift.entity'

export interface ShiftRepository {
  create(shift: Shift): Promise<Shift>;  // Cambié de 'save' a 'create'
  findById(id: string): Promise<Shift | null>;
  findAll(): Promise<Shift[]>;  // Removí el '| null'
}
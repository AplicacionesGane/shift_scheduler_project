import { WorkSchedule } from '@domain/entities/workschedule.entity';

export interface WorkScheduleRepository {
  save(workSchedule: WorkSchedule): Promise<WorkSchedule>;
  findAll(): Promise<WorkSchedule[] | []>;
  findByDocumentAndDate(document: string, year: number, month: number, day: number): Promise<boolean | null>;
  findWorkScheduleByshiftId(idShift: string): Promise<boolean>;
  findByStoreYearMonth(idStore: string, year: number, month: number): Promise<WorkSchedule[] | []>;
}

import { WorkSchedule } from '@domain/entities/workschedule.entity';

export interface WorkScheduleRepository {
  save(workSchedule: WorkSchedule): Promise<WorkSchedule>;
  findByStoreId(id: string): Promise<WorkSchedule[] | null>;
  findAll(): Promise<WorkSchedule[] | null>;
  findByDocumentAndDate(document: string, date: string): Promise<boolean | null>;
}

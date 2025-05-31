import { WorkSchedule } from '@domain/entities/workschedule.entity';

export interface WorkScheduleRepository {
  createNewWorkSchedule(workSchedule: WorkSchedule): Promise<WorkSchedule>;
  findSchedulesByStoreId(id: string): Promise<WorkSchedule[] | null>;
  findAllWorksSchedules(): Promise<WorkSchedule[] | null>;
  findScheduleByDocumentAndDate (document: string, dateAsing: string) :Promise<WorkSchedule | null>
}

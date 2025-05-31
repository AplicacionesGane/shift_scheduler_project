import { WorkSchedule } from '@domain/entities/workschedule.entity';

export interface WorkScheduleRepository {
  create(workSchedule: WorkSchedule): Promise<WorkSchedule>;
  findById(id: string): Promise<WorkSchedule | null>;
  findAll(): Promise<WorkSchedule[] | null>;
  update(id: string, workSchedule: Partial<WorkSchedule>): Promise<WorkSchedule | null>;
  delete(id: string): Promise<boolean>;
}
import { WorkSchedule } from '../entities/WorkSchedule';

export interface WorkScheduleRepository {
    create(workSchedule: WorkSchedule): Promise<WorkSchedule>;
    findById(id: number): Promise<WorkSchedule | null>;
    update(workSchedule: WorkSchedule): Promise<WorkSchedule>;
    delete(id: number): Promise<void>;
    findAll(): Promise<WorkSchedule[]>;
}
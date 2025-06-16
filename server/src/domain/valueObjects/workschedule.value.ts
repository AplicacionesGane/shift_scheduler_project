import { WorkSchedule } from '@domain/entities/workschedule.entity';
import { v4 as uuidv4 } from 'uuid';

export class WorkScheduleValue implements WorkSchedule {
    id: string;
    employee: string; 
    shiftId: string; 
    storeId: string; 
    year: number;
    month: number;
    day: number;
    status: 'assigned' | 'completed' | 'absent';
    createdAt?: Date;
    updatedAt?: Date;

    constructor(workSchedule: WorkSchedule) {
        // validate year
        if (workSchedule.year < 1900 || workSchedule.year > 2100) {
            throw new Error('Invalid year to assign work schedule');
        }

        if (workSchedule.month < 1 || workSchedule.month > 12) {
            throw new Error('Invalid month to assign work schedule');
        }

        if (workSchedule.day < 1 || workSchedule.day > 31) {
            throw new Error('Invalid day to assign work schedule');
        }

        this.id = uuidv4();
        this.employee = workSchedule.employee;
        this.shiftId = workSchedule.shiftId;
        this.storeId = workSchedule.storeId;
        this.year = workSchedule.year;
        this.month = workSchedule.month;
        this.day = workSchedule.day;
        this.status = workSchedule.status;
    }
}

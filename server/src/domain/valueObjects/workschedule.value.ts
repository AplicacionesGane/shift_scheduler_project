import { ValidationService } from '@domain/services/ValidationServices';
import { WorkSchedule } from '@domain/entities/workschedule.entity';
import { v4 as uuidv4 } from 'uuid';

export interface WorkScheduleValueDTO {
    employee: string;
    shiftId: string;
    storeId: string;
    assignedDate: string;
    status: 'assigned' | 'completed' | 'absent';
}

export class WorkScheduleValue implements WorkSchedule {
    id: string;
    employee: string; 
    shiftId: string; 
    storeId: string; 
    assignedDate: string;
    status: 'assigned' | 'completed' | 'absent';
    createdAt: Date;
    updatedAt: Date;

    constructor(workSchedule: WorkScheduleValueDTO) {
        ValidationService.validateDateFormat(workSchedule.assignedDate);

        this.id = uuidv4();
        this.employee = workSchedule.employee;
        this.shiftId = workSchedule.shiftId;
        this.storeId = workSchedule.storeId;
        this.assignedDate = workSchedule.assignedDate;
        this.status = workSchedule.status;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

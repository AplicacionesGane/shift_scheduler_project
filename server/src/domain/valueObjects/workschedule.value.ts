import { ValidationService } from '@domain/services/ValidationServices';
import { WorkSchedule } from '@domain/entities/workschedule.entity';
import { v4 as uuidv4 } from 'uuid';

export class WorkScheduleValue implements WorkSchedule {
    id: string;
    employeeDocument: string; // FK a Employee
    shiftId: string;          // FK a Shift
    storeId: string;         // FK a Store
    assignedDate: string;    // YYYY-MM-DD
    status: 'assigned' | 'completed' | 'absent';
    createdAt: Date;
    updatedAt: Date;

    constructor(workSchedule: Omit<WorkSchedule, 'id' | 'createdAt' | 'updatedAt'>) {
        // Validaciones de formato y rango
        ValidationService.validateDateFormat(workSchedule.assignedDate);

        this.id = uuidv4();
        this.employeeDocument = workSchedule.employeeDocument;
        this.shiftId = workSchedule.shiftId;
        this.storeId = workSchedule.storeId;
        this.assignedDate = workSchedule.assignedDate;
        this.status = workSchedule.status;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}


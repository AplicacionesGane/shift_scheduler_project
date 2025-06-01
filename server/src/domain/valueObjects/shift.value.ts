import { ValidationService } from '@domain/services/ValidationServices';
import { Shift } from '@domain/entities/shift.entity';
import { v4 as uuidv4 } from 'uuid';

export interface ShiftDTO {
    startTime: string;
    endTime: string;  
    nameTurno: string;
    description?: string;
}

export class ShiftValue implements Shift {
    id: string;
    startTime: string;
    endTime: string;
    nameTurno: string;
    createdAt: Date;
    updatedAt: Date;
    description?: string | undefined;

    constructor(shift: ShiftDTO) {
        ValidationService.validateTimeRange(shift.startTime, shift.endTime);

        this.id = uuidv4();
        this.startTime = shift.startTime;
        this.endTime = shift.endTime;
        this.nameTurno = shift.nameTurno;
        this.description = shift.description; 
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
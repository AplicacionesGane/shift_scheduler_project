import { ValidationService } from '@domain/services/ValidationServices';
import { Shift } from '@domain/entities/shift.entity';
import { v4 as uuidv4 } from 'uuid';

export class ShiftValue implements Shift {
    id: string;
    startTime: string;
    endTime: string;
    nameTurno: string;
    date: string;
    createdAt: Date;
    updatedAt: Date;
    description?: string | undefined;

    constructor(shift: Omit<Shift, 'id' | 'createdAt' | 'updatedAt'>) {
        // Validaciones de formato y rango
        ValidationService.validateTimeRange(shift.startTime, shift.endTime);
        ValidationService.validateDateFormat(shift.date);

        this.id = uuidv4();
        this.startTime = shift.startTime;
        this.endTime = shift.endTime;
        this.nameTurno = shift.nameTurno;
        this.description = shift.description; 
        this.date = shift.date;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
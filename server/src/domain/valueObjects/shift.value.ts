import { Shift } from '@domain/entities/shift.entity'
import { v4 as uuidv4 } from 'uuid';

export class ShiftValue implements Shift {
    id: string;
    startTime: Date;
    idStore: string | null;
    endTime: Date;
    date: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(shift: Omit<Shift, 'id' | 'createdAt' | 'updatedAt'>) {
        this.id = uuidv4();
        this.startTime = shift.startTime;
        this.idStore = shift.idStore ?? null;
        this.endTime = shift.endTime;
        this.date = shift.date;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }   

}
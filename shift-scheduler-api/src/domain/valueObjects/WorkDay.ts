import { TimeSlot } from './TimeSlot';

export class WorkDay {
    date: Date;
    shifts: TimeSlot[];

    constructor(date: Date, shifts: TimeSlot[]) {
        this.date = date;
        this.shifts = shifts;
    }
}
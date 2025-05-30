import { TimeSlot } from '../valueObjects/TimeSlot';

export class Shift {
    id: number;
    startTime: TimeSlot;
    endTime: TimeSlot;

    constructor(id: number, startTime: TimeSlot, endTime: TimeSlot) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
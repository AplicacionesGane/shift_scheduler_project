import { ValueObject } from './ValueObject';

export class TimeSlot extends ValueObject {
    constructor(private start: Date, private end: Date) {
        super();
        this.validate();
    }

    private validate() {
        if (this.start >= this.end) {
            throw new Error('Start time must be before end time.');
        }
    }

    public getStart(): Date {
        return this.start;
    }

    public getEnd(): Date {
        return this.end;
    }
}
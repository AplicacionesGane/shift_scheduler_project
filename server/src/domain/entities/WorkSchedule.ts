import { EmployeeId } from '../valueObjects/EmployeeId';
import { Shift } from './Shift';

export class WorkSchedule {
    id: number;
    employeeId: EmployeeId;
    shiftId: number;

    constructor(id: number, employeeId: EmployeeId, shiftId: number) {
        this.id = id;
        this.employeeId = employeeId;
        this.shiftId = shiftId;
    }
}
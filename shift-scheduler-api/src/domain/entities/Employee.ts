import { EmployeeId } from '../valueObjects/EmployeeId';

export class Employee {
    id: EmployeeId;
    name: string;
    role: string;

    constructor(id: EmployeeId, name: string, role: string) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}
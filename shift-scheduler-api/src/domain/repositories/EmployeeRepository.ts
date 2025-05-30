import { Employee } from '../entities/Employee';

export interface EmployeeRepository {
    create(employee: Employee): Promise<Employee>;
    findById(id: string): Promise<Employee | null>;
    update(employee: Employee): Promise<Employee>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Employee[]>;
}
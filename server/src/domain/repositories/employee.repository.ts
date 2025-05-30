import type { EmployeeEntity } from '@domain/entities/employe.entity';

export interface EmployeeRepository {
    findById(document: string): Promise<EmployeeEntity | null>;
    findAll(): Promise<EmployeeEntity[] | null>;
    findByCargo(cargo: string): Promise<EmployeeEntity[] | null>;
}
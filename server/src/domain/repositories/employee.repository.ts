import type { EmployeeEntity } from '@domain/entities/employe.entity';

export interface EmploteeRepository {
    findById(document: string): Promise<EmployeeEntity | null>;
    findAll(): Promise<EmployeeEntity[]>;
    findByCargo(cargo: string): Promise<EmployeeEntity[]>;
}
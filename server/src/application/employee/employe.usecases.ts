import { EmploteeRepository } from '@domain/repositories/employee.repository';
import { EmployeeEntity } from '@domain/entities/employe.entity';

export class EmployeeUseCases {
    constructor(private readonly employeeRepo: EmploteeRepository) {}

    async findByDocument(document: string): Promise<EmployeeEntity | null> {
        return this.employeeRepo.findById(document);
    }

    async findAll(): Promise<EmployeeEntity[]> {
        return this.employeeRepo.findAll();
    }

    async findAllByCargo(cargo: string): Promise<EmployeeEntity[]> {
        return this.employeeRepo.findByCargo(cargo);
    }
}
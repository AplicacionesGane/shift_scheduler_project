import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { EmployeeEntity } from '@domain/entities/employe.entity';

export class EmployeeUseCases {
    constructor(private readonly employeeRepo: EmployeeRepository) {}

    async findByDocument(document: string): Promise<EmployeeEntity | null> {
        return this.employeeRepo.findById(document);
    }

    async findAll(): Promise<EmployeeEntity[] | null> {
        return this.employeeRepo.findAll();
    }

    async findAllByCargo(cargo: string): Promise<EmployeeEntity[] | null> {
        return this.employeeRepo.findByCargo(cargo);
    }
}
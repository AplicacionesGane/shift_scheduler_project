import { Employee } from '../../domain/entities/Employee';
import { EmployeeRepository } from '../../domain/repositories/EmployeeRepository';

export class CreateEmployee {
    private employeeRepository: EmployeeRepository;

    constructor(employeeRepository: EmployeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async execute(employeeData: Omit<Employee, 'id'>): Promise<Employee> {
        const newEmployee = new Employee(employeeData);
        return await this.employeeRepository.create(newEmployee);
    }
}
import { Employee } from '../../domain/entities/Employee';
import { EmployeeRepository } from '../../domain/repositories/EmployeeRepository';
import { EmployeeModel } from '../models/EmployeeModel';

export class SequelizeEmployeeRepository implements EmployeeRepository {
    async create(employee: Employee): Promise<Employee> {
        const createdEmployee = await EmployeeModel.create(employee);
        return createdEmployee;
    }

    async findById(id: string): Promise<Employee | null> {
        const employee = await EmployeeModel.findByPk(id);
        return employee ? employee.get() as Employee : null;
    }

    async update(employee: Employee): Promise<Employee | null> {
        const [updatedCount, [updatedEmployee]] = await EmployeeModel.update(employee, {
            where: { id: employee.id },
            returning: true,
        });
        return updatedCount > 0 ? updatedEmployee.get() as Employee : null;
    }

    async delete(id: string): Promise<void> {
        await EmployeeModel.destroy({ where: { id } });
    }

    async findAll(): Promise<Employee[]> {
        const employees = await EmployeeModel.findAll();
        return employees.map(emp => emp.get() as Employee);
    }
}
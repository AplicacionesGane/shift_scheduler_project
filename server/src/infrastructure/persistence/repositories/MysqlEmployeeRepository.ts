import { EmployeeModel } from '@infrastructure/persistence/models/employee.model';
import { EmployeeUseCases } from '@application/employee/employe.usecases'
import { EmployeeEntity } from '@domain/entities/employe.entity'

export class MysqlEmployeeRepository implements EmployeeUseCases {}
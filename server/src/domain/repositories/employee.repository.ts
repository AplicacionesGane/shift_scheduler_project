import type { EmployeeEntity } from '@domain/entities/employe.entity';

export interface EmployeeRepository {
  findEmployeeById(document: string): Promise<EmployeeEntity | null>;
  findAllEmployees(): Promise<EmployeeEntity[] | []>;
  findAllEmployeesByCargo(cargo: string): Promise<EmployeeEntity[] | []>;
}

import { EmployeeRepository } from "@/domain/repositories/employee.repository";

export class EmployeeUseCases {
  constructor(private readonly employeeRepo: EmployeeRepository) { }

  employeeById = async (document: string) => {
    const employee = await this.employeeRepo.findEmployeeById(document);
    return employee;
  }

  allEmployees = async () => {
    const employees = await this.employeeRepo.findAllEmployees();
    return employees;
  }

  employeesByCargo = async (cargo: string) => {
    const employees = await this.employeeRepo.findAllEmployeesByCargo(cargo);
    return employees;
  }

}
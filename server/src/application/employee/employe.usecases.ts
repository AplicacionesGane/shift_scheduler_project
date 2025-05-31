/**
 * ? Casos de uso para la entidad Employee.
 * * Estos casos de uso encapsulan la lógica de negocio relacionada con los empleados,
 * * permitiendo realizar operaciones como crear, actualizar, eliminar y consultar empleados.
 * * Tambien permiten logica de negocio relacionada con los empleados, como validaciones y transformaciones de datos.
 */

import { EmployeeRepository } from "@/domain/repositories/employee.repository";

export class EmployeeUseCases {
    // * Aplicamos inyección de dependencias para los repositorios necesarios
    constructor(private readonly employeeRepo: EmployeeRepository){}

    public employeeById = async (document: string) => {
        try {
            const employee = await this.employeeRepo.findEmployeeById(document);
            if (!employee) {
                throw new Error(`Employee with document ${document} not found`);
            }
            return employee;
        } catch (error) {
            console.error(error);
            return null; // O manejar el error de otra manera según la lógica de negocio
        }
    }

    public allEmployees = async () => {
        try {
            const employees = await this.employeeRepo.findAllEmployees();
            if (!employees || employees.length === 0) {
                throw new Error('No employees found');
            }
            return employees;
        } catch (error) {
            console.error(error);
            return null; // O manejar el error de otra manera según la lógica de negocio
        }
    }

    public employeesByCargo = async (cargo: string) => {
        try {
            const employees = await this.employeeRepo.findAllEmployeesByCargo(cargo);
            if (!employees || employees.length === 0) {
                throw new Error(`No employees found for cargo ${cargo}`);
            }
            return employees;
        } catch (error) {
            console.error(error);
            return null; // O manejar el error de otra manera según la lógica de negocio
        }
    }
    
}
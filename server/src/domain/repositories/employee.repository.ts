import type { EmployeeEntity } from '@domain/entities/employe.entity';

/**
 * Estos son los metodos que debe implementar el repositorio de empleados donde no interesa el manejo de la persistencia
 * de datos, sino que se centra en la logica de negocio y las operaciones que se pueden realizar con los empleados.
 */

export interface EmployeeRepository {

  findEmployeeById(document: string): Promise<EmployeeEntity | null>;

  findAllEmployees(): Promise<EmployeeEntity[] | null>;

  findAllEmployeesByCargo(cargo: string): Promise<EmployeeEntity[] | null>;

}
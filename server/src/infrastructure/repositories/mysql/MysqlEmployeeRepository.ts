import { EmployeeModel } from '@infrastructure/persistence/models/employee.model';
import { EmployeeRepository } from "@/domain/repositories/employee.repository";
import { EmployeeEntity } from "@/domain/entities/employe.entity";

/**
 * * Repositorio de employees para MySQL
 * * Capa de infraestructura que implementa la interfaz EmployeeRepository
 * * para interactuar con la base de datos MySQL.
 */
export class MysqlEmployeeRepository implements EmployeeRepository {
  findEmployeeById = async (document: string): Promise<EmployeeEntity | null> => {
    try {
      await EmployeeModel.sync(); // Asegurarse de que la tabla esté sincronizada
      const employeeModel = await EmployeeModel.findByPk(document);

      if (!employeeModel) return null; // Si no se encuentra el empleado, retornar null

      // TODO: Como el modelo del empleado es externo por un ETL, debemos mapearlo a nuestro employee entity

      const employeeEntity: EmployeeEntity = {
        documento: employeeModel.dataValues.DOCUMENTO,
        nombres: employeeModel.dataValues.NOMBRES,
        nameCargo: employeeModel.dataValues.NOMBRECARGO,
      };

      return employeeEntity
    } catch (error) {
      console.error('Error finding employee by ID:', error);
      return null;
    }
  }

  findAllEmployees = async (): Promise<EmployeeEntity[] | []> => {
    try {
      await EmployeeModel.sync(); // Asegurarse de que la tabla esté sincronizada
      const employees = await EmployeeModel.findAll();
      if (!employees || employees.length === 0) return []; // Si no hay empleados, retornar un array vacío

      // TODO: Como el modelo del empleado es externo por un ETL, debemos mapearlo a nuestro employee entity

      const employeeEntities: EmployeeEntity[] = employees.map(employee => ({
        documento: employee.dataValues.DOCUMENTO,
        nombres: employee.dataValues.NOMBRES,
        nameCargo: employee.dataValues.NOMBRECARGO,
      }));
      return employeeEntities;
    } catch (error) {
      console.error('Error finding all employees:', error);
      return [];
    }
  }

  findAllEmployeesByCargo = async (cargo: string): Promise<EmployeeEntity[] | []> => {
    try {
      await EmployeeModel.sync(); // Asegurarse de que la tabla esté sincronizada
      const employees = await EmployeeModel.findAll({ where: { NOMBRECARGO: cargo } });
      if (!employees || employees.length === 0) return []; // Si no hay empleados con el cargo, retornar un array vacío

      // TODO: Como el modelo del empleado es externo por un ETL, debemos mapearlo a nuestro employee entity
      
      const employeeEntities: EmployeeEntity[] = employees.map(employee => ({
        documento: employee.dataValues.DOCUMENTO,
        nombres: employee.dataValues.NOMBRES,
        nameCargo: employee.dataValues.NOMBRECARGO,
      }));
      return employeeEntities;
    } catch (error) {
      console.error('Error finding all employees by cargo:', error);
      return [];
    }
  }
}

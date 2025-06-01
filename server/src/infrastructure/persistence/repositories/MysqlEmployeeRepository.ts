import { EmployeeModel } from '@infrastructure/persistence/models/employee.model';

import { EmployeeRepository } from "@/domain/repositories/employee.repository";
import { EmployeeEntity } from "@/domain/entities/employe.entity";

export class MysqlEmployeeRepository implements EmployeeRepository {

  findEmployeeById = async (document: string): Promise<EmployeeEntity | null> => {
    try {
      const employee = await EmployeeModel.findByPk(document)

      if (!employee) return null;

      const employeeData: EmployeeEntity = {
        documento: employee.dataValues.DOCUMENTO,
        nombres: employee.dataValues.NOMBRES,
        nameCargo: employee.dataValues.NOMBRECARGO,
      }

      return employeeData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  findAllEmployees = async (): Promise<EmployeeEntity[] | null> => {
    try {
      await EmployeeModel.sync();
      const employees = await EmployeeModel.findAll({
        order: [['nombres', 'ASC']]
      });

      if (!employees || employees.length === 0) return null;

      const employeeData: EmployeeEntity[] = employees.map(employee => ({
        documento: employee.dataValues.DOCUMENTO,
        nombres: employee.dataValues.NOMBRES,
        nameCargo: employee.dataValues.NOMBRECARGO,
      }));

      return employeeData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  findAllEmployeesByCargo = async (cargo: string): Promise<EmployeeEntity[] | null> => {
    try {
      const employees = await EmployeeModel.findAll({
        where: { CARGO: cargo },
        order: [['nombres', 'ASC']]
      });

      if (!employees || employees.length === 0) return null;

      const employeeData: EmployeeEntity[] = employees.map(employee => ({
        documento: employee.dataValues.DOCUMENTO,
        nombres: employee.dataValues.NOMBRES,
        nameCargo: employee.dataValues.NOMBRECARGO,
      }));

      return employeeData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}

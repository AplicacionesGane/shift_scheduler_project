import { EmployeeUseCases } from '@application/employee/employe.usecases';
import { Request, Response } from 'express';

export class EmployeeController {
  constructor(private employeeUseCases: EmployeeUseCases) { }

  public getEmployeeByIdCtrl = async (req: Request, res: Response): Promise<void> => {    
    const { documento } = req.params;

    // validar query parameter
    if (!documento || typeof documento !== 'string' || documento.trim() === '') {
      res.status(400).json({ message: 'Document query parameter is required and must be a non-empty string' });
      return;
    }

    try {
      const employee = await this.employeeUseCases.employeeById(documento);
      if (!employee) {
        res.status(404).json({ message: `Employee with document ${documento} not found` });
        return;
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  public getAllEmployeesCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const employees = await this.employeeUseCases.allEmployees();
      if (!employees || employees.length === 0) {
        res.status(404).json({ message: 'No employees found' });
        return;
      }
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  public getEmployeesByCargoCtrl = async (req: Request, res: Response): Promise<void> => {
    const { cargo } = req.params;

    if (!cargo || cargo.trim() === '') {
      res.status(400).json({ message: 'Cargo parameter is required' });
      return;
    }

    try {
      const employees = await this.employeeUseCases.employeesByCargo(cargo);
      if (!employees || employees.length === 0) {
        res.status(404).json({ message: `No employees found for cargo ${cargo}` });
        return;
      }
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
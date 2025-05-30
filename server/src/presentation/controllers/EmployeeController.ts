import { Request, Response } from 'express';
import { CreateEmployee } from '../../application/VendedorUseCase';
import { GetSchedule } from '../../application/useCases/GetSchedule';
import { EmployeeDto } from '../dtos/EmployeeDto';

export class EmployeeController {
    private createEmployee: CreateEmployee;
    private getSchedule: GetSchedule;

    constructor() {
        this.createEmployee = new CreateEmployee();
        this.getSchedule = new GetSchedule();
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const employeeData: EmployeeDto = req.body;
            const newEmployee = await this.createEmployee.execute(employeeData);
            return res.status(201).json(newEmployee);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public async getSchedule(req: Request, res: Response): Promise<Response> {
        try {
            const employeeId = req.params.id;
            const schedule = await this.getSchedule.execute(employeeId);
            return res.status(200).json(schedule);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}
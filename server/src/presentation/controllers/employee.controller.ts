import { EmployeeUseCases } from '@application/employee/employe.usecases';
import { Request, Response } from 'express';

export class EmployeeController {
    constructor(private employeeUseCase: EmployeeUseCases){}

    public getEmployeeByDocument = async (req: Request, res: Response) => {
        const document = req.query;

        if(!document || typeof document !== 'string'){
            res.status(400).json({ message: 'Document is required' })
            return
        }

        try {
            const employess = await this.employeeUseCase.findByDocument(document)
            res.status(200).json(employess)
            return
        } catch (error) {
            res.status(500).json({ message: 'Error on server to find all employees'})
        }
    }

    public getAllEmployees = async (req: Request, res: Response) => {
        try {
            const employees = await this.employeeUseCase.findAll()
            res.status(200).json(employees)
            return
        } catch (error) {
            res.status(500).json({ message: 'Error on server to find all employees'})
        }
    }

}
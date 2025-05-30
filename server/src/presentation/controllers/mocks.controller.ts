import { EmployeeUseCases } from '@application/employee/employe.usecases';
import { StoreUseCases } from '@application/store/store.usecases';
import { Request, Response } from 'express';

export class MocksController {
    constructor(
        private employeeUseCase: EmployeeUseCases,
        private storeUseCase: StoreUseCases
    ) { }

    public getAllEmployees = async (req: Request, res: Response) => {
        try {
            const employees = await this.employeeUseCase.findAll();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error on server to find all employees' });
        }
    }

    public getAllStores = async (req: Request, res: Response) => {
        try {
            const stores = await this.storeUseCase.findAll();
            res.status(200).json(stores);
        } catch (error) {
            res.status(500).json({ message: 'Error on server to find all stores' });
        }
    }

}
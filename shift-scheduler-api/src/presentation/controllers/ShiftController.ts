import { Request, Response } from 'express';
import { ShiftService } from '../../application/services/index';
import { ShiftDto } from '../dtos/ShiftDto';

export class ShiftController {
    private shiftService: ShiftService;

    constructor() {
        this.shiftService = new ShiftService();
    }

    public async createShift(req: Request, res: Response): Promise<Response> {
        const shiftData: ShiftDto = req.body;
        try {
            const newShift = await this.shiftService.createShift(shiftData);
            return res.status(201).json(newShift);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async getShifts(req: Request, res: Response): Promise<Response> {
        try {
            const shifts = await this.shiftService.getAllShifts();
            return res.status(200).json(shifts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async assignShift(req: Request, res: Response): Promise<Response> {
        const { employeeId, shiftId } = req.body;
        try {
            const result = await this.shiftService.assignShift(employeeId, shiftId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Additional methods for managing shifts can be added here
}
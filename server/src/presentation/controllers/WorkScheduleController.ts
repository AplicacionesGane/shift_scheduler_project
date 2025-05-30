import { Request, Response } from 'express';
import { WorkSchedule } from '../../domain/entities/WorkSchedule';
import { WorkScheduleRepository } from '../../domain/repositories/WorkScheduleRepository';

export class WorkScheduleController {
    constructor(private workScheduleRepository: WorkScheduleRepository) {}

    public async createWorkSchedule(req: Request, res: Response): Promise<Response> {
        try {
            const { employeeId, shiftId } = req.body;
            const workSchedule = new WorkSchedule({ employeeId, shiftId });
            const createdSchedule = await this.workScheduleRepository.create(workSchedule);
            return res.status(201).json(createdSchedule);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating work schedule', error });
        }
    }

    public async getWorkSchedules(req: Request, res: Response): Promise<Response> {
        try {
            const schedules = await this.workScheduleRepository.findAll();
            return res.status(200).json(schedules);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving work schedules', error });
        }
    }

    public async getWorkScheduleById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const schedule = await this.workScheduleRepository.findById(id);
            if (!schedule) {
                return res.status(404).json({ message: 'Work schedule not found' });
            }
            return res.status(200).json(schedule);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving work schedule', error });
        }
    }

    public async updateWorkSchedule(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { employeeId, shiftId } = req.body;
            const updatedSchedule = await this.workScheduleRepository.update(id, { employeeId, shiftId });
            if (!updatedSchedule) {
                return res.status(404).json({ message: 'Work schedule not found' });
            }
            return res.status(200).json(updatedSchedule);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating work schedule', error });
        }
    }

    public async deleteWorkSchedule(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const deleted = await this.workScheduleRepository.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Work schedule not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting work schedule', error });
        }
    }
}
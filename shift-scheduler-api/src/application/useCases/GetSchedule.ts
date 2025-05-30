import { Request, Response } from 'express';
import { WorkScheduleRepository } from '../../domain/repositories/WorkScheduleRepository';

export class GetSchedule {
    private workScheduleRepository: WorkScheduleRepository;

    constructor(workScheduleRepository: WorkScheduleRepository) {
        this.workScheduleRepository = workScheduleRepository;
    }

    public async execute(req: Request, res: Response): Promise<void> {
        const { employeeId } = req.params;

        try {
            const schedule = await this.workScheduleRepository.getScheduleByEmployeeId(employeeId);
            if (!schedule) {
                res.status(404).json({ message: 'Schedule not found' });
                return;
            }
            res.status(200).json(schedule);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving schedule', error: error.message });
        }
    }
}
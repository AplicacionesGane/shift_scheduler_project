import { ShiftRepository } from '../../domain/repositories/ShiftRepository';
import { WorkScheduleRepository } from '../../domain/repositories/WorkScheduleRepository';
import { Shift } from '../../domain/entities/Shift';
import { WorkSchedule } from '../../domain/entities/WorkSchedule';

export class ManageShifts {
    private shiftRepository: ShiftRepository;
    private workScheduleRepository: WorkScheduleRepository;

    constructor(shiftRepo: ShiftRepository, workScheduleRepo: WorkScheduleRepository) {
        this.shiftRepository = shiftRepo;
        this.workScheduleRepository = workScheduleRepo;
    }

    async createShift(shiftData: Omit<Shift, 'id'>): Promise<Shift> {
        const newShift = await this.shiftRepository.create(shiftData);
        return newShift;
    }

    async updateShift(shiftId: string, shiftData: Partial<Shift>): Promise<Shift | null> {
        const updatedShift = await this.shiftRepository.update(shiftId, shiftData);
        return updatedShift;
    }

    async deleteShift(shiftId: string): Promise<void> {
        await this.shiftRepository.delete(shiftId);
    }

    async getWorkSchedulesForShift(shiftId: string): Promise<WorkSchedule[]> {
        const schedules = await this.workScheduleRepository.findByShiftId(shiftId);
        return schedules;
    }
}
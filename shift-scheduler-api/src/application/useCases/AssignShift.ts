import { EmployeeId } from '../../domain/valueObjects/EmployeeId';
import { Shift } from '../../domain/entities/Shift';
import { WorkSchedule } from '../../domain/entities/WorkSchedule';
import { ShiftRepository } from '../../domain/repositories/ShiftRepository';
import { WorkScheduleRepository } from '../../domain/repositories/WorkScheduleRepository';

export class AssignShift {
    private shiftRepository: ShiftRepository;
    private workScheduleRepository: WorkScheduleRepository;

    constructor(shiftRepository: ShiftRepository, workScheduleRepository: WorkScheduleRepository) {
        this.shiftRepository = shiftRepository;
        this.workScheduleRepository = workScheduleRepository;
    }

    async execute(employeeId: EmployeeId, shiftId: string): Promise<WorkSchedule> {
        const shift = await this.shiftRepository.findById(shiftId);
        if (!shift) {
            throw new Error('Shift not found');
        }

        const workSchedule = new WorkSchedule({
            employeeId: employeeId,
            shiftId: shift.id,
        });

        return await this.workScheduleRepository.save(workSchedule);
    }
}
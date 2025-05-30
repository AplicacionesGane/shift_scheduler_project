import { WorkSchedule } from '../../../domain/entities/WorkSchedule';
import { WorkScheduleRepository } from '../../../domain/repositories/WorkScheduleRepository';
import { WorkScheduleModel } from '../models/WorkScheduleModel';

export class SequelizeWorkScheduleRepository implements WorkScheduleRepository {
    async create(workSchedule: WorkSchedule): Promise<WorkSchedule> {
        const createdWorkSchedule = await WorkScheduleModel.create(workSchedule);
        return createdWorkSchedule;
    }

    async findById(id: string): Promise<WorkSchedule | null> {
        const workSchedule = await WorkScheduleModel.findByPk(id);
        return workSchedule ? workSchedule.toJSON() as WorkSchedule : null;
    }

    async update(workSchedule: WorkSchedule): Promise<WorkSchedule | null> {
        const [updatedCount, [updatedWorkSchedule]] = await WorkScheduleModel.update(workSchedule, {
            where: { id: workSchedule.id },
            returning: true,
        });
        return updatedCount > 0 ? updatedWorkSchedule.toJSON() as WorkSchedule : null;
    }

    async delete(id: string): Promise<boolean> {
        const deletedCount = await WorkScheduleModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async findAll(): Promise<WorkSchedule[]> {
        const workSchedules = await WorkScheduleModel.findAll();
        return workSchedules.map(ws => ws.toJSON() as WorkSchedule);
    }
}
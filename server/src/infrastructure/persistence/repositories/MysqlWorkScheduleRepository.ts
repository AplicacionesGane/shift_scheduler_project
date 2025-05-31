import { WorkScheduleModel } from '@infrastructure/persistence/models/workschedule.model';
import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';
import { WorkScheduleValue } from '@domain/valueObjects/workschedule.value';
import { WorkSchedule } from '@domain/entities/workschedule.entity';

export class MysqlWorkScheduleRepository implements WorkScheduleRepository {

    create = async (workSchedule: WorkSchedule): Promise<WorkSchedule> => {
        try {
            await WorkScheduleModel.sync();

            const createdWorkSchedule = await WorkScheduleModel.create(workSchedule);

            return new WorkScheduleValue({
                employeeDocument: createdWorkSchedule.employeeDocument,
                shiftId: createdWorkSchedule.shiftId,
                storeId: createdWorkSchedule.storeId,
                assignedDate: createdWorkSchedule.assignedDate,
                status: createdWorkSchedule.status
            });

        } catch (error) {
            console.error('Error creating work schedule:', error);
            throw new Error('Error creating work schedule');
        }
    }

    findAll = async (): Promise<WorkSchedule[] | null> => {
        try {
            await WorkScheduleModel.sync();
            const workSchedules = await WorkScheduleModel.findAll({
                order: [['assignedDate', 'ASC'], ['createdAt', 'ASC']]
            });

            if (!workSchedules || workSchedules.length === 0) return null;

            return workSchedules.map(ws => ws.toJSON() as WorkSchedule);
        } catch (error) {
            console.error('Error finding all work schedules:', error);
            throw new Error('Error finding all work schedules');
        }
    }

    findSchedulesByStoreId = async (id: string): Promise<WorkSchedule[] | null> => {
        return WorkScheduleModel.findAll({
            where: { storeId: id },
            order: [['assignedDate', 'ASC'], ['createdAt', 'ASC']]
        }).then(workSchedules => {
            if (!workSchedules || workSchedules.length === 0) return null;
            return workSchedules.map(ws => ws.toJSON() as WorkSchedule);
        }).catch(error => {
            console.error('Error finding work schedules by store ID:', error);
            throw new Error('Error finding work schedules by store ID');
        });
    }

    /**

    update = async (id: string, workSchedule: Partial<WorkSchedule>): Promise<WorkSchedule | null> => {
        try {
            const [updatedRows] = await WorkScheduleModel.update(
                {
                    ...workSchedule,
                    updatedAt: new Date()
                },
                {
                    where: { id },
                    returning: true
                }
            );

            if (updatedRows === 0) return null;

            const updatedWorkSchedule = await WorkScheduleModel.findByPk(id);
            return updatedWorkSchedule ? updatedWorkSchedule.toJSON() as WorkSchedule : null;
        } catch (error) {
            console.error('Error updating work schedule:', error);
            throw new Error('Error updating work schedule');
        }
    }

    delete = async (id: string): Promise<boolean> => {
        try {
            const deletedRows = await WorkScheduleModel.destroy({
                where: { id }
            });

            return deletedRows > 0;
        } catch (error) {
            console.error('Error deleting work schedule:', error);
            throw new Error('Error deleting work schedule');
        }
    }

    // Métodos adicionales específicos para consultas comunes
    findByEmployeeDocument = async (employeeDocument: string): Promise<WorkSchedule[] | null> => {
        try {
            const workSchedules = await WorkScheduleModel.findAll({
                where: { employeeDocument },
                order: [['assignedDate', 'ASC']]
            });

            if (!workSchedules || workSchedules.length === 0) return null;

            return workSchedules.map(ws => ws.toJSON() as WorkSchedule);
        } catch (error) {
            console.error('Error finding work schedules by employee:', error);
            throw new Error('Error finding work schedules by employee');
        }
    }

    findByStoreId = async (storeId: string): Promise<WorkSchedule[] | null> => {
        try {
            const workSchedules = await WorkScheduleModel.findAll({
                where: { storeId },
                order: [['assignedDate', 'ASC'], ['createdAt', 'ASC']]
            });

            if (!workSchedules || workSchedules.length === 0) return null;

            return workSchedules.map(ws => ws.toJSON() as WorkSchedule);
        } catch (error) {
            console.error('Error finding work schedules by store:', error);
            throw new Error('Error finding work schedules by store');
        }
    }

    findByDate = async (date: string): Promise<WorkSchedule[] | null> => {
        try {
            const workSchedules = await WorkScheduleModel.findAll({
                where: { assignedDate: date },
                order: [['createdAt', 'ASC']]
            });

            if (!workSchedules || workSchedules.length === 0) return null;

            return workSchedules.map(ws => ws.toJSON() as WorkSchedule);
        } catch (error) {
            console.error('Error finding work schedules by date:', error);
            throw new Error('Error finding work schedules by date');
        }
    }

    findByEmployeeAndDate = async (employeeDocument: string, date: string): Promise<WorkSchedule | null> => {
        try {
            const workSchedule = await WorkScheduleModel.findOne({
                where: { 
                    employeeDocument,
                    assignedDate: date 
                }
            });

            return workSchedule ? workSchedule.toJSON() as WorkSchedule : null;
        } catch (error) {
            console.error('Error finding work schedule by employee and date:', error);
            throw new Error('Error finding work schedule by employee and date');
        }
    }

    findByDateRange = async (startDate: string, endDate: string): Promise<WorkSchedule[] | null> => {
        try {
            const { Op } = require('sequelize');
            
            const workSchedules = await WorkScheduleModel.findAll({
                where: {
                    assignedDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                order: [['assignedDate', 'ASC'], ['createdAt', 'ASC']]
            });

            if (!workSchedules || workSchedules.length === 0) return null;

            return workSchedules.map(ws => ws.toJSON() as WorkSchedule);
        } catch (error) {
            console.error('Error finding work schedules by date range:', error);
            throw new Error('Error finding work schedules by date range');
        }
    }
    */
}

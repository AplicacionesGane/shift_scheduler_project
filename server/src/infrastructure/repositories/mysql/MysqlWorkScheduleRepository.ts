import { WorkScheduleModel } from '@infrastructure/persistence/models/workschedule.model';
import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';
import { WorkScheduleValueDTO } from '@domain/valueObjects/workschedule.value';
import { WorkSchedule } from '@domain/entities/workschedule.entity';

export class MysqlWorkScheduleRepository implements WorkScheduleRepository {

  save = async (newWorkSchedule: WorkScheduleValueDTO): Promise<WorkSchedule> => {
    try {
      await WorkScheduleModel.sync();

      const createdWorkSchedule = await WorkScheduleModel.create(newWorkSchedule);

      const workSchedule: WorkSchedule = {
        id: createdWorkSchedule.dataValues.id,
        employee: createdWorkSchedule.dataValues.employee,
        shiftId: createdWorkSchedule.dataValues.shiftId,
        storeId: createdWorkSchedule.dataValues.storeId,
        year: createdWorkSchedule.dataValues.year,
        month: createdWorkSchedule.dataValues.month,
        day: createdWorkSchedule.dataValues.day,
        status: createdWorkSchedule.dataValues.status,
        createdAt: createdWorkSchedule.dataValues.createdAt,
        updatedAt: createdWorkSchedule.dataValues.updatedAt
      };

      return workSchedule;

    } catch (error) {
      console.error('Error creating work schedule:', error);
      throw new Error('Error creating work schedule');
    }
  }

  findByStoreYearMonth = async (id: string, year: number, month: number): Promise<WorkSchedule[] | []> => {
    try {
      await WorkScheduleModel.sync();
      const workSchedules = await WorkScheduleModel.findAll({
        where: { storeId: id, year, month },
        order: [['day', 'ASC']]
      })

      if (!workSchedules || workSchedules.length === 0) return [];

      return workSchedules.map(schedule => ({
        id: schedule.dataValues.id,
        employee: schedule.dataValues.employee,
        shiftId: schedule.dataValues.shiftId,
        storeId: schedule.dataValues.storeId,
        year: schedule.dataValues.year,
        month: schedule.dataValues.month,
        day: schedule.dataValues.day,
        status: schedule.dataValues.status,
        createdAt: schedule.dataValues.createdAt,
        updatedAt: schedule.dataValues.updatedAt
      }));

    } catch (error) {
      console.error('Error finding work schedules by store ID:', error);
      throw new Error('Error finding work schedules by store ID');
    }
  }

  findByDocumentAndDate = async (document: string, year: number, month: number, day: number): Promise<boolean | null> => {
    try {
      const schedule = await WorkScheduleModel.findOne({
        attributes: ['id'],
        where: { employee: document, year, month, day }
      })

      if (!schedule) return null;

      return schedule.dataValues.id ? true : false;
    } catch (error) {
      console.error('Error finding work schedule by document and date:', error);
      throw new Error('Error finding work schedule by document and date');
    }
  }

  findAll = async (): Promise<WorkSchedule[] | null> => {
    try {
      await WorkScheduleModel.sync();
      const workSchedules = await WorkScheduleModel.findAll({
        order: [['assignedDate', 'ASC'], ['createdAt', 'ASC']]
      });

      if (!workSchedules || workSchedules.length === 0) return null;

      return workSchedules
    } catch (error) {
      console.error('Error finding all work schedules:', error);
      throw new Error('Error finding all work schedules');
    }
  }

}

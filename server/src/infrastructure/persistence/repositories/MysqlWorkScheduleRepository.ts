import { WorkScheduleModel } from '@infrastructure/persistence/models/workschedule.model';
import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';
import { WorkScheduleValueDTO } from '@domain/valueObjects/workschedule.value';
import { WorkSchedule } from '@domain/entities/workschedule.entity';

export class MysqlWorkScheduleRepository implements WorkScheduleRepository {

  createNewWorkSchedule = async (newWorkSchedule: WorkScheduleValueDTO): Promise<WorkSchedule> => {
    try {
      await WorkScheduleModel.sync();

      const createdWorkSchedule = await WorkScheduleModel.create(newWorkSchedule);

      const workSchedule: WorkSchedule = {
        id: createdWorkSchedule.dataValues.id,
        employee: createdWorkSchedule.dataValues.employee,
        shiftId: createdWorkSchedule.dataValues.shiftId,
        storeId: createdWorkSchedule.dataValues.storeId,
        assignedDate: createdWorkSchedule.dataValues.assignedDate,
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

  findScheduleByDocumentAndDate = async (document: string, dateAsing: string): Promise<WorkSchedule | null> => {
    try {
      const schedule = await WorkScheduleModel.findOne({
        where: {
          employee: document,
          assignedDate: dateAsing
        }
      })

      if (!schedule) return null;

      const worSchedule: WorkSchedule = {
        id: schedule.dataValues.id,
        employee: schedule.dataValues.employee,
        shiftId: schedule.dataValues.shiftId,
        storeId: schedule.dataValues.storeId,
        assignedDate: schedule.dataValues.assignedDate,
        status: schedule.dataValues.status,
        createdAt: schedule.dataValues.createdAt,
        updatedAt: schedule.dataValues.updatedAt
      }

      return worSchedule;
    } catch (error) {
      console.error('Error finding work schedule by document and date:', error);
      throw new Error('Error finding work schedule by document and date');
    }
  }

  findAllWorksSchedules = async (): Promise<WorkSchedule[] | null> => {
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

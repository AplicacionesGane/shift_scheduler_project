import { WorkScheduleModel } from '@/infrastructure/persistence/models/sequelize/workschedule.model';
import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';
import { WorkSchedule } from '@domain/entities/workschedule.entity';

export class MysqlWorkScheduleRepository implements WorkScheduleRepository {
  save = async (workSchedule: WorkSchedule): Promise<WorkSchedule> => {
    try {
      await WorkScheduleModel.sync(); // Ensure the table is synchronized
      const workScheduleModel = await WorkScheduleModel.create(workSchedule);
      return workScheduleModel;
    } catch (error) {
      console.error('Error saving work schedule:', error);
      throw new Error('Error saving work schedule');
    }
  }

  findAll = async (): Promise<WorkSchedule[] | []> => {
    try {
      await WorkScheduleModel.sync();
      const workSchedules = await WorkScheduleModel.findAll();
      if (!workSchedules || workSchedules.length === 0) return [];
      return workSchedules;
    } catch (error) {
      console.error('Error finding all work schedules:', error);
      throw new Error('Error finding all work schedules');
    }
  }

  findByDocumentAndDate = async (document: string, year: number, month: number, day: number): Promise<boolean | null> => {
    try {
      await WorkScheduleModel.sync();
      const schedule = await WorkScheduleModel.findOne({ where: { employee: document, year, month, day } });
      return schedule !== null;
    } catch (error) {
      console.error('Error finding work schedule by document and date:', error);
      throw new Error('Error finding work schedule by document and date');
    }
  }

  findWorkScheduleByshiftId = async (idShift: string): Promise<boolean> => {
    try {
      const workSchedule = await WorkScheduleModel.findOne({ where: { shiftId: idShift } });
      return workSchedule !== null;
    } catch (error) {
      console.error('Error finding work schedule by shift ID:', error);
      throw new Error('Error finding work schedule by shift ID');
    }
  }

  findByStoreYearMonth = async (idStore: string, year: number, month: number): Promise<WorkSchedule[] | []> => {
    try {
      await WorkScheduleModel.sync();
      const workSchedules = await WorkScheduleModel.findAll({ where: { storeId: idStore, year, month } });
      if (!workSchedules || workSchedules.length === 0) return [];
      return workSchedules;
    } catch (error) {
      console.error('Error finding work schedules by store, year, and month:', error);
      throw new Error('Error finding work schedules by store, year, and month');
    }
  }
}

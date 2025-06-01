import { WorkScheduleUseCases } from '@application/workschedule/workschedule.usecases';
import { validateWorkSchedule } from '../schemas/workScheduleSchemaValidate';
import { Request, Response } from 'express';

export class WorkScheduleController {
  constructor(private readonly workScheduleUseCases: WorkScheduleUseCases) { }

  public createWorkSchedule = async (req: Request, res: Response) => {
    const { success, data, error } = validateWorkSchedule(req.body);

    if (!success) {
      res.status(400).json({ message: 'Invalid shift data', error: error.format() });
      return;
    }

    try {
      const createdWorkSchedule = await this.workScheduleUseCases.createNewSchedule(data);
      res.status(201).json(createdWorkSchedule);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Error on server to create shift' })
    }
  }

  public getAllWorkSchedules = async (req: Request, res: Response) => {
    try {
      const workSchedules = await this.workScheduleUseCases.findAllWorkSchedules();

      if (!workSchedules || workSchedules.length === 0) {
        res.status(404).json({ message: 'No work schedules found', error: 'No work schedules found' });
        return;
      }

      res.status(200).json(workSchedules);
    } catch (error) {
      console.error('Error retrieving work schedules:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Error retrieving work schedules'
      });
    }
  }

  public getWorkSchedulesByStoreId = async (req: Request, res: Response) => {
    const { storeId } = req.params;
    if (!storeId || typeof storeId !== 'string') {
      res.status(400).json({
        error: 'Invalid store ID',
        message: 'Valid store ID is required'
      });
      return;
    }
    try {
      const workSchedules = await this.workScheduleUseCases.findWordkSchedulesByStoreId(storeId);
      if (!workSchedules || workSchedules.length === 0) {
        res.status(404).json({
          message: `No work schedules found for store ${storeId}`,
          data: []
        });
        return;
      }
      res.status(200).json(workSchedules);
    } catch (error) {
      console.error('Error retrieving work schedules by store ID:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Error retrieving work schedules by store ID'
      });
    }
  }

  public getWorkScheduleByDocumentAndDate = async (req: Request, res: Response) => {
    const { document, date } = req.params;

    if (!document || !date) {
      res.status(400).json({
        error: 'Invalid parameters',
        message: 'Document and date are required'
      });
      return;
    }

    try {
      const workSchedule = await this.workScheduleUseCases.findWorkScheduleByDocumentAndDate(document, date);
      res.status(200).json(workSchedule);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Error on server to retrieve work schedule' });
    }
  }


}

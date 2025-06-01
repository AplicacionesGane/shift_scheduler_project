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

  public findByStoreIdWhitMonthAndYear = async (req: Request, res: Response) => {
    const { storeId, year, month } = req.params;

    if (!storeId || typeof storeId !== 'string' || !year || !month || isNaN(parseInt(year)) || isNaN(parseInt(month))) {
      res.status(400).json({
        error: 'Invalid parameters',
        message: 'Valid store ID, year, and month are required'
      });
      return;
    }

    try {
      const workSchedules = await this.workScheduleUseCases.findByStoreYearMonth(storeId, parseInt(year), parseInt(month));
      res.status(200).json(workSchedules);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Error on server to retrieve work schedules' });
    }
  }

  public getWorkScheduleByDocumentAndDate = async (req: Request, res: Response) => {
    const { document, date } = req.params;
    const [year, month, day] = date.split('-').map(Number);

    if (!document || !date) {
      res.status(400).json({
        error: 'Invalid parameters',
        message: 'Document and date are required'
      });
      return;
    }

    try {
      const workSchedule = await this.workScheduleUseCases.findWorkScheduleByDocumentAndDate(document, year, month, day);
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

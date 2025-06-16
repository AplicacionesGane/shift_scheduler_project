import { CalendarUseCases,  } from '@application/calendar/calendar.usecases';
import { Request, Response } from 'express';

export class CalendarController {
  constructor(private calendarUseCases: CalendarUseCases) {}

  public getAllCalendarsCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.calendarUseCases.allCalendars();

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          success: false,
          message: 'No calendars found'
        });
      }
    } catch (error) {
      console.error('Error getting all calendars:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  public createCalendarByYearCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year } = req.body;

      if (!year || isNaN(Number(year))) {
        res.status(400).json({
          success: false,
          message: 'Year parameter is required and must be a valid number'
        });
        return;
      }

      const yearNumber = parseInt(year, 10);

      if (yearNumber < 2024 || yearNumber > 2100) {
        res.status(400).json({
          success: false,
          message: 'Year must be between 2024 and 2100'
        });
        return;
      }

      const result = await this.calendarUseCases.createCalendar(yearNumber);

      if (result) {
        res.status(201).json({
          success: true,
          message: `Calendar for year ${yearNumber} created successfully`
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Failed to create calendar, it may already exist'
        });
      }

    } catch (error) {
      console.error('Error creating calendar by year:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  public getCalendarByYearCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year } = req.params;

      if (!year || isNaN(Number(year))) {
        res.status(400).json({
          success: false,
          message: 'Year parameter is required and must be a valid number'
        });
        return;
      }

      const yearNumber = parseInt(year, 10);

      if (yearNumber < 2024 || yearNumber > 2100) {
        res.status(400).json({
          success: false,
          message: 'Year must be between 1900 and 2100'
        });
        return;
      }

      const result = await this.calendarUseCases.findCalendarByYear(yearNumber);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          success: false,
          message: 'Calendar not found'
        });
      }
    } catch (error) {
      console.error('Error getting calendar by year:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  public getCalendarByYearAndMonthCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year, month } = req.params;

      if (!year || isNaN(Number(year)) || !month || isNaN(Number(month))) {
        res.status(400).json({
          success: false,
          message: 'Year and month parameters are required and must be valid numbers'
        });
        return;
      }

      const yearNumber = parseInt(year, 10);
      const monthNumber = parseInt(month, 10);

      if (yearNumber < 2024 || yearNumber > 2100) {
        res.status(400).json({
          success: false,
          message: 'Year must be between 2024 and 2100'
        });
        return;
      }

      if (monthNumber < 1 || monthNumber > 12) {
        res.status(400).json({
          success: false,
          message: 'Month must be between 1 and 12'
        });
        return;
      }

      const result = await this.calendarUseCases.findCalendarByYearAndMonth(yearNumber, monthNumber);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          success: false,
          message: 'Calendar not found for the specified year and month'
        });
      }
    } catch (error) {
      console.error('Error getting calendar by year and month:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  public getYearsAndMonthsCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.calendarUseCases.findYearsAndMonths();

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          success: false,
          message: 'No years and months found'
        });
      }
    } catch (error) {
      console.error('Error getting years and months:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

}
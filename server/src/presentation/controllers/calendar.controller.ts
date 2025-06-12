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

}

/*
export class CalendarController {
  constructor(private calendarUseCases: CalendarUseCases) { }

  /**
   * Crear calendario completo por año
   * POST /api/calendar/year

  public createCalendarByYearCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year, forceRegenerate } = req.body;

      // Validación de entrada
      if (!year || typeof year !== 'number') {
        res.status(400).json({ 
          success: false,
          message: 'Year is required and must be a number' 
        });
        return;
      }

      const request: CreateCalendarByYearRequest = {
        year,
        forceRegenerate: forceRegenerate || false
      };

      const result = await this.calendarUseCases.createCalendarByYear(request);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error creating calendar by year:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };

  /**
   * Obtener calendario por año
   * GET /api/calendar/year/:year

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
      
      if (yearNumber < 1900 || yearNumber > 2100) {
        res.status(400).json({ 
          success: false,
          message: 'Year must be between 1900 and 2100' 
        });
        return;
      }

      const result = await this.calendarUseCases.getCalendarByYear(yearNumber);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error getting calendar by year:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };

  /**
   * Obtener calendario por año y mes
   * GET /api/calendar/year/:year/month/:month

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
      
      if (yearNumber < 1900 || yearNumber > 2100) {
        res.status(400).json({ 
          success: false,
          message: 'Year must be between 1900 and 2100' 
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

      const result = await this.calendarUseCases.getCalendarByYearAndMonth(yearNumber, monthNumber);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error getting calendar by year and month:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };

  /**
   * Agregar día festivo manual
   * POST /api/calendar/holiday

  public addManualHolidayCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year, month, day, description } = req.body;

      // Validación de entrada
      if (!year || typeof year !== 'number' || 
          !month || typeof month !== 'number' || 
          !day || typeof day !== 'number' ||
          !description || typeof description !== 'string') {
        res.status(400).json({ 
          success: false,
          message: 'Year, month, day (numbers) and description (string) are required' 
        });
        return;
      }

      if (year < 1900 || year > 2100) {
        res.status(400).json({ 
          success: false,
          message: 'Year must be between 1900 and 2100' 
        });
        return;
      }

      if (month < 1 || month > 12) {
        res.status(400).json({ 
          success: false,
          message: 'Month must be between 1 and 12' 
        });
        return;
      }

      if (day < 1 || day > 31) {
        res.status(400).json({ 
          success: false,
          message: 'Day must be between 1 and 31' 
        });
        return;
      }

      if (description.trim().length === 0) {
        res.status(400).json({ 
          success: false,
          message: 'Description cannot be empty' 
        });
        return;
      }

      const request: ManualHolidayRequest = {
        year,
        month,
        day,
        description: description.trim()
      };

      const result = await this.calendarUseCases.addManualHoliday(request);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error adding manual holiday:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };

  /**
   * Remover día festivo manual
   * DELETE /api/calendar/holiday

  public removeManualHolidayCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year, month, day } = req.body;

      // Validación de entrada
      if (!year || typeof year !== 'number' || 
          !month || typeof month !== 'number' || 
          !day || typeof day !== 'number') {
        res.status(400).json({ 
          success: false,
          message: 'Year, month, and day are required and must be numbers' 
        });
        return;
      }

      if (year < 1900 || year > 2100) {
        res.status(400).json({ 
          success: false,
          message: 'Year must be between 1900 and 2100' 
        });
        return;
      }

      if (month < 1 || month > 12) {
        res.status(400).json({ 
          success: false,
          message: 'Month must be between 1 and 12' 
        });
        return;
      }

      if (day < 1 || day > 31) {
        res.status(400).json({ 
          success: false,
          message: 'Day must be between 1 and 31' 
        });
        return;
      }

      const result = await this.calendarUseCases.removeManualHoliday(year, month, day);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error removing manual holiday:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };

  /**
   * Actualizar estado de día festivo
   * PUT /api/calendar/holiday

  public updateHolidayStatusCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year, month, day, isHoliday, description } = req.body;

      // Validación de entrada
      if (!year || typeof year !== 'number' || 
          !month || typeof month !== 'number' || 
          !day || typeof day !== 'number' ||
          typeof isHoliday !== 'boolean') {
        res.status(400).json({ 
          success: false,
          message: 'Year, month, day (numbers) and isHoliday (boolean) are required' 
        });
        return;
      }

      if (year < 1900 || year > 2100) {
        res.status(400).json({ 
          success: false,
          message: 'Year must be between 1900 and 2100' 
        });
        return;
      }

      if (month < 1 || month > 12) {
        res.status(400).json({ 
          success: false,
          message: 'Month must be between 1 and 12' 
        });
        return;
      }

      if (day < 1 || day > 31) {
        res.status(400).json({ 
          success: false,
          message: 'Day must be between 1 and 31' 
        });
        return;
      }

      const request: UpdateHolidayRequest = {
        year,
        month,
        day,
        isHoliday,
        description: description && typeof description === 'string' ? description.trim() : undefined
      };

      const result = await this.calendarUseCases.updateHolidayStatus(request);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error updating holiday status:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };

  /**
   * Obtener todos los días festivos por año
   * GET /api/calendar/holidays/:year

  public getHolidaysByYearCtrl = async (req: Request, res: Response): Promise<void> => {
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
      
      if (yearNumber < 1900 || yearNumber > 2100) {
        res.status(400).json({ 
          success: false,
          message: 'Year must be between 1900 and 2100' 
        });
        return;
      }

      const result = await this.calendarUseCases.getHolidaysByYear(yearNumber);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error getting holidays by year:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };

  /**
   * Obtener información de una fecha específica
   * GET /api/calendar/date/:year/:month/:day

  public getDateInfoCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { year, month, day } = req.params;

      if (!year || isNaN(Number(year)) || 
          !month || isNaN(Number(month)) || 
          !day || isNaN(Number(day))) {
        res.status(400).json({ 
          success: false,
          message: 'Year, month, and day parameters are required and must be valid numbers' 
        });
        return;
      }

      const yearNumber = parseInt(year, 10);
      const monthNumber = parseInt(month, 10);
      const dayNumber = parseInt(day, 10);
      
      if (yearNumber < 1900 || yearNumber > 2100) {
        res.status(400).json({ 
          success: false,
          message: 'Year must be between 1900 and 2100' 
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

      if (dayNumber < 1 || dayNumber > 31) {
        res.status(400).json({ 
          success: false,
          message: 'Day must be between 1 and 31' 
        });
        return;
      }

      const result = await this.calendarUseCases.getDateInfo(yearNumber, monthNumber, dayNumber);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error getting date info:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };

  public getYearsAndMonthsCtrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.calendarUseCases.getYearsAndMonths();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting years and months:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  }
}
*/
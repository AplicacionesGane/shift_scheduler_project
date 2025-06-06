import { CalendarDomainService, ICalendarDomainService } from '@domain/services/CalendarDomainService';
import { CalendarRepository, type ResDataByYears } from '@domain/repositories/calendar.repository';
import { Calendar } from '@domain/entities/calendar.entity';

export interface CreateCalendarByYearRequest {
  year: number;
  forceRegenerate?: boolean; // Si es true, borra y regenera el calendario existente
}

export interface ManualHolidayRequest {
  year: number;
  month: number;
  day: number;
  description: string;
}

export interface UpdateHolidayRequest {
  year: number;
  month: number;
  day: number;
  isHoliday: boolean;
  description?: string;
}

export interface CalendarUseCasesResponse {
  success: boolean;
  message: string;
  data?: Calendar[];
  count?: number;
}

export class CalendarUseCases {
  private readonly calendarDomainService: ICalendarDomainService;

  constructor(private readonly calendarRepository: CalendarRepository) {
    this.calendarDomainService = new CalendarDomainService();
  }

  /**
   * Valida que el año esté en el rango permitido
   */
  private validateYear(year: number): { isValid: boolean; message?: string } {
    if (year < 2024 || year > 2100) {
      return {
        isValid: false,
        message: 'Year must be between 2024 and 2100'
      };
    }
    return { isValid: true };
  }

  /**
   * Valida que el mes esté en el rango permitido
   */
  private validateMonth(month: number): { isValid: boolean; message?: string } {
    if (month < 1 || month > 12) {
      return {
        isValid: false,
        message: 'Month must be between 1 and 12'
      };
    }
    return { isValid: true };
  }

  /**
   * Valida que el día esté en el rango permitido
   */
  private validateDay(day: number): { isValid: boolean; message?: string } {
    if (day < 1 || day > 31) {
      return {
        isValid: false,
        message: 'Day must be between 1 and 31'
      };
    }
    return { isValid: true };
  }

  /**
   * Valida año, mes y día en conjunto
   */
  private validateDate(year: number, month: number, day: number): { isValid: boolean; message?: string } {
    const yearValidation = this.validateYear(year);
    if (!yearValidation.isValid) return yearValidation;

    const monthValidation = this.validateMonth(month);
    if (!monthValidation.isValid) return monthValidation;

    const dayValidation = this.validateDay(day);
    if (!dayValidation.isValid) return dayValidation;

    return { isValid: true };
  }

  /**
   * Crea una respuesta de error estándar
   */
  private createErrorResponse(message: string): CalendarUseCasesResponse {
    return {
      success: false,
      message
    };
  }

  /**
   * Crea una respuesta de éxito estándar
   */
  private createSuccessResponse(message: string, data?: Calendar[], count?: number): CalendarUseCasesResponse {
    return {
      success: true,
      message,
      data,
      count: count ?? data?.length
    };
  }

  /**
   * Maneja errores de forma consistente
   */
  private handleError(error: unknown, defaultMessage: string): CalendarUseCasesResponse {
    console.error(defaultMessage, error);
    return this.createErrorResponse(
      error instanceof Error ? error.message : defaultMessage
    );
  }

  /**
   * Valida que la descripción del día festivo sea válida
   */
  private validateHolidayDescription(description: string): { isValid: boolean; message?: string } {
    if (!description || description.trim().length === 0) {
      return {
        isValid: false,
        message: 'Holiday description is required'
      };
    }
    return { isValid: true };
  }

  /**
   * Ejecuta una operación con manejo de errores estándar
   */
  private async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T | CalendarUseCasesResponse> {
    try {
      return await operation();
    } catch (error) {
      return this.handleError(error, errorMessage);
    }
  }

  /**
   * Crea un calendario completo para un año específico
   * @param request - Datos de la solicitud para crear el calendario
   * @returns Promise con el resultado de la operación
   */
  createCalendarByYear = async (request: CreateCalendarByYearRequest): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const { year, forceRegenerate = false } = request;

      const yearValidation = this.validateYear(year);
      if (!yearValidation.isValid) {
        return this.createErrorResponse(yearValidation.message!);
      }

      const existsCalendar = await this.calendarRepository.existsByYear(year);

      if (existsCalendar && !forceRegenerate) {
        const existingCalendar = await this.calendarRepository.findByYear(year);
        return this.createSuccessResponse(
          `Calendar for year ${year} already exists`,
          existingCalendar
        );
      }

      if (existsCalendar && forceRegenerate) {
        await this.calendarRepository.deleteByYear(year);
      }

      const yearCalendar = this.calendarDomainService.generateYearCalendar(year);
      const savedCalendar = await this.calendarRepository.saveMany(yearCalendar);

      return this.createSuccessResponse(
        `Calendar for year ${year} created successfully`,
        savedCalendar
      );
    }, 'Unknown error occurred while creating calendar') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Obtiene el calendario de un año específico
   * @param year - Año del calendario a obtener
   * @returns Promise con el calendario del año
   */
  getCalendarByYear = async (year: number): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const yearValidation = this.validateYear(year);
      if (!yearValidation.isValid) {
        return this.createErrorResponse(yearValidation.message!);
      }

      const calendar = await this.calendarRepository.findByYear(year);

      if (!calendar || calendar.length === 0) {
        return this.createErrorResponse(
          `No calendar found for year ${year}. Consider creating it first.`
        );
      }

      return this.createSuccessResponse(
        `Calendar for year ${year} retrieved successfully`,
        calendar
      );
    }, 'Unknown error occurred while retrieving calendar') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Obtiene el calendario de un mes específico
   * @param year - Año del calendario
   * @param month - Mes del calendario (1-12)
   * @returns Promise con el calendario del mes
   */
  getCalendarByYearAndMonth = async (year: number, month: number): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const yearValidation = this.validateYear(year);
      if (!yearValidation.isValid) {
        return this.createErrorResponse(yearValidation.message!);
      }

      const monthValidation = this.validateMonth(month);
      if (!monthValidation.isValid) {
        return this.createErrorResponse(monthValidation.message!);
      }

      const calendar = await this.calendarRepository.findByYearAndMonth(year, month);

      if (!calendar || calendar.length === 0) {
        return this.createErrorResponse(
          `No calendar found for ${month}/${year}. Consider creating the calendar for year ${year} first.`
        );
      }

      return this.createSuccessResponse(
        `Calendar for ${month}/${year} retrieved successfully`,
        calendar
      );
    }, 'Unknown error occurred while retrieving calendar') as Promise<CalendarUseCasesResponse>;
  }

  getYearsAndMonths = async (): Promise<ResDataByYears> => {
    const data = await this.calendarRepository.findYearsAndMonths();
    if (!data || !data.years || !data.months) {
      throw new Error('No calendar data found');
    }
    return {
      years: data.years,
      months: data.months
    };
  }

  /**
   * Obtiene información de un día específico
   * @param year - Año
   * @param month - Mes (1-12) 
   * @param day - Día (1-31)
   * @returns Promise con la información del día
   */
  getCalendarDay = async (year: number, month: number, day: number): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const dateValidation = this.validateDate(year, month, day);
      if (!dateValidation.isValid) {
        return this.createErrorResponse(dateValidation.message!);
      }

      const calendarDay = await this.calendarRepository.findByDate(year, month, day);

      if (!calendarDay) {
        return this.createErrorResponse(
          `No calendar day found for ${day}/${month}/${year}. Consider creating the calendar for year ${year} first.`
        );
      }

      return this.createSuccessResponse(
        `Calendar day ${day}/${month}/${year} retrieved successfully`,
        [calendarDay]
      );
    }, 'Unknown error occurred while retrieving calendar day') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Obtiene todos los calendarios disponibles
   * @returns Promise con todos los calendarios
   */
  getAllCalendars = async (): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const calendars = await this.calendarRepository.findAll();

      return this.createSuccessResponse(
        `Retrieved ${calendars.length} calendar entries successfully`,
        calendars
      );
    }, 'Unknown error occurred while retrieving calendars') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Elimina el calendario de un año específico
   * @param year - Año del calendario a eliminar
   * @returns Promise con el resultado de la operación
   */
  deleteCalendarByYear = async (year: number): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const yearValidation = this.validateYear(year);
      if (!yearValidation.isValid) {
        return this.createErrorResponse(yearValidation.message!);
      }

      const existsCalendar = await this.calendarRepository.existsByYear(year);

      if (!existsCalendar) {
        return this.createErrorResponse(`No calendar found for year ${year}`);
      }

      await this.calendarRepository.deleteByYear(year);

      return this.createSuccessResponse(`Calendar for year ${year} deleted successfully`);
    }, 'Unknown error occurred while deleting calendar') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Agrega un día festivo manual al calendario
   * @param request - Datos del día festivo a agregar
   * @returns Promise con el resultado de la operación
   */
  addManualHoliday = async (request: ManualHolidayRequest): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const { year, month, day, description } = request;

      const dateValidation = this.validateDate(year, month, day);
      if (!dateValidation.isValid) {
        return this.createErrorResponse(dateValidation.message!);
      }

      const descriptionValidation = this.validateHolidayDescription(description);
      if (!descriptionValidation.isValid) {
        return this.createErrorResponse(descriptionValidation.message!);
      }

      const existingDay = await this.calendarRepository.findByDate(year, month, day);
      if (!existingDay) {
        return this.createErrorResponse(
          `Calendar day ${day}/${month}/${year} not found. Create the calendar for year ${year} first.`
        );
      }

      const updatedDay = await this.calendarRepository.addManualHoliday(year, month, day, description.trim());

      if (!updatedDay) {
        return this.createErrorResponse('Failed to add manual holiday');
      }

      return this.createSuccessResponse(
        `Manual holiday "${description}" added successfully for ${day}/${month}/${year}`,
        [updatedDay]
      );
    }, 'Unknown error occurred while adding manual holiday') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Remueve un día festivo manual del calendario
   * @param year - Año
   * @param month - Mes (1-12)
   * @param day - Día (1-31)
   * @returns Promise con el resultado de la operación
   */
  removeManualHoliday = async (year: number, month: number, day: number): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const dateValidation = this.validateDate(year, month, day);
      if (!dateValidation.isValid) {
        return this.createErrorResponse(dateValidation.message!);
      }

      const existingDay = await this.calendarRepository.findByDate(year, month, day);
      if (!existingDay) {
        return this.createErrorResponse(`Calendar day ${day}/${month}/${year} not found`);
      }

      if (!existingDay.isHoliday) {
        return this.createErrorResponse(
          `Day ${day}/${month}/${year} is not currently marked as a holiday`
        );
      }

      const fixedHolidayInfo = this.calendarDomainService.isFixedHoliday(month, day);
      if (fixedHolidayInfo.isHoliday) {
        return this.createErrorResponse(
          `Cannot remove fixed holiday "${fixedHolidayInfo.description}" on ${day}/${month}. Fixed holidays cannot be modified.`
        );
      }

      const updatedDay = await this.calendarRepository.removeManualHoliday(year, month, day);

      if (!updatedDay) {
        return this.createErrorResponse('Failed to remove manual holiday');
      }

      return this.createSuccessResponse(
        `Manual holiday removed successfully for ${day}/${month}/${year}`,
        [updatedDay]
      );
    }, 'Unknown error occurred while removing manual holiday') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Actualiza el estado de holiday de un día específico
   * @param request - Datos de actualización del holiday
   * @returns Promise con el resultado de la operación
   */
  updateHolidayStatus = async (request: UpdateHolidayRequest): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const { year, month, day, isHoliday, description } = request;

      const dateValidation = this.validateDate(year, month, day);
      if (!dateValidation.isValid) {
        return this.createErrorResponse(dateValidation.message!);
      }

      const existingDay = await this.calendarRepository.findByDate(year, month, day);
      if (!existingDay) {
        return this.createErrorResponse(`Calendar day ${day}/${month}/${year} not found`);
      }

      const fixedHolidayInfo = this.calendarDomainService.isFixedHoliday(month, day);
      if (fixedHolidayInfo.isHoliday && !isHoliday) {
        return this.createErrorResponse(
          `Cannot disable fixed holiday "${fixedHolidayInfo.description}" on ${day}/${month}. Fixed holidays cannot be modified.`
        );
      }

      if (isHoliday && (!description || description.trim().length === 0)) {
        if (!fixedHolidayInfo.isHoliday) {
          return this.createErrorResponse(
            'Holiday description is required when marking a day as holiday'
          );
        }
      }

      const updatedDay = await this.calendarRepository.updateHolidayStatus(
        year,
        month,
        day,
        isHoliday,
        description?.trim()
      );

      if (!updatedDay) {
        return this.createErrorResponse('Failed to update holiday status');
      }

      return this.createSuccessResponse(
        `Holiday status updated successfully for ${day}/${month}/${year}`,
        [updatedDay]
      );
    }, 'Unknown error occurred while updating holiday status') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Obtiene todos los días festivos de un año específico
   * @param year - Año del cual obtener los holidays
   * @returns Promise con los días festivos del año
   */
  getHolidaysByYear = async (year: number): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const yearValidation = this.validateYear(year);
      if (!yearValidation.isValid) {
        return this.createErrorResponse(yearValidation.message!);
      }

      const holidays = await this.calendarRepository.findHolidaysByYear(year);

      return this.createSuccessResponse(
        `Retrieved ${holidays.length} holidays for year ${year}`,
        holidays
      );
    }, 'Unknown error occurred while retrieving holidays') as Promise<CalendarUseCasesResponse>;
  }

  /**
   * Obtiene la lista de días festivos fijos de Colombia
   * @returns Lista de días festivos fijos
   */
  getFixedHolidays = (): { date: string; description: string }[] => {
    const fixedHolidays = this.calendarDomainService.getFixedHolidays();
    const holidaysList: { date: string; description: string }[] = [];

    fixedHolidays.forEach((description, dateKey) => {
      holidaysList.push({
        date: dateKey,
        description
      });
    });

    return holidaysList.sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Obtiene información específica de una fecha
   * @param year - Año de la fecha
   * @param month - Mes de la fecha (1-12)
   * @param day - Día de la fecha (1-31)
   * @returns Promise con la información de la fecha
   */
  getDateInfo = async (year: number, month: number, day: number): Promise<CalendarUseCasesResponse> => {
    return this.executeWithErrorHandling(async () => {
      const dateValidation = this.validateDate(year, month, day);
      if (!dateValidation.isValid) {
        return this.createErrorResponse(dateValidation.message!);
      }

      const calendar = await this.calendarRepository.findByDate(year, month, day);

      if (!calendar) {
        return this.createErrorResponse(
          `No information found for date ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}. The calendar for this year may not exist.`
        );
      }

      return this.createSuccessResponse(
        'Date information retrieved successfully',
        [calendar]
      );
    }, 'Unknown error occurred while retrieving date information') as Promise<CalendarUseCasesResponse>;
  }
}

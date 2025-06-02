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
   * Crea un calendario completo para un año específico
   * @param request - Datos de la solicitud para crear el calendario
   * @returns Promise con el resultado de la operación
   */
  createCalendarByYear = async (request: CreateCalendarByYearRequest): Promise<CalendarUseCasesResponse> => {
    try {
      const { year, forceRegenerate = false } = request;

      // Validar año
      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      // Verificar si ya existe calendario para este año
      const existsCalendar = await this.calendarRepository.existsByYear(year);

      if (existsCalendar && !forceRegenerate) {
        const existingCalendar = await this.calendarRepository.findByYear(year);
        return {
          success: true,
          message: `Calendar for year ${year} already exists`,
          data: existingCalendar,
          count: existingCalendar.length
        };
      }

      // Si existe y se fuerza la regeneración, borrar el existente
      if (existsCalendar && forceRegenerate) {
        await this.calendarRepository.deleteByYear(year);
      }

      // Generar calendario usando el servicio de dominio
      const yearCalendar = this.calendarDomainService.generateYearCalendar(year);

      // Guardar el calendario generado
      const savedCalendar = await this.calendarRepository.saveMany(yearCalendar);

      return {
        success: true,
        message: `Calendar for year ${year} created successfully`,
        data: savedCalendar,
        count: savedCalendar.length
      };

    } catch (error) {
      console.error('Error creating calendar by year:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while creating calendar'
      };
    }
  }

  /**
   * Obtiene el calendario de un año específico
   * @param year - Año del calendario a obtener
   * @returns Promise con el calendario del año
   */
  getCalendarByYear = async (year: number): Promise<CalendarUseCasesResponse> => {
    try {
      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      const calendar = await this.calendarRepository.findByYear(year);

      if (!calendar || calendar.length === 0) {
        return {
          success: false,
          message: `No calendar found for year ${year}. Consider creating it first.`
        };
      }

      return {
        success: true,
        message: `Calendar for year ${year} retrieved successfully`,
        data: calendar,
        count: calendar.length
      };

    } catch (error) {
      console.error('Error getting calendar by year:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while retrieving calendar'
      };
    }
  }

  /**
   * Obtiene el calendario de un mes específico
   * @param year - Año del calendario
   * @param month - Mes del calendario (1-12)
   * @returns Promise con el calendario del mes
   */
  getCalendarByYearAndMonth = async (year: number, month: number): Promise<CalendarUseCasesResponse> => {
    try {
      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      if (month < 1 || month > 12) {
        return {
          success: false,
          message: 'Month must be between 1 and 12'
        };
      }

      const calendar = await this.calendarRepository.findByYearAndMonth(year, month);

      if (!calendar || calendar.length === 0) {
        return {
          success: false,
          message: `No calendar found for ${month}/${year}. Consider creating the calendar for year ${year} first.`
        };
      }

      return {
        success: true,
        message: `Calendar for ${month}/${year} retrieved successfully`,
        data: calendar,
        count: calendar.length
      };

    } catch (error) {
      console.error('Error getting calendar by year and month:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while retrieving calendar'
      };
    }
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
    try {
      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      if (month < 1 || month > 12) {
        return {
          success: false,
          message: 'Month must be between 1 and 12'
        };
      }

      if (day < 1 || day > 31) {
        return {
          success: false,
          message: 'Day must be between 1 and 31'
        };
      }

      const calendarDay = await this.calendarRepository.findByDate(year, month, day);

      if (!calendarDay) {
        return {
          success: false,
          message: `No calendar day found for ${day}/${month}/${year}. Consider creating the calendar for year ${year} first.`
        };
      }

      return {
        success: true,
        message: `Calendar day ${day}/${month}/${year} retrieved successfully`,
        data: [calendarDay],
        count: 1
      };

    } catch (error) {
      console.error('Error getting calendar day:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while retrieving calendar day'
      };
    }
  }

  /**
   * Obtiene todos los calendarios disponibles
   * @returns Promise con todos los calendarios
   */
  getAllCalendars = async (): Promise<CalendarUseCasesResponse> => {
    try {
      const calendars = await this.calendarRepository.findAll();

      return {
        success: true,
        message: `Retrieved ${calendars.length} calendar entries successfully`,
        data: calendars,
        count: calendars.length
      };

    } catch (error) {
      console.error('Error getting all calendars:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while retrieving calendars'
      };
    }
  }

  /**
   * Elimina el calendario de un año específico
   * @param year - Año del calendario a eliminar
   * @returns Promise con el resultado de la operación
   */
  deleteCalendarByYear = async (year: number): Promise<CalendarUseCasesResponse> => {
    try {
      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      const existsCalendar = await this.calendarRepository.existsByYear(year);

      if (!existsCalendar) {
        return {
          success: false,
          message: `No calendar found for year ${year}`
        };
      }

      await this.calendarRepository.deleteByYear(year);

      return {
        success: true,
        message: `Calendar for year ${year} deleted successfully`
      };

    } catch (error) {
      console.error('Error deleting calendar by year:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while deleting calendar'
      };
    }
  }

  /**
   * Agrega un día festivo manual al calendario
   * @param request - Datos del día festivo a agregar
   * @returns Promise con el resultado de la operación
   */
  addManualHoliday = async (request: ManualHolidayRequest): Promise<CalendarUseCasesResponse> => {
    try {
      const { year, month, day, description } = request;

      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      if (month < 1 || month > 12) {
        return {
          success: false,
          message: 'Month must be between 1 and 12'
        };
      }

      if (day < 1 || day > 31) {
        return {
          success: false,
          message: 'Day must be between 1 and 31'
        };
      }

      if (!description || description.trim().length === 0) {
        return {
          success: false,
          message: 'Holiday description is required'
        };
      }

      // Verificar que existe el día en el calendario
      const existingDay = await this.calendarRepository.findByDate(year, month, day);
      if (!existingDay) {
        return {
          success: false,
          message: `Calendar day ${day}/${month}/${year} not found. Create the calendar for year ${year} first.`
        };
      }

      // Agregar el día festivo manual
      const updatedDay = await this.calendarRepository.addManualHoliday(year, month, day, description.trim());

      if (!updatedDay) {
        return {
          success: false,
          message: 'Failed to add manual holiday'
        };
      }

      return {
        success: true,
        message: `Manual holiday "${description}" added successfully for ${day}/${month}/${year}`,
        data: [updatedDay],
        count: 1
      };

    } catch (error) {
      console.error('Error adding manual holiday:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while adding manual holiday'
      };
    }
  }

  /**
   * Remueve un día festivo manual del calendario
   * @param year - Año
   * @param month - Mes (1-12)
   * @param day - Día (1-31)
   * @returns Promise con el resultado de la operación
   */
  removeManualHoliday = async (year: number, month: number, day: number): Promise<CalendarUseCasesResponse> => {
    try {
      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      if (month < 1 || month > 12) {
        return {
          success: false,
          message: 'Month must be between 1 and 12'
        };
      }

      if (day < 1 || day > 31) {
        return {
          success: false,
          message: 'Day must be between 1 and 31'
        };
      }

      // Verificar que el día existe y es un holiday
      const existingDay = await this.calendarRepository.findByDate(year, month, day);
      if (!existingDay) {
        return {
          success: false,
          message: `Calendar day ${day}/${month}/${year} not found`
        };
      }

      if (!existingDay.isHoliday) {
        return {
          success: false,
          message: `Day ${day}/${month}/${year} is not currently marked as a holiday`
        };
      }

      // Verificar si es un día festivo fijo (no se puede remover)
      const fixedHolidayInfo = this.calendarDomainService.isFixedHoliday(month, day);
      if (fixedHolidayInfo.isHoliday) {
        return {
          success: false,
          message: `Cannot remove fixed holiday "${fixedHolidayInfo.description}" on ${day}/${month}. Fixed holidays cannot be modified.`
        };
      }

      // Remover el día festivo manual
      const updatedDay = await this.calendarRepository.removeManualHoliday(year, month, day);

      if (!updatedDay) {
        return {
          success: false,
          message: 'Failed to remove manual holiday'
        };
      }

      return {
        success: true,
        message: `Manual holiday removed successfully for ${day}/${month}/${year}`,
        data: [updatedDay],
        count: 1
      };

    } catch (error) {
      console.error('Error removing manual holiday:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while removing manual holiday'
      };
    }
  }

  /**
   * Actualiza el estado de holiday de un día específico
   * @param request - Datos de actualización del holiday
   * @returns Promise con el resultado de la operación
   */
  updateHolidayStatus = async (request: UpdateHolidayRequest): Promise<CalendarUseCasesResponse> => {
    try {
      const { year, month, day, isHoliday, description } = request;

      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      if (month < 1 || month > 12) {
        return {
          success: false,
          message: 'Month must be between 1 and 12'
        };
      }

      if (day < 1 || day > 31) {
        return {
          success: false,
          message: 'Day must be between 1 and 31'
        };
      }

      // Verificar que el día existe
      const existingDay = await this.calendarRepository.findByDate(year, month, day);
      if (!existingDay) {
        return {
          success: false,
          message: `Calendar day ${day}/${month}/${year} not found`
        };
      }

      // Verificar si es un día festivo fijo y se está intentando desactivar
      const fixedHolidayInfo = this.calendarDomainService.isFixedHoliday(month, day);
      if (fixedHolidayInfo.isHoliday && !isHoliday) {
        return {
          success: false,
          message: `Cannot disable fixed holiday "${fixedHolidayInfo.description}" on ${day}/${month}. Fixed holidays cannot be modified.`
        };
      }

      // Si se está activando como holiday, verificar que tenga descripción
      if (isHoliday && (!description || description.trim().length === 0)) {
        // Si es un día festivo fijo, usar su descripción
        if (fixedHolidayInfo.isHoliday) {
          // Ya tiene descripción por defecto, no hacer nada
        } else {
          return {
            success: false,
            message: 'Holiday description is required when marking a day as holiday'
          };
        }
      }

      // Actualizar el estado del holiday
      const updatedDay = await this.calendarRepository.updateHolidayStatus(
        year,
        month,
        day,
        isHoliday,
        description?.trim()
      );

      if (!updatedDay) {
        return {
          success: false,
          message: 'Failed to update holiday status'
        };
      }

      return {
        success: true,
        message: `Holiday status updated successfully for ${day}/${month}/${year}`,
        data: [updatedDay],
        count: 1
      };

    } catch (error) {
      console.error('Error updating holiday status:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while updating holiday status'
      };
    }
  }

  /**
   * Obtiene todos los días festivos de un año específico
   * @param year - Año del cual obtener los holidays
   * @returns Promise con los días festivos del año
   */
  getHolidaysByYear = async (year: number): Promise<CalendarUseCasesResponse> => {
    try {
      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      const holidays = await this.calendarRepository.findHolidaysByYear(year);

      return {
        success: true,
        message: `Retrieved ${holidays.length} holidays for year ${year}`,
        data: holidays,
        count: holidays.length
      };

    } catch (error) {
      console.error('Error getting holidays by year:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while retrieving holidays'
      };
    }
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
    try {
      if (year < 1900 || year > 2100) {
        return {
          success: false,
          message: 'Year must be between 1900 and 2100'
        };
      }

      if (month < 1 || month > 12) {
        return {
          success: false,
          message: 'Month must be between 1 and 12'
        };
      }

      if (day < 1 || day > 31) {
        return {
          success: false,
          message: 'Day must be between 1 and 31'
        };
      }

      const calendar = await this.calendarRepository.findByDate(year, month, day);

      if (!calendar) {
        return {
          success: false,
          message: `No information found for date ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}. The calendar for this year may not exist.`
        };
      }

      return {
        success: true,
        message: `Date information retrieved successfully`,
        data: [calendar],
        count: 1
      };

    } catch (error) {
      console.error('Error getting date info:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while retrieving date information'
      };
    }
  }
}

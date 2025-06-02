import { Calendar } from '@domain/entities/calendar.entity';
import { CalendarRepository } from '@domain/repositories/calendar.repository';
import { CalendarDomainService, ICalendarDomainService } from '@domain/services/CalendarDomainService';

export interface CreateCalendarByYearRequest {
    year: number;
    forceRegenerate?: boolean; // Si es true, borra y regenera el calendario existente
}

export interface CalendarUseCasesResponse {
    success: boolean;
    message: string;
    data?: Calendar[];
    count?: number;
}

export class CalendarUseCases {
    private readonly calendarDomainService: ICalendarDomainService;

    constructor(
        private readonly calendarRepository: CalendarRepository
    ) {
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
}

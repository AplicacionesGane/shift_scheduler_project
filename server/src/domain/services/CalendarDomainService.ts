import { Calendar } from '@domain/entities/calendar.entity';
import { CalendarValue } from '@domain/valueObjects/calendar.value';

export interface ICalendarDomainService {
    generateYearCalendar(year: number): Calendar[];
    isWeekend(year: number, month: number, day: number): boolean;
    isFixedHoliday(month: number, day: number): { isHoliday: boolean; description?: string };
    getFixedHolidays(): Map<string, string>;
}

export class CalendarDomainService implements ICalendarDomainService {
    private readonly fixedHolidaysInColombia: Map<string, string> = new Map([
        // Días festivos fijos en Colombia que nunca cambian
        ['01-01', 'Año Nuevo'],
        ['05-01', 'Día del Trabajo'],
        ['07-20', 'Día de la Independencia'],
        ['08-07', 'Batalla de Boyacá'],
        ['12-08', 'Inmaculada Concepción'],
        ['12-25', 'Navidad']
    ]);

    generateYearCalendar(year: number): Calendar[] {
        const calendar: Calendar[] = [];

        for (let month = 1; month <= 12; month++) {
            const daysInMonth = this.getDaysInMonth(year, month);

            for (let day = 1; day <= daysInMonth; day++) {
                const isWeekend = this.isWeekend(year, month, day);
                const fixedHolidayInfo = this.isFixedHoliday(month, day);

                const calendarEntry = new CalendarValue(
                    year,
                    month,
                    day,
                    fixedHolidayInfo.isHoliday,
                    isWeekend,
                    fixedHolidayInfo.description
                );
                
                calendar.push(calendarEntry);
            }
        }

        return calendar;
    }

    isWeekend = (year: number, month: number, day: number): boolean => {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // Domingo = 0, Sábado = 6
    }

    isFixedHoliday = (month: number, day: number): { isHoliday: boolean; description?: string } => {
        const monthStr = month.toString().padStart(2, '0');
        const dayStr = day.toString().padStart(2, '0');
        const dateKey = `${monthStr}-${dayStr}`;
        const description = this.fixedHolidaysInColombia.get(dateKey);

        return { isHoliday: !!description, description };
    }

    private getDaysInMonth(year: number, month: number): number {
        return new Date(year, month, 0).getDate();
    }

    /**
     * Obtiene la lista de días festivos fijos de Colombia
     * @returns Map con los días festivos fijos
     */
    getFixedHolidays(): Map<string, string> {
        return new Map(this.fixedHolidaysInColombia);
    }
}

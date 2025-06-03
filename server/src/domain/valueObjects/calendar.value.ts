import { Calendar } from '@domain/entities/calendar.entity';
import { v4 as uuidv4 } from 'uuid';

export interface CalendarValueDTO {
    year: number;
    month: number;
    days: number;
    isHoliday?: boolean;
    isWeekend?: boolean;
    nameDay?: string;
    nameMonth?: string;
    holidayDescription?: string | null;
}

export class CalendarValue implements Calendar {
    id: string;
    year: number;
    month: number;
    days: number;
    isHoliday: boolean;
    isWeekend: boolean;
    nameDay: string;
    nameMonth: string;
    holidayDescription?: string | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(calendarData: CalendarValueDTO) {
        // Validaciones
        if (calendarData.year < 1900 || calendarData.year > 2100) {
            throw new Error('Invalid year. Year must be between 1900 and 2100');
        }

        if (calendarData.month < 1 || calendarData.month > 12) {
            throw new Error('Invalid month. Month must be between 1 and 12');
        }

        if (calendarData.days < 1 || calendarData.days > 31) {
            throw new Error('Invalid day. Day must be between 1 and 31');
        }

        // Validar que el día sea válido para el mes
        const daysInMonth = this.getDaysInMonth(calendarData.year, calendarData.month);
        if (calendarData.days > daysInMonth) {
            throw new Error(`Invalid day. Month ${calendarData.month} of year ${calendarData.year} only has ${daysInMonth} days`);
        }

        this.id = uuidv4();
        this.year = calendarData.year;
        this.month = calendarData.month;
        this.days = calendarData.days;
        this.isHoliday = calendarData.isHoliday || false;
        this.isWeekend = calendarData.isWeekend || false;
        this.nameDay = calendarData.nameDay || this.getDayName(calendarData.year, calendarData.month, calendarData.days);
        this.nameMonth = calendarData.nameMonth || this.getMonthName(calendarData.month);
        this.holidayDescription = calendarData.holidayDescription || null;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    private getDaysInMonth(year: number, month: number): number {
        return new Date(year, month, 0).getDate();
    }

    private getDayName(year: number, month: number, day: number): string {
        const date = new Date(year, month - 1, day);
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return dayNames[date.getDay()];
    }

    private getMonthName(month: number): string {
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return monthNames[month - 1];
    }
}

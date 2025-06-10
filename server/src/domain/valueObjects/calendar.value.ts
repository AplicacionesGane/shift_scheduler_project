import { Calendar } from '@domain/entities/calendar.entity';
import { v4 as uuidv4 } from 'uuid';

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
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        year: number, month: number, day: number,
        isHoliday: boolean = false,
        isWeekend: boolean = false,
        holidayDescription?: string | null
    ) {
        // Validaciones
        if (year < 2024 || year > 2100) {
            throw new Error('Invalid year. Year must be between 2024 and 2100');
        }

        if (month < 1 || month > 12) {
            throw new Error('Invalid month. Month must be between 1 and 12');
        }

        if (day < 1 || day > 31) {
            throw new Error('Invalid day. Day must be between 1 and 31');
        }

        // Validar que el día sea válido para el mes
        const daysInMonth = this.getDaysInMonth(year, month);
        if (day > daysInMonth) {
            throw new Error(`Invalid day. Month ${month} of year ${year} only has ${daysInMonth} days`);
        }

        this.id = uuidv4();
        this.year = year;
        this.month = month;
        this.days = day;
        this.isHoliday = isHoliday;
        this.isWeekend = isWeekend;
        this.nameDay = this.getDayName(year, month, day);
        this.nameMonth = this.getMonthName(month);
        this.holidayDescription = holidayDescription || null;
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

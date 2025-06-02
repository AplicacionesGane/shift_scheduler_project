import { Calendar } from '@domain/entities/calendar.entity';
import { CalendarValue } from '@domain/valueObjects/calendar.value';

export interface ICalendarDomainService {
    generateYearCalendar(year: number): Calendar[];
    isWeekend(year: number, month: number, day: number): boolean;
    isHoliday(year: number, month: number, day: number): boolean;
}

export class CalendarDomainService implements ICalendarDomainService {
    private readonly holidaysDates: Map<string, string[]> = new Map([
        // Días festivos fijos en Colombia
        ['01-01', ['Año Nuevo']],
        ['05-01', ['Día del Trabajo']],
        ['07-20', ['Día de la Independencia']],
        ['08-07', ['Batalla de Boyacá']],
        ['12-08', ['Inmaculada Concepción']],
        ['12-25', ['Navidad']]
    ]);

    generateYearCalendar(year: number): Calendar[] {
        const calendar: Calendar[] = [];

        for (let month = 1; month <= 12; month++) {
            const daysInMonth = this.getDaysInMonth(year, month);
            
            for (let day = 1; day <= daysInMonth; day++) {
                const isWeekend = this.isWeekend(year, month, day);
                const isHoliday = this.isHoliday(year, month, day);
                
                const calendarDay = new CalendarValue({
                    year,
                    month,
                    days: day,
                    isHoliday,
                    isWeekend
                });
                
                calendar.push(calendarDay);
            }
        }

        return calendar;
    }

    isWeekend(year: number, month: number, day: number): boolean {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // Domingo = 0, Sábado = 6
    }

    isHoliday(year: number, month: number, day: number): boolean {
        const monthStr = month.toString().padStart(2, '0');
        const dayStr = day.toString().padStart(2, '0');
        const dateKey = `${monthStr}-${dayStr}`;
        
        // Verificar días festivos fijos
        if (this.holidaysDates.has(dateKey)) {
            return true;
        }

        // Verificar días festivos calculados (Semana Santa, etc.)
        return this.isCalculatedHoliday(year, month, day);
    }

    private getDaysInMonth(year: number, month: number): number {
        return new Date(year, month, 0).getDate();
    }

    private isCalculatedHoliday(year: number, month: number, day: number): boolean {
        // Implementar lógica para días festivos calculados como Semana Santa
        // Por simplicidad, solo incluimos algunos ejemplos básicos
        
        // Ejemplo: Lunes de Pascua (día después del Domingo de Resurrección)
        const easter = this.getEasterDate(year);
        const easterMonday = new Date(easter);
        easterMonday.setDate(easter.getDate() + 1);
        
        const currentDate = new Date(year, month - 1, day);
        
        // Verificar si es Lunes de Pascua
        if (currentDate.getTime() === easterMonday.getTime()) {
            return true;
        }
        
        // Verificar Jueves Santo (3 días antes de Domingo de Resurrección)
        const holyThursday = new Date(easter);
        holyThursday.setDate(easter.getDate() - 3);
        if (currentDate.getTime() === holyThursday.getTime()) {
            return true;
        }
        
        // Verificar Viernes Santo (2 días antes de Domingo de Resurrección)
        const goodFriday = new Date(easter);
        goodFriday.setDate(easter.getDate() - 2);
        if (currentDate.getTime() === goodFriday.getTime()) {
            return true;
        }
        
        return false;
    }

    private getEasterDate(year: number): Date {
        // Algoritmo para calcular la fecha de Pascua (Domingo de Resurrección)
        // Basado en el algoritmo de Anonymous Gregorian
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        
        return new Date(year, month - 1, day);
    }
}

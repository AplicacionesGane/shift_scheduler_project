export class ValidationService {
    
    static validateTimeFormat(time: string): void {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(time)) {
            throw new Error(`Invalid time format: ${time}. Expected format: HH:MM`);
        }
    }

    static validateTimeRange(startTime: string, endTime: string): void {
        this.validateTimeFormat(startTime);
        this.validateTimeFormat(endTime);
        
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);
        
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;
        
        if (endMinutes <= startMinutes) {
            throw new Error(`endTime (${endTime}) must be after startTime (${startTime})`);
        }
    }

    static validateDateFormat(date: string): void {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            throw new Error(`Invalid date format: ${date}. Expected format: YYYY-MM-DD`);
        }
        
        // Validar que sea una fecha real
        const dateObj = new Date(date);
        if (dateObj.toISOString().slice(0, 10) !== date) {
            throw new Error(`Invalid date: ${date}`);
        }
    }

    /**
     * Valida si un año es válido para crear calendario
     * @param year - Año a validar
     */
    static validateCalendarYear(year: number): void {
        if (!year || isNaN(year)) {
            throw new Error('Year is required and must be a number');
        }

        if (year < 1900 || year > 2100) {
            throw new Error('Year must be between 1900 and 2100');
        }
    }

    /**
     * Valida si una fecha es válida
     * @param year - Año
     * @param month - Mes (1-12)
     * @param day - Día (1-31)
     */
    static validateCalendarDate(year: number, month: number, day: number): void {
        this.validateCalendarYear(year);

        if (!month || isNaN(month) || month < 1 || month > 12) {
            throw new Error('Month must be a number between 1 and 12');
        }

        if (!day || isNaN(day) || day < 1 || day > 31) {
            throw new Error('Day must be a number between 1 and 31');
        }

        // Validar que el día sea válido para el mes específico
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
            throw new Error(`Day ${day} is invalid for month ${month} of year ${year}. This month only has ${daysInMonth} days`);
        }
    }

    /**
     * Valida si una fecha no es en el pasado
     * @param year - Año
     * @param month - Mes (1-12)
     * @param day - Día (1-31)
     */
    static validateDateNotInPast(year: number, month: number, day: number): void {
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer a medianoche para comparar solo la fecha

        if (inputDate < today) {
            throw new Error(`Date ${day}/${month}/${year} cannot be in the past`);
        }
    }

    /**
     * Obtiene información sobre un día específico
     * @param year - Año
     * @param month - Mes (1-12)
     * @param day - Día (1-31)
     * @returns Información del día
     */
    static getDateInfo(year: number, month: number, day: number): {
        isWeekend: boolean;
        dayName: string;
        monthName: string;
        dayOfWeek: number;
    } {
        this.validateCalendarDate(year, month, day);

        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();
        
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        return {
            isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
            dayName: dayNames[dayOfWeek],
            monthName: monthNames[month - 1],
            dayOfWeek
        };
    }
}
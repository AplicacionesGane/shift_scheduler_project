/**
 * Helper para manejo de días festivos en Colombia
 */
export class HolidayHelper {
    /**
     * Valida si una descripción de holiday es válida
     */
    static validateHolidayDescription(description: string): { isValid: boolean; message?: string } {
        if (!description || typeof description !== 'string') {
            return {
                isValid: false,
                message: 'Holiday description must be a non-empty string'
            };
        }

        const trimmed = description.trim();
        if (trimmed.length === 0) {
            return {
                isValid: false,
                message: 'Holiday description cannot be empty'
            };
        }

        if (trimmed.length < 3) {
            return {
                isValid: false,
                message: 'Holiday description must be at least 3 characters long'
            };
        }

        if (trimmed.length > 100) {
            return {
                isValid: false,
                message: 'Holiday description cannot be longer than 100 characters'
            };
        }

        return { isValid: true };
    }

    /**
     * Normaliza la descripción de un holiday
     */
    static normalizeHolidayDescription(description: string): string {
        return description.trim()
            .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    /**
     * Obtiene información de días festivos fijos en Colombia
     */
    static getColombianFixedHolidays(): Array<{ date: string; description: string; month: number; day: number }> {
        return [
            { date: '01-01', description: 'Año Nuevo', month: 1, day: 1 },
            { date: '05-01', description: 'Día del Trabajo', month: 5, day: 1 },
            { date: '07-20', description: 'Día de la Independencia', month: 7, day: 20 },
            { date: '08-07', description: 'Batalla de Boyacá', month: 8, day: 7 },
            { date: '12-08', description: 'Inmaculada Concepción', month: 12, day: 8 },
            { date: '12-25', description: 'Navidad', month: 12, day: 25 }
        ];
    }

    /**
     * Verifica si una fecha corresponde a un día festivo fijo en Colombia
     */
    static isColombianFixedHoliday(month: number, day: number): { isHoliday: boolean; description?: string } {
        const monthStr = month.toString().padStart(2, '0');
        const dayStr = day.toString().padStart(2, '0');
        const dateKey = `${monthStr}-${dayStr}`;
        
        const holiday = this.getColombianFixedHolidays().find(h => h.date === dateKey);
        
        return {
            isHoliday: !!holiday,
            description: holiday?.description
        };
    }

    /**
     * Formatea una fecha para mostrar
     */
    static formatDate(year: number, month: number, day: number): string {
        const monthNames = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        return `${day} de ${monthNames[month - 1]} de ${year}`;
    }
}

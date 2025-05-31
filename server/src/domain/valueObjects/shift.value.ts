import { Shift } from '@domain/entities/shift.entity'
import { v4 as uuidv4 } from 'uuid';

export class ShiftValue implements Shift {
    id: string;
    startTime: string;
    endTime: string;
    idStore: string;
    date: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(shift: Omit<Shift, 'id' | 'createdAt' | 'updatedAt'>) {
        // Validar formato de tiempo antes de crear la instancia
        if (!ShiftValue.isValidTimeFormat(shift.startTime)) {
            throw new Error(`Invalid startTime format: ${shift.startTime}. Expected format: HH:MM`);
        }
        if (!ShiftValue.isValidTimeFormat(shift.endTime)) {
            throw new Error(`Invalid endTime format: ${shift.endTime}. Expected format: HH:MM`);
        }
        
        // Validar que endTime sea posterior a startTime
        if (!ShiftValue.isValidTimeRange(shift.startTime, shift.endTime)) {
            throw new Error(`endTime (${shift.endTime}) must be after startTime (${shift.startTime})`);
        }

        // Validar formato de fecha
        if (!ShiftValue.isValidDateFormat(shift.date)) {
            throw new Error(`Invalid date format: ${shift.date}. Expected format: YYYY-MM-DD`);
        }

        this.id = uuidv4();
        this.startTime = shift.startTime;
        this.idStore = shift.idStore ?? null;
        this.endTime = shift.endTime;
        this.date = shift.date;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Método estático para validar formato de tiempo
    static isValidTimeFormat(time: string): boolean {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Formato HH:mm
        return timeRegex.test(time);
    }

    // Método estático para validar rango de tiempo
    static isValidTimeRange(startTime: string, endTime: string): boolean {
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);
        
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;
        
        return endMinutes > startMinutes;
    }

    // Método estático para validar Fecha en formato YYYY-MM-DD
    static isValidDateFormat(date: string): boolean {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD
        return dateRegex.test(date);
    }

    // Método de instancia para validar (mantenemos por compatibilidad)
    validateTimeFormat(time: string): boolean {
        return ShiftValue.isValidTimeFormat(time);
    }
}
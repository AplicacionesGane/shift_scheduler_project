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
}
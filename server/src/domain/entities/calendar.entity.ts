export interface Calendar {
    id: string;
    year: number;
    month: number;
    days: number;
    isHoliday: boolean;
    isWeekend: boolean;
    nameDay: string;
    nameMonth: string;
    holidayDescription?: string | null; // Descripción del día festivo si aplica
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Calendar {
    id: string;
    year: number;
    month: number;
    days: number;
    isHoliday: boolean;
    isWeekend: boolean;
    nameDay: string;
    nameMonth: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}
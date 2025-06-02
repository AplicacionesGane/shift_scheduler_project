import { Calendar } from "@/domain/entities/calendar.entity";
import { CalendarRepository } from "@domain/repositories/calendar.repository";

export class CalendarRepoMysql implements CalendarRepository {
    save(calendar: Calendar): Promise<Calendar> {
        throw new Error("Method not implemented.");
    }
    saveMany(calendars: Calendar[]): Promise<Calendar[]> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Calendar[] | []> {
        throw new Error("Method not implemented.");
    }
    findByYear(year: number): Promise<Calendar[] | []> {
        throw new Error("Method not implemented.");
    }
    findByYearAndMonth(year: number, month: number): Promise<Calendar[] | []> {
        throw new Error("Method not implemented.");
    }
    findByDate(year: number, month: number, day: number): Promise<Calendar | null> {
        throw new Error("Method not implemented.");
    }
    deleteByYear(year: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    existsByYear(year: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateHolidayStatus(year: number, month: number, day: number, isHoliday: boolean, description?: string): Promise<Calendar | null> {
        throw new Error("Method not implemented.");
    }
    findHolidaysByYear(year: number): Promise<Calendar[] | []> {
        throw new Error("Method not implemented.");
    }
    addManualHoliday(year: number, month: number, day: number, description: string): Promise<Calendar | null> {
        throw new Error("Method not implemented.");
    }
    removeManualHoliday(year: number, month: number, day: number): Promise<Calendar | null> {
        throw new Error("Method not implemented.");
    }
}
import { Calendar } from '@domain/entities/calendar.entity';

// export interface ResDataByYears {
//   years: number[];
//   months: { numero: number; nameMonth: string }[];
// }

export interface CalendarRepository {
  findAll(): Promise<Calendar[] | []>;
  saveMany(calendars: Calendar[]): Promise<Calendar[]>;
  findByYear(year: number): Promise<Calendar[] | []>;
  findByYearAndMonth(year: number, month: number): Promise<Calendar[] | []>;
  
  // findYearsAndMonths(): Promise<ResDataByYears>;
  // findByDate(year: number, month: number, day: number): Promise<Calendar | null>;
  // deleteByYear(year: number): Promise<void>;
  // existsByYear(year: number): Promise<boolean>;
  
  // Métodos para manejo manual de holidays
  // updateHolidayStatus(year: number, month: number, day: number, isHoliday: boolean, description?: string): Promise<Calendar | null>;
  // findHolidaysByYear(year: number): Promise<Calendar[] | []>;
  // addManualHoliday(year: number, month: number, day: number, description: string): Promise<Calendar | null>;
  // removeManualHoliday(year: number, month: number, day: number): Promise<Calendar | null>;
}

import { Calendar } from '@domain/entities/calendar.entity';

export interface CalendarRepository {
  save(calendar: Calendar): Promise<Calendar>;
  saveMany(calendars: Calendar[]): Promise<Calendar[]>;
  findAll(): Promise<Calendar[] | []>;
  findByYear(year: number): Promise<Calendar[] | []>;
  findByYearAndMonth(year: number, month: number): Promise<Calendar[] | []>;
  findByDate(year: number, month: number, day: number): Promise<Calendar | null>;
  deleteByYear(year: number): Promise<void>;
  existsByYear(year: number): Promise<boolean>;
}

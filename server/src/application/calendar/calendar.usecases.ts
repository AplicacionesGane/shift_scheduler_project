import { CalendarDomainService } from '@/domain/services/CalendarDomainService';
import { CalendarRepository } from '@/domain/repositories/calendar.repository';
import { Calendar } from '@/domain/entities/calendar.entity';

export class CalendarUseCases {
  private calendarService: CalendarDomainService;

  constructor(private calendarRepo: CalendarRepository) {
    this.calendarService = new CalendarDomainService();
  }

  allCalendars = async (): Promise<Calendar[] | []> => {
    const calendars = await this.calendarRepo.findAll();
    return calendars;
  }

  createCalendar = async (year: number): Promise<Calendar[]> => {
    const calendar = this.calendarService.generateYearCalendar(year);
    await this.calendarRepo.saveMany(calendar);
    return calendar;
  }

  findCalendarByYear = async (year: number): Promise<Calendar[] | []> => {
    const calendars = await this.calendarRepo.findByYear(year);
    return calendars;
  }

  findCalendarByYearAndMonth = async (year: number, month: number): Promise<Calendar[] | []> => {
    const calendars = await this.calendarRepo.findByYearAndMonth(year, month);
    return calendars;
  }

  findYearsAndMonths = async (): Promise<{ years: number[]; months: { number: number; name: string }[] }> => {
    const data = await this.calendarRepo.findYearsAndMonths();
    return data;
  }
}

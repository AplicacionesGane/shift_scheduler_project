import { CalendarRepoMysql } from '@/infrastructure/repositories/mysql/CalendarRepoMysql';
import { CalendarController } from '@presentation/controllers/calendar.controller';
import { CalendarUseCases } from '@application/calendar/calendar.usecases';
import { Router } from 'express';

const routerCalendar = Router();

/**
 * Initialize the repository
 */
const repository = new CalendarRepoMysql();

/**
 * Initialize use cases
 */
const usecases = new CalendarUseCases(repository);

/**
 * Initialize controllers
 */
const controllers = new CalendarController(usecases);

/**
 * Define routes
 */

// Calendar management routes
routerCalendar.post('/calendar/year', controllers.createCalendarByYearCtrl);
routerCalendar.get('/calendar/year/:year', controllers.getCalendarByYearCtrl);
routerCalendar.get('/calendar/year/:year/month/:month', controllers.getCalendarByYearAndMonthCtrl);
routerCalendar.get('/calendar/date/:year/:month/:day', controllers.getDateInfoCtrl);

// Holiday management routes
routerCalendar.post('/calendar/holiday', controllers.addManualHolidayCtrl);
routerCalendar.put('/calendar/holiday', controllers.updateHolidayStatusCtrl);
routerCalendar.delete('/calendar/holiday', controllers.removeManualHolidayCtrl);
routerCalendar.get('/calendar/holidays/:year', controllers.getHolidaysByYearCtrl);

export { routerCalendar };

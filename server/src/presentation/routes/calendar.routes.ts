import { CalendarRepoMysql } from '@/infrastructure/repositories/mysql/CalendarRepoMysql';
import { CalendarController } from '@presentation/controllers/calendar.controller';
import { CalendarUseCases } from '@application/calendar/calendar.usecases';
import { Router } from 'express';
import { CalendarRepoMongo } from '@/infrastructure/repositories/mongo/CalendarRepoMongo';

const routerCalendar = Router();

/**
 * Initialize the repository
 */
const repository = new CalendarRepoMysql();

const repository2 = new CalendarRepoMongo();

/**
 * Initialize use cases
 */
const usecases = new CalendarUseCases(repository);

const usecases2 = new CalendarUseCases(repository2);

/**
 * Initialize controllers
 */
const controllers = new CalendarController(usecases);

const controllers2 = new CalendarController(usecases2);

/**
 * Define routes
 */

// Calendar management routes using mongo repository

routerCalendar.get('/calendar/mongo', controllers2.getAllCalendarsCtrl);
routerCalendar.post('/calendar/mongo/year', controllers2.createCalendarByYearCtrl);

// Calendar management routes
routerCalendar.get('/calendar', controllers.getAllCalendarsCtrl);
routerCalendar.post('/calendar/year', controllers.createCalendarByYearCtrl);
routerCalendar.get('/calendar/year/:year', controllers.getCalendarByYearCtrl);
routerCalendar.get('/calendar/year/:year/month/:month', controllers.getCalendarByYearAndMonthCtrl);

// routerCalendar.get('/calendar/date/:year/:month/:day', controllers.getDateInfoCtrl);
// routerCalendar.get('/calendar/years-months', controllers.getYearsAndMonthsCtrl);

// // Holiday management routes
// routerCalendar.post('/calendar/holiday', controllers.addManualHolidayCtrl);
// routerCalendar.put('/calendar/holiday', controllers.updateHolidayStatusCtrl);
// routerCalendar.delete('/calendar/holiday', controllers.removeManualHolidayCtrl);
// routerCalendar.get('/calendar/holidays/:year', controllers.getHolidaysByYearCtrl);

export { routerCalendar };

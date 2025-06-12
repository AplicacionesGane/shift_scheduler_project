import { CalendarModel } from '@/infrastructure/persistence/models/sequelize/calendar.model';
import { CalendarRepository } from '@domain/repositories/calendar.repository';
import { Calendar } from '@domain/entities/calendar.entity';
import { fn, col } from 'sequelize';

export class CalendarRepoMysql implements CalendarRepository {

    findAll = async (): Promise<Calendar[] | []> => {
        await CalendarModel.sync(); // Ensure the table is synchronized
        try {
            const calendars = await CalendarModel.findAll({
                order: [['year', 'ASC'], ['month', 'ASC'], ['days', 'ASC']]
            });

            if (!calendars || calendars.length === 0) return [];

            // Map the Sequelize model to our Calendar entity
            const calendarEntities: Calendar[] = calendars.map(calendar => ({
                id: calendar.dataValues.id,
                year: calendar.dataValues.year,
                month: calendar.dataValues.month,
                days: calendar.dataValues.days,
                isHoliday: calendar.dataValues.isHoliday,
                isWeekend: calendar.dataValues.isWeekend,
                nameDay: calendar.dataValues.nameDay,
                holidayDescription: calendar.dataValues.holidayDescription,
                nameMonth: calendar.dataValues.nameMonth,
                createdAt: calendar.dataValues.createdAt,
                updatedAt: calendar.dataValues.updatedAt
            }));

            return calendarEntities;
        } catch (error) {
            console.error('Error finding all calendars:', error);
            throw new Error('Error finding all calendars from database');
        }
    }

    saveMany = async (calendars: Calendar[]): Promise<Calendar[]> => {
        await CalendarModel.sync(); // Ensure the table is synchronized
        try {
            const newCalendar = await CalendarModel.bulkCreate(calendars, {
                returning: true,
                validate: true
            });

            if (!newCalendar || newCalendar.length === 0) return [];

            // Map the Sequelize model to our Calendar entity
            const calendarEntities: Calendar[] = newCalendar.map(calendar => ({
                id: calendar.dataValues.id,
                year: calendar.dataValues.year,
                month: calendar.dataValues.month,
                days: calendar.dataValues.days,
                isHoliday: calendar.dataValues.isHoliday,
                isWeekend: calendar.dataValues.isWeekend,
                nameDay: calendar.dataValues.nameDay,
                holidayDescription: calendar.dataValues.holidayDescription,
                nameMonth: calendar.dataValues.nameMonth,
                createdAt: calendar.dataValues.createdAt,
                updatedAt: calendar.dataValues.updatedAt
            }));

            return calendarEntities;
        } catch (error) {
            console.log(error);
            throw new Error('Error saving multiple calendars to database');
        }
    }

    findByYear = async (year: number): Promise<Calendar[] | []> => {
        try {
            await CalendarModel.sync(); // Ensure the table is synchronized
            const calendars = await CalendarModel.findAll({
                where: { year },
                order: [['month', 'ASC'], ['days', 'ASC']]
            });

            if (!calendars || calendars.length === 0) return [];

            // Map the Sequelize model to our Calendar entity
            const calendarEntities: Calendar[] = calendars.map(calendar => ({
                id: calendar.dataValues.id,
                year: calendar.dataValues.year,
                month: calendar.dataValues.month,
                days: calendar.dataValues.days,
                isHoliday: calendar.dataValues.isHoliday,
                isWeekend: calendar.dataValues.isWeekend,
                nameDay: calendar.dataValues.nameDay,
                holidayDescription: calendar.dataValues.holidayDescription,
                nameMonth: calendar.dataValues.nameMonth,
                createdAt: calendar.dataValues.createdAt,
                updatedAt: calendar.dataValues.updatedAt
            }));

            return calendarEntities;
        } catch (error) {
            console.log(error);
            throw new Error('Error finding calendars by year from database');
        }
    }

    findByYearAndMonth = async (year: number, month: number): Promise<Calendar[] | []> => {
        try {
            await CalendarModel.sync(); // Ensure the table is synchronized
            const calendars = await CalendarModel.findAll({
                where: { year, month },
                order: [['days', 'ASC']]
            });
            if (!calendars || calendars.length === 0) return [];
            // Map the Sequelize model to our Calendar entity
            const calendarEntities: Calendar[] = calendars.map(calendar => ({
                id: calendar.dataValues.id,
                year: calendar.dataValues.year,
                month: calendar.dataValues.month,
                days: calendar.dataValues.days,
                isHoliday: calendar.dataValues.isHoliday,
                isWeekend: calendar.dataValues.isWeekend,
                nameDay: calendar.dataValues.nameDay,
                holidayDescription: calendar.dataValues.holidayDescription,
                nameMonth: calendar.dataValues.nameMonth,
                createdAt: calendar.dataValues.createdAt,
                updatedAt: calendar.dataValues.updatedAt
            }));
            return calendarEntities;
        } catch (error) {
            console.log(error);
            throw new Error('Error finding calendars by year and month from database');
        }
    }

    findYearsAndMonths = async (): Promise<{ years: number[]; months: { number: number; name: string }[] }> => {
        try {
            const years = await CalendarModel.findAll({
                attributes: [[fn('DISTINCT', col('year')), 'year']],
            });

            const result = await CalendarModel.findAll({
                attributes: [
                    [fn('DISTINCT', col('nameMonth')), 'nameMonth'],
                    'month'
                ],
                group: ['nameMonth', 'month'],
                order: [['month', 'ASC']]
            });

            if (!years || !result) {
                throw new Error('No calendar data found');
            }

            const formattedYears = years.map((y) => y.dataValues.year);

            const formattedMonths = result.map((month) => ({
                number: month.dataValues.month,
                name: month.dataValues.nameMonth
            }));

            return { years: formattedYears, months: formattedMonths };
        } catch (error) {
            console.error('Error finding years and months:', error);
            throw new Error('Error finding years and months from database');
        }
    }


}

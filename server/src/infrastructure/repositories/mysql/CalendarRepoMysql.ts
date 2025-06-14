import { CalendarModel } from '@/infrastructure/persistence/models/sequelize/calendar.model';
import { CalendarRepository } from '@domain/repositories/calendar.repository';
import { Calendar } from '@domain/entities/calendar.entity';

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

}

/*import { CalendarRepository, ResDataByYears } from "@domain/repositories/calendar.repository";
import { CalendarModel } from "@infrastructure/persistence/models/calendar.model";
import { Calendar } from "@domain/entities/calendar.entity";
import { fn, QueryTypes } from "sequelize";

export class CalendarRepoMysql implements CalendarRepository {
    
    async save(calendar: Calendar): Promise<Calendar> {
        try {
            await CalendarModel.sync();
            const calendarModel = await CalendarModel.create(calendar);
            return calendarModel.toJSON() as Calendar;
        } catch (error) {
            console.error('Error saving calendar:', error);
            throw new Error('Error saving calendar to database');
        }
    }

    async saveMany(calendars: Calendar[]): Promise<Calendar[]> {
        try {
            await CalendarModel.sync();
            const calendarModels = await CalendarModel.bulkCreate(calendars, {
                returning: true,
                validate: true
            });
            return calendarModels.map(model => model.toJSON() as Calendar);
        } catch (error) {
            console.error('Error saving multiple calendars:', error);
            throw new Error('Error saving multiple calendars to database');
        }
    }

    async findAll(): Promise<Calendar[] | []> {
        try {
            await CalendarModel.sync();
            const calendars = await CalendarModel.findAll({
                order: [['year', 'ASC'], ['month', 'ASC'], ['days', 'ASC']]
            });
            if (!calendars || calendars.length === 0) return [];
            return calendars.map(calendar => calendar.toJSON() as Calendar);
        } catch (error) {
            console.error('Error finding all calendars:', error);
            throw new Error('Error finding all calendars from database');
        }
    }

    async findByYear(year: number): Promise<Calendar[] | []> {
        try {
            await CalendarModel.sync();
            const calendars = await CalendarModel.findAll({
                where: { year },
                order: [['month', 'ASC'], ['days', 'ASC']]
            });
            if (!calendars || calendars.length === 0) return [];
            return calendars.map(calendar => calendar.toJSON() as Calendar);
        } catch (error) {
            console.error('Error finding calendars by year:', error);
            throw new Error('Error finding calendars by year from database');
        }
    }

    async findByYearAndMonth(year: number, month: number): Promise<Calendar[] | []> {
        try {
            await CalendarModel.sync();
            const calendars = await CalendarModel.findAll({
                where: { year, month },
                order: [['days', 'ASC']]
            });
            if (!calendars || calendars.length === 0) return [];
            return calendars.map(calendar => calendar.toJSON() as Calendar);
        } catch (error) {
            console.error('Error finding calendars by year and month:', error);
            throw new Error('Error finding calendars by year and month from database');
        }
    }

    async findByDate(year: number, month: number, day: number): Promise<Calendar | null> {
        try {
            await CalendarModel.sync();
            const calendar = await CalendarModel.findOne({
                where: { year, month, days: day }
            });
            if (!calendar) return null;
            return calendar.toJSON() as Calendar;
        } catch (error) {
            console.error('Error finding calendar by date:', error);
            throw new Error('Error finding calendar by date from database');
        }
    }

    async findYearsAndMonths(): Promise<ResDataByYears> {
        try {
            const years = await CalendarModel.sequelize?.query(
                'SELECT DISTINCT year FROM CALENDAR ORDER BY year',
                { type: QueryTypes.SELECT }
            );
            const months = await CalendarModel.sequelize?.query(
                'SELECT DISTINCT month, nameMonth FROM CALENDAR ORDER BY month',
                { type: QueryTypes.SELECT }
            );
            
            if (!years || !months) {
                throw new Error('No calendar data found');
            }

            const formattedYears = years.map((year: any) => year.year);
            const formattedMonths = months.map((month: any) => ({
                numero: month.month,
                nameMonth: month.nameMonth
            }));

            return {
                years: formattedYears,
                months: formattedMonths
            };

        } catch (error) {
            console.error('Error finding years and months:', error);
            throw new Error('Error finding years and months from database');
        }
    }

    async deleteByYear(year: number): Promise<void> {
        try {
            await CalendarModel.sync();
            await CalendarModel.destroy({
                where: { year }
            });
        } catch (error) {
            console.error('Error deleting calendar by year:', error);
            throw new Error('Error deleting calendar by year from database');
        }
    }

    async existsByYear(year: number): Promise<boolean> {
        try {
            await CalendarModel.sync();
            const count = await CalendarModel.count({
                where: { year }
            });
            return count > 0;
        } catch (error) {
            console.error('Error checking if calendar exists by year:', error);
            throw new Error('Error checking if calendar exists by year in database');
        }
    }

    async updateHolidayStatus(year: number, month: number, day: number, isHoliday: boolean, description?: string): Promise<Calendar | null> {
        try {
            await CalendarModel.sync();
            const [affectedRows] = await CalendarModel.update({
                isHoliday,
                holidayDescription: isHoliday ? description || null : null
            }, {
                where: { year, month, days: day }
            });

            if (affectedRows === 0) return null;

            // Obtener el registro actualizado
            const updatedCalendar = await CalendarModel.findOne({
                where: { year, month, days: day }
            });

            return updatedCalendar ? updatedCalendar.toJSON() as Calendar : null;
        } catch (error) {
            console.error('Error updating holiday status:', error);
            throw new Error('Error updating holiday status in database');
        }
    }

    async findHolidaysByYear(year: number): Promise<Calendar[] | []> {
        try {
            await CalendarModel.sync();
            const holidays = await CalendarModel.findAll({
                where: { 
                    year,
                    isHoliday: true 
                },
                order: [['month', 'ASC'], ['days', 'ASC']]
            });
            if (!holidays || holidays.length === 0) return [];
            return holidays.map(holiday => holiday.toJSON() as Calendar);
        } catch (error) {
            console.error('Error finding holidays by year:', error);
            throw new Error('Error finding holidays by year from database');
        }
    }

    async addManualHoliday(year: number, month: number, day: number, description: string): Promise<Calendar | null> {
        try {
            await CalendarModel.sync();
            const [affectedRows] = await CalendarModel.update({
                isHoliday: true,
                holidayDescription: description.trim(),
                updatedAt: new Date()
            }, {
                where: { year, month, days: day }
            });

            if (affectedRows === 0) return null;

            // Obtener el registro actualizado
            const updatedCalendar = await CalendarModel.findOne({
                where: { year, month, days: day }
            });

            return updatedCalendar ? updatedCalendar.toJSON() as Calendar : null;
        } catch (error) {
            console.error('Error adding manual holiday:', error);
            throw new Error('Error adding manual holiday to database');
        }
    }

    async removeManualHoliday(year: number, month: number, day: number): Promise<Calendar | null> {
        try {
            await CalendarModel.sync();
            const [affectedRows] = await CalendarModel.update({
                isHoliday: false,
                holidayDescription: null,
                updatedAt: new Date()
            }, {
                where: { year, month, days: day }
            });

            if (affectedRows === 0) return null;

            // Obtener el registro actualizado
            const updatedCalendar = await CalendarModel.findOne({
                where: { year, month, days: day }
            });

            return updatedCalendar ? updatedCalendar.toJSON() as Calendar : null;
        } catch (error) {
            console.error('Error removing manual holiday:', error);
            throw new Error('Error removing manual holiday from database');
        }
    }
}
    */
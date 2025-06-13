import { CalendarModel } from '@/infrastructure/persistence/models/mongo/calendar.model';
import { CalendarRepository} from '@/domain/repositories/calendar.repository';
import { Calendar } from '@/domain/entities/calendar.entity';

export class CalendarRepoMongo implements CalendarRepository {

    findAll = async (): Promise<Calendar[] | []> => {
        try {
            const calendars = await CalendarModel.find().exec();
            return calendars.map(calendar => calendar.toObject());
        } catch (error) {
            console.error('Error fetching calendars:', error);
            throw new Error('Error fetching calendars from database');
        }
    }

    saveMany = async (calendars: Calendar[]): Promise<Calendar[]> => {
        try {
            const savedCalendars = await CalendarModel.insertMany(calendars);
            return savedCalendars.map(calendar => calendar.toObject());
        } catch (error) {
            console.error('Error saving calendars:', error);
            throw new Error('Error saving calendars to database');
        }
    }

    findByYear(year: number): Promise<Calendar[] | []> {
        throw new Error('Method not implemented.');
    }
    
    findByYearAndMonth(year: number, month: number): Promise<Calendar[] | []> {
        throw new Error('Method not implemented.');
    }
 
}

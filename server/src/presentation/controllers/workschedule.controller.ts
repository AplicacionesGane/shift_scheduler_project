import { WorkScheduleUseCases } from '@application/workschedule/workschedule.usecases';
import { Request, Response } from 'express';
import { validateWorkSchedule } from '../schemas/workScheduleSchemaValidate';

export class WorkScheduleController {
    constructor(private readonly workScheduleUseCases: WorkScheduleUseCases) { }

    public createWorkSchedule = async (req: Request, res: Response) => {
        const { success, data, error } = validateWorkSchedule(req.body);

        if (!success) {
            res.status(400).json({ message: 'Invalid shift data', error: error.format() });
            return;
        }

        try {
            const createdWorkSchedule = await this.workScheduleUseCases.assignShift(data);

            res.status(201).json({
                message: 'Work schedule created successfully',
                data: createdWorkSchedule
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: 'Error on server to create shift' })
        }
    }


    public getAllWorkSchedules = async (req: Request, res: Response) => {
        try {
            const workSchedules = await this.workScheduleUseCases.findAll();

            if (!workSchedules || workSchedules.length === 0) {
                res.status(404).json({
                    message: 'No work schedules found',
                    data: []
                });
                return;
            }

            res.status(200).json({ data: workSchedules });
        } catch (error) {
            console.error('Error retrieving work schedules:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Error retrieving work schedules'
            });
        }
    }

    public getWorkSchedulesByStoreId = async (req: Request, res: Response) => {
        const { storeId } = req.params;
        if (!storeId || typeof storeId !== 'string') {
            res.status(400).json({
                error: 'Invalid store ID',
                message: 'Valid store ID is required'
            });
            return;
        }
        try {
            const workSchedules = await this.workScheduleUseCases.findSchedulesByStoreId(storeId);
            if (!workSchedules || workSchedules.length === 0) {
                res.status(404).json({
                    message: `No work schedules found for store ${storeId}`,
                    data: []
                });
                return;
            }
            res.status(200).json(workSchedules);
        } catch (error) {
            console.error('Error retrieving work schedules by store ID:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Error retrieving work schedules by store ID'
            });
        }
    }

            /**
             
            public getWorkScheduleById = async (req: Request, res: Response) => {
                const { id } = req.params;
        
                if (!id || typeof id !== 'string') {
                    res.status(400).json({
                        error: 'Invalid ID',
                        message: 'Valid work schedule ID is required'
                    });
                    return;
                }
        
                try {
                    const workSchedule = await this.workScheduleUseCases.findById(id);
        
                    if (!workSchedule) {
                        res.status(404).json({
                            error: 'Not found',
                            message: `Work schedule with ID ${id} not found`
                        });
                        return;
                    }
        
                    res.status(200).json({
                        message: 'Work schedule retrieved successfully',
                        data: workSchedule
                    });
                } catch (error) {
                    console.error('Error retrieving work schedule:', error);
                    res.status(500).json({
                        error: 'Internal server error',
                        message: 'Error retrieving work schedule'
                    });
                }
            }
        
        
            public getWorkSchedulesByEmployee = async (req: Request, res: Response) => {
                const { document } = req.params;
        
                if (!document || typeof document !== 'string') {
                    res.status(400).json({
                        error: 'Invalid document',
                        message: 'Valid employee document is required'
                    });
                    return;
                }
        
                try {
                    const workSchedules = await this.workScheduleUseCases.findByEmployeeDocument(document);
        
                    if (!workSchedules || workSchedules.length === 0) {
                        res.status(404).json({
                            message: `No work schedules found for employee ${document}`,
                            data: []
                        });
                        return;
                    }
        
                    res.status(200).json({
                        message: 'Employee work schedules retrieved successfully',
                        data: workSchedules,
                        employee: document,
                        count: workSchedules.length
                    });
                } catch (error) {
                    console.error('Error retrieving employee work schedules:', error);
                    res.status(500).json({
                        error: 'Internal server error',
                        message: 'Error retrieving employee work schedules'
                    });
                }
            }
        
            public getWorkSchedulesByStore = async (req: Request, res: Response) => {
                const { storeId } = req.params;
        
                if (!storeId || typeof storeId !== 'string') {
                    res.status(400).json({
                        error: 'Invalid store ID',
                        message: 'Valid store ID is required'
                    });
                    return;
                }
        
                try {
                    const workSchedules = await this.workScheduleUseCases.findByStore(storeId);
        
                    if (!workSchedules || workSchedules.length === 0) {
                        res.status(404).json({
                            message: `No work schedules found for store ${storeId}`,
                            data: []
                        });
                        return;
                    }
        
                    res.status(200).json({
                        message: 'Store work schedules retrieved successfully',
                        data: workSchedules,
                        store: storeId,
                        count: workSchedules.length
                    });
                } catch (error) {
                    console.error('Error retrieving store work schedules:', error);
                    res.status(500).json({
                        error: 'Internal server error',
                        message: 'Error retrieving store work schedules'
                    });
                }
            }
        
        
            public getWorkSchedulesByDate = async (req: Request, res: Response) => {
                const { date } = req.params;
        
                if (!date || typeof date !== 'string') {
                    res.status(400).json({
                        error: 'Invalid date',
                        message: 'Valid date (YYYY-MM-DD) is required'
                    });
                    return;
                }
        
                // Validar formato de fecha
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(date)) {
                    res.status(400).json({
                        error: 'Invalid date format',
                        message: 'Date must be in YYYY-MM-DD format'
                    });
                    return;
                }
        
                try {
                    const workSchedules = await this.workScheduleUseCases.findByDate(date);
        
                    if (!workSchedules || workSchedules.length === 0) {
                        res.status(404).json({
                            message: `No work schedules found for date ${date}`,
                            data: []
                        });
                        return;
                    }
        
                    res.status(200).json({
                        message: 'Date work schedules retrieved successfully',
                        data: workSchedules,
                        date: date,
                        count: workSchedules.length
                    });
                } catch (error) {
                    console.error('Error retrieving date work schedules:', error);
                    res.status(500).json({
                        error: 'Internal server error',
                        message: 'Error retrieving date work schedules'
                    });
                }
            }
        
        
            public getWeeklySchedule = async (req: Request, res: Response) => {
                const { document, startDate } = req.params;
        
                if (!document || !startDate) {
                    res.status(400).json({
                        error: 'Missing parameters',
                        message: 'Employee document and start date are required'
                    });
                    return;
                }
        
                // Validar formato de fecha
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(startDate)) {
                    res.status(400).json({
                        error: 'Invalid date format',
                        message: 'Start date must be in YYYY-MM-DD format'
                    });
                    return;
                }
        
                try {
                    const weeklySchedule = await this.workScheduleUseCases.getWeeklySchedule(document, startDate);
        
                    if (!weeklySchedule || weeklySchedule.length === 0) {
                        res.status(404).json({
                            message: `No weekly schedule found for employee ${document} starting ${startDate}`,
                            data: []
                        });
                        return;
                    }
        
                    res.status(200).json({
                        message: 'Weekly schedule retrieved successfully',
                        data: weeklySchedule,
                        employee: document,
                        weekStart: startDate,
                        count: weeklySchedule.length
                    });
                } catch (error) {
                    console.error('Error retrieving weekly schedule:', error);
                    res.status(500).json({
                        error: 'Internal server error',
                        message: 'Error retrieving weekly schedule'
                    });
                }
            }
        
        
            public updateWorkScheduleStatus = async (req: Request, res: Response) => {
                const { id } = req.params;
                const { status } = req.body;
        
                if (!id || !status) {
                    res.status(400).json({
                        error: 'Missing parameters',
                        message: 'Work schedule ID and status are required'
                    });
                    return;
                }
        
                const validStatuses = ['assigned', 'completed', 'absent'];
                if (!validStatuses.includes(status)) {
                    res.status(400).json({
                        error: 'Invalid status',
                        message: `Status must be one of: ${validStatuses.join(', ')}`
                    });
                    return;
                }
        
                try {
                    const updatedWorkSchedule = await this.workScheduleUseCases.updateStatus(id, status);
        
                    if (!updatedWorkSchedule) {
                        res.status(404).json({
                            error: 'Not found',
                            message: `Work schedule with ID ${id} not found`
                        });
                        return;
                    }
        
                    res.status(200).json({
                        message: 'Work schedule status updated successfully',
                        data: updatedWorkSchedule
                    });
                } catch (error) {
                    console.error('Error updating work schedule status:', error);
                    res.status(500).json({
                        error: 'Internal server error',
                        message: 'Error updating work schedule status'
                    });
                }
            }
        
            public changeWorkScheduleShift = async (req: Request, res: Response) => {
                const { id } = req.params;
                const { shiftId } = req.body;
        
                if (!id || !shiftId) {
                    res.status(400).json({
                        error: 'Missing parameters',
                        message: 'Work schedule ID and new shift ID are required'
                    });
                    return;
                }
        
                try {
                    const updatedWorkSchedule = await this.workScheduleUseCases.changeShift(id, shiftId);
        
                    if (!updatedWorkSchedule) {
                        res.status(404).json({
                            error: 'Not found',
                            message: `Work schedule with ID ${id} not found`
                        });
                        return;
                    }
        
                    res.status(200).json({
                        message: 'Work schedule shift updated successfully',
                        data: updatedWorkSchedule
                    });
                } catch (error: any) {
                    if (error.message.includes('not found')) {
                        res.status(400).json({
                            error: 'Validation error',
                            message: error.message
                        });
                    } else {
                        console.error('Error updating work schedule shift:', error);
                        res.status(500).json({
                            error: 'Internal server error',
                            message: 'Error updating work schedule shift'
                        });
                    }
                }
            }
        
            public deleteWorkSchedule = async (req: Request, res: Response) => {
                const { id } = req.params;
        
                if (!id || typeof id !== 'string') {
                    res.status(400).json({
                        error: 'Invalid ID',
                        message: 'Valid work schedule ID is required'
                    });
                    return;
                }
        
                try {
                    const deleted = await this.workScheduleUseCases.removeAssignment(id);
        
                    if (!deleted) {
                        res.status(404).json({
                            error: 'Not found',
                            message: `Work schedule with ID ${id} not found`
                        });
                        return;
                    }
        
                    res.status(200).json({
                        message: 'Work schedule deleted successfully',
                        id: id
                    });
                } catch (error) {
                    console.error('Error deleting work schedule:', error);
                    res.status(500).json({
                        error: 'Internal server error',
                        message: 'Error deleting work schedule'
                    });
                }
            }
        
            */
}

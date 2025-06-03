import { z } from 'zod';

const workScheduleSchema = z.object({
    employee: z.string().min(1, 'Employee document is required'),
    shiftId: z.string().min(1, 'Shift ID is required'),
    storeId: z.string().min(1, 'Store ID is required'),
    year: z.number().int().min(1900, 'Year must be a valid number greater than 1900').max(2100, 'Year must be a valid number less than 2100'),
    month: z.number().int().min(1, 'Month must be between 1 and 12').max(12, 'Month must be between 1 and 12'),
    day: z.number().int().min(1, 'Day must be between 1 and 31').max(31, 'Day must be between 1 and 31'),
    status: z.enum(['assigned', 'completed', 'absent'], {
        errorMap: () => ({ message: 'Status must be one of "assigned", "completed", or "absent"' })
    })
});

export const validateWorkSchedule = (schedule: unknown) => {
    try {
        return workScheduleSchema.safeParse(schedule);
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Validation error: ${error.errors.map(e => e.message).join(", ")}`);
        }
        throw error;
    }
}
import { z } from 'zod';

const workScheduleSchema = z.object({
    employeeDocument: z.string().min(1, 'Employee document is required'),
    shiftId: z.string().min(1, 'Shift ID is required'),
    storeId: z.string().min(1, 'Store ID is required'),
    assignedDate: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Assigned date must be a valid date in YYYY-MM-DD format'
    }),
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
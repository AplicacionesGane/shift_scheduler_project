import { z } from "zod";

export const shiftSchemaValidate = z.object({
    id: z.string().optional(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    nameTurno: z.string().min(1, "Name of the shift is required"),
    description: z.string().optional(),
});

export const validateShiftEntry = (shift: unknown) => {
    try {
        return shiftSchemaValidate.safeParse(shift);
    } catch (error) {
        if (error instanceof z.ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(", ")}`);
        }
        throw error;
    }
}


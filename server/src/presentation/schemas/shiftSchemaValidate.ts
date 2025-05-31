import { z } from "zod";

export const shiftSchemaValidate = z.object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    idStore: z.string().min(1, "Store ID is required"),
    date: z.string().min(1, "Date is required")
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


import { API_SERVER_URL } from "@/utils/constants";
import axios from "axios";

interface dates {
    day: number;
    month: number;
    year: number;
}

interface AssignmentData {
    storeId: string;
    shiftId: string;
    employeeDocument: string;
    dates: dates[];
}

interface AssignmentResult {
    success: boolean;
    date: string;
    error?: string;
    data?: unknown;
}

interface AssignmentSummary {
    total: number;
    successful: number;
    failed: number;
    successfulDates: string[];
    failedDates: { date: string; error: string }[];
}

export async function assignScheduleService(info: AssignmentData): Promise<AssignmentSummary> {
    const { storeId, shiftId, employeeDocument, dates } = info;
    const results: AssignmentResult[] = [];

    for (const date of dates) {
        const dateString = `${date.day}/${date.month}/${date.year}`;
        
        try {
            const response = await axios.post(`${API_SERVER_URL}/work-schedules`, {
                storeId,
                shiftId,
                employee: employeeDocument,
                status: 'assigned',
                day: date.day,
                month: date.month,
                year: date.year
            });
            
            results.push({
                success: true,
                date: dateString,
                data: response.data
            });
            
        } catch (error) {
            const errorMessage = axios.isAxiosError(error) 
                ? error.response?.data?.message || error.message 
                : 'Error desconocido';
                
            results.push({
                success: false,
                date: dateString,
                error: errorMessage
            });
        }
    }

    // Crear resumen
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    const summary: AssignmentSummary = {
        total: dates.length,
        successful: successful.length,
        failed: failed.length,
        successfulDates: successful.map(r => r.date),
        failedDates: failed.map(r => ({ date: r.date, error: r.error! }))
    };

    return summary;
}
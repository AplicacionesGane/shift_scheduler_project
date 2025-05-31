import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { StoreRepository } from '@domain/repositories/store.repository';
import { WorkScheduleValue } from '@domain/valueObjects/workschedule.value';
import { WorkSchedule } from '@domain/entities/workschedule.entity';

export interface createWorkScheduleDTO {
    employeeDocument: string; // FK a Employee
    shiftId: string;          // FK a Shift
    storeId: string;         // FK a Store
    assignedDate: string;    // YYYY-MM-DD
    status: 'assigned' | 'completed' | 'absent';
}

export class WorkScheduleUseCases {
    constructor(
        private readonly workScheduleRepo: WorkScheduleRepository,
        private readonly employeeRepo: EmployeeRepository,
        private readonly shiftRepo: ShiftRepository,
        private readonly storeRepo: StoreRepository
    ) {}

    /**
     * Crear una nueva asignación de turno
     */
    async assignShift(workScheduleData: createWorkScheduleDTO): Promise<WorkSchedule> {
        // Validar que el empleado existe
        const employee = await this.employeeRepo.findById(workScheduleData.employeeDocument);

        if (!employee) throw new Error(`Employee with document ${workScheduleData.employeeDocument} not found or not exist`);

        const shift = await this.shiftRepo.findById(workScheduleData.shiftId);
        if (!shift) throw new Error(`Shift with id ${workScheduleData.shiftId} not found`);

        // validar que la tienda existe
        const store = await this.storeRepo.findById(workScheduleData.storeId);
        if (!store) throw new Error(`Store with id ${workScheduleData.storeId} not found`);

        // Validar que no exista ya una asignación para ese empleado en esa fecha
        const existingAssignment = await this.findByEmployeeAndDate(
            workScheduleData.employeeDocument, 
            workScheduleData.assignedDate
        );

        if (existingAssignment) {
            throw new Error(`Employee ${workScheduleData.employeeDocument} already has an assignment on ${workScheduleData.assignedDate}`);
        }

        return this.workScheduleRepo.create(new WorkScheduleValue(workScheduleData));
    }

    /**
     * Obtener todas las asignaciones
     */
    async findAll(): Promise<WorkSchedule[] | null> {
        return this.workScheduleRepo.findAll();
    }

    /**
     * Obtener asignación por ID
     */
    async findById(id: string): Promise<WorkSchedule | null> {
        return this.workScheduleRepo.findById(id);
    }

    /**
     * Obtener horario de un empleado por documento
     */
    async findByEmployeeDocument(employeeDocument: string): Promise<WorkSchedule[] | null> {
        // Si el repositorio tiene método específico, usarlo
        if ('findByEmployeeDocument' in this.workScheduleRepo) {
            return (this.workScheduleRepo as any).findByEmployeeDocument(employeeDocument);
        }

        // Fallback al método genérico
        const allSchedules = await this.workScheduleRepo.findAll();
        if (!allSchedules) return null;

        const employeeSchedules = allSchedules.filter(
            schedule => schedule.employeeDocument === employeeDocument
        );

        return employeeSchedules.length > 0 ? employeeSchedules : null;
    }

    /**
     * Obtener asignación específica de un empleado en una fecha
     * TODO: Revisar si el repositorio tiene un método específico para esto
     */
    async findByEmployeeAndDate(employeeDocument: string, date: string): Promise<WorkSchedule | null> {
        // Si el repositorio tiene método específico, usarlo
        if ('findByEmployeeAndDate' in this.workScheduleRepo) {
            return (this.workScheduleRepo as any).findByEmployeeAndDate(employeeDocument, date);
        }

        // Fallback al método genérico
        const allSchedules = await this.workScheduleRepo.findAll();
        if (!allSchedules) return null;

        return allSchedules.find(
            schedule => schedule.employeeDocument === employeeDocument && schedule.assignedDate === date
        ) || null;
    }

    /**
     * Obtener todas las asignaciones por tienda
     */
    async findByStore(storeId: string): Promise<WorkSchedule[] | null> {
        // Si el repositorio tiene método específico, usarlo
        if ('findByStoreId' in this.workScheduleRepo) {
            return (this.workScheduleRepo as any).findByStoreId(storeId);
        }

        // Fallback al método genérico
        const allSchedules = await this.workScheduleRepo.findAll();
        if (!allSchedules) return null;

        const storeSchedules = allSchedules.filter(
            schedule => schedule.storeId === storeId
        );

        return storeSchedules.length > 0 ? storeSchedules : null;
    }

    /**
     * Obtener todas las asignaciones de una fecha específica
     */
    async findByDate(date: string): Promise<WorkSchedule[] | null> {
        // Si el repositorio tiene método específico, usarlo
        if ('findByDate' in this.workScheduleRepo) {
            return (this.workScheduleRepo as any).findByDate(date);
        }

        // Fallback al método genérico
        const allSchedules = await this.workScheduleRepo.findAll();
        if (!allSchedules) return null;

        const dateSchedules = allSchedules.filter(
            schedule => schedule.assignedDate === date
        );

        return dateSchedules.length > 0 ? dateSchedules : null;
    }

    /**
     * Obtener horario semanal de un empleado
     */
    async getWeeklySchedule(employeeDocument: string, weekStartDate: string): Promise<WorkSchedule[] | null> {
        // Calcular las 7 fechas de la semana
        const weekDates = this.getWeekDates(weekStartDate);
        
        const allSchedules = await this.workScheduleRepo.findAll();
        if (!allSchedules) return null;

        const weeklySchedules = allSchedules.filter(
            schedule => 
                schedule.employeeDocument === employeeDocument && 
                weekDates.includes(schedule.assignedDate)
        );

        return weeklySchedules.length > 0 ? weeklySchedules : null;
    }

    /**
     * Cambiar el estado de una asignación
     */
    async updateStatus(id: string, status: 'assigned' | 'completed' | 'absent'): Promise<WorkSchedule | null> {
        return this.workScheduleRepo.update(id, { status, updatedAt: new Date() });
    }

    /**
     * Cambiar turno de una asignación existente
     */
    async changeShift(id: string, newShiftId: string): Promise<WorkSchedule | null> {
        // Validar que el nuevo turno existe
        const shift = await this.shiftRepo.findById(newShiftId);
        if (!shift) {
            throw new Error(`Shift with id ${newShiftId} not found`);
        }

        return this.workScheduleRepo.update(id, { 
            shiftId: newShiftId, 
            updatedAt: new Date() 
        });
    }

    /**
     * Eliminar una asignación
     */
    async removeAssignment(id: string): Promise<boolean> {
        return this.workScheduleRepo.delete(id);
    }

    /**
     * Obtener resumen de asignaciones por tienda en una fecha
     */
    async getStoreScheduleSummary(storeId: string, date: string): Promise<WorkSchedule[] | null> {
        const allSchedules = await this.workScheduleRepo.findAll();
        if (!allSchedules) return null;

        const storeSchedules = allSchedules.filter(
            schedule => schedule.storeId === storeId && schedule.assignedDate === date
        );

        return storeSchedules.length > 0 ? storeSchedules : null;
    }

    /**
     * Utility: Generar las fechas de una semana completa
     */
    private getWeekDates(startDate: string): string[] {
        const dates: string[] = [];
        const start = new Date(startDate);
        
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);
            dates.push(currentDate.toISOString().split('T')[0]); // YYYY-MM-DD format
        }
        
        return dates;
    }

    /**
     * Validar formato de fecha
     */
    private isValidDateFormat(date: string): boolean {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(date) && !isNaN(Date.parse(date));
    }
}

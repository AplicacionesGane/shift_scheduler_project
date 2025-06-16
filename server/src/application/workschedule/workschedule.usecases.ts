import { WorkScheduleValue } from '@domain/valueObjects/workschedule.value';
import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { StoreRepository } from '@domain/repositories/store.repository';
import { WorkSchedule } from '@domain/entities/workschedule.entity';

export class WorkScheduleUseCases {
  constructor(
    private readonly workScheduleRepo: WorkScheduleRepository,
    private readonly employeeRepo: EmployeeRepository,
    private readonly shiftRepo: ShiftRepository,
    private readonly storeRepo: StoreRepository
  ) { }

  createNewSchedule = async (newSchedule: WorkSchedule): Promise<WorkSchedule> => {

    // 1. valida que el empleado exista
    const employee = await this.employeeRepo.findEmployeeById(newSchedule.employee);
    if (!employee) throw new Error(`Employee with document ${newSchedule.employee} not found or not exist`);

    // 2. valida que no exista una asignación previa para el empleado en la fecha especificada
    const existingAssignment = await this.workScheduleRepo.findByDocumentAndDate(
      newSchedule.employee, newSchedule.year, newSchedule.month, newSchedule.day
    );
    if (existingAssignment) throw new Error(`Employee ${newSchedule.employee} already has an assignment on ${newSchedule.year}-${newSchedule.month}-${newSchedule.day}`)

    // 3. valida que el turno exista
    const shift = await this.shiftRepo.findShiftById(newSchedule.shiftId);
    if (!shift) throw new Error(`Shift with id ${newSchedule.shiftId} not found`);

    // 4. valida que la tienda exista - PDV
    const store = await this.storeRepo.findStoreById(newSchedule.storeId);
    if (!store) throw new Error(`Store with id ${newSchedule.storeId} not found`);

    // 5. Intancia el objeto WorkScheduleValue con los datos validados
    const workSchedule = new WorkScheduleValue(newSchedule);

    // 6. Este se guardará en la base de datos cuando sea implementado el repositorio
    const createdWorkSchedule = await this.workScheduleRepo.save(workSchedule);

    if (!createdWorkSchedule) throw new Error('Error creating work schedule');

    // 7. Retorna el objeto creado como lo espera el repositorio
    return createdWorkSchedule;
  }

  findWorkScheduleByDocumentAndDate = async (document: string, year: number, month: number, day: number) => {
    const schedule = await this.workScheduleRepo.findByDocumentAndDate(document, year, month, day);
    if (!schedule) throw new Error(`No work schedule found for employee with document ${document} on date ${new Date(year, month - 1, day).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })}`);
    return schedule;
  }

  findByStoreYearMonth = async (storeId: string, year: number, month: number): Promise<WorkSchedule[] | null> => {
    try {
      const workSchedules = await this.workScheduleRepo.findByStoreYearMonth(storeId, year, month);
      if (!workSchedules || workSchedules.length === 0) {
        return []
      }
      return workSchedules;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`Error retrieving work schedules for store with id ${storeId}: ${error.message}`);
      }
      return [];
    }
  }

  findWorkScheduleByShiftId = async (shiftId: string): Promise<boolean> => {
    const workSchedule = await this.workScheduleRepo.findWorkScheduleByshiftId(shiftId);
    if (!workSchedule) throw new Error(`No work schedule found for shift with id ${shiftId}`);
    return workSchedule;
  }

  findAllWorkSchedules = async (): Promise<WorkSchedule[] | null> => {
    const workSchedules = await this.workScheduleRepo.findAll();
    if (!workSchedules || workSchedules.length === 0) throw new Error('No work schedules found');
    return workSchedules;
  }

}
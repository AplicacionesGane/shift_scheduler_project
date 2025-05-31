import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';
import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { WorkScheduleValue, WorkScheduleValueDTO } from '@domain/valueObjects/workschedule.value';
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


  // TODO creacion y asinación de turnos a empleados

  createNewSchedule = async (newSchedule: WorkScheduleValueDTO): Promise<WorkSchedule> => {

    const employee = await this.employeeRepo.findEmployeeById(newSchedule.employee);
    if (!employee) throw new Error(`Employee with document ${newSchedule.employee} not found or not exist`);

    const shift = await this.shiftRepo.findById(newSchedule.shiftId);
    if (!shift) throw new Error(`Shift with id ${newSchedule.shiftId} not found`);

    const store = await this.storeRepo.findById(newSchedule.storeId);
    if (!store) throw new Error(`Store with id ${newSchedule.storeId} not found`);

    const existingAssignment = await this.workScheduleRepo.findScheduleByDocumentAndDate(newSchedule.employee, newSchedule.assignedDate)

    if (existingAssignment) throw new Error(`Employee ${newSchedule.employee} already has an assignment on ${newSchedule.assignedDate}`);

    const workSchedule = new WorkScheduleValue(newSchedule);

    const createdWorkSchedule = await this.workScheduleRepo.createNewWorkSchedule(workSchedule);

    if (!createdWorkSchedule) throw new Error('Error creating work schedule');
    
    return createdWorkSchedule;
  }

  findWorkScheduleByDocumentAndDate = async (document: string, newDate: string) => {
    const schedule = await this.workScheduleRepo.findScheduleByDocumentAndDate(document, newDate);
    if (!schedule) throw new Error(`No work schedule found for employee with document ${document} on date ${newDate}`);
    return schedule;
  }

  findWordkSchedulesByStoreId = async (storeId: string): Promise<WorkSchedule[] | null> => {
    const workSchedules = await this.workScheduleRepo.findSchedulesByStoreId(storeId);
    if (!workSchedules || workSchedules.length === 0) throw new Error(`No work schedules found for store with id ${storeId}`);
    return workSchedules;
  }

  findAllWorkSchedules = async (): Promise<WorkSchedule[] | null> => {
    const workSchedules = await this.workScheduleRepo.findAllWorksSchedules();
    if (!workSchedules || workSchedules.length === 0) throw new Error('No work schedules found');
    return workSchedules;
  }

}
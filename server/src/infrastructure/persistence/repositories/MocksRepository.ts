import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { StoreRepository } from '@domain/repositories/store.repository';
import { WorkScheduleRepository } from '@domain/repositories/workschedule.repository';

import { EmployeeEntity } from '@domain/entities/employe.entity';
import { StoreEntity } from '@domain/entities/store.entity';
import { WorkSchedule } from '@domain/entities/workschedule.entity';
import { WorkScheduleValue } from '@domain/valueObjects/workschedule.value';

import EmployesMocks from '@data/employees.json';
import StoresMocks from '@data/stores.json';

export class MockEmployeeRepository implements EmployeeRepository {

    findAll = async (): Promise<EmployeeEntity[] | null> => {
        try {
            const employees: any = EmployesMocks.map((emp) => {
                return {
                    documento: emp.documento,
                    nombres: emp.nombres,
                    cargo: emp.cargo,
                    ccosto: emp.ccosto,
                    grpvtasCode: emp.grpvtasCode,
                    nameCargo: emp.nameCargo
                };
            });

            return Promise.resolve(employees);
        } catch (error) {
            console.error(error);
            return Promise.resolve(null);
        }
    }

    findById(document: string): Promise<EmployeeEntity | null> {
        return new Promise((resolve) => {
            const employee = EmployesMocks.find(emp => emp.documento === document);
            if (employee) {
                const mappedEmployee: EmployeeEntity = {
                    documento: employee.documento,
                    nombres: employee.nombres,
                    cargo: employee.cargo,
                    ccosto: employee.ccosto ?? 'undefined',
                    grpvtasCode: employee.grpvtasCode,
                    nameCargo: employee.nameCargo
                };
                resolve(mappedEmployee);
            } else {
                resolve(null);
            }
        });
    }

    findByCargo(cargo: string): Promise<EmployeeEntity[] | null> {
        return new Promise((resolve) => {
            const employees = EmployesMocks.filter(emp => emp.cargo === cargo).map(emp => ({
                documento: emp.documento,
                nombres: emp.nombres,
                cargo: emp.cargo,
                ccosto: emp.ccosto ?? 'undefined',
                grpvtasCode: emp.grpvtasCode,
                nameCargo: emp.nameCargo
            }));
            resolve(employees.length > 0 ? employees : null);
        });
    }

}

export class MockStoreRepository implements StoreRepository {

    findAll(): Promise<StoreEntity[] | null> {
        return new Promise((resolve) => {
            const stores: any[] = StoresMocks.map((store) => {
                return {
                    empresa: store.empresa,
                    ccosto: store.ccosto,
                    sucursal: store.sucursal,
                    nombre: store.nombre,
                    direccion: store.direccion,
                    tipo: store.tipo,
                    dispositivo: store.dispositivo,
                    supervisor: store.supervisor,
                    canal: store.canal,
                    categoria: store.categoria,
                    horaEntrada: store.horaEntrada ?? null,
                    horaSalida: store.horaSalida ?? null,
                    horaEntradaFes: store.horaEntradaFes ?? null,
                    horaSalidaFes: store.horaSalidaFes ?? null,
                    subzona: store.subzona ?? null,
                    celula: store.celula ?? null,
                    horasOrdinarias: store.horasOrdinarias ?? null,
                    horasFestivas: store.horasFestivas ?? null,
                    estado: store.estado ?? null
                };
            });
            resolve(stores.length > 0 ? stores : null);
        });
    }
}

export class MockWorkScheduleRepository implements WorkScheduleRepository {
    private workSchedules: WorkSchedule[] = [];

    async create(workSchedule: Omit<WorkSchedule, "id" | "createdAt" | "updatedAt">): Promise<WorkSchedule> {
        try {
            const newWorkSchedule = new WorkScheduleValue(workSchedule);
            this.workSchedules.push(newWorkSchedule);
            return Promise.resolve(newWorkSchedule);
        } catch (error) {
            console.error('Error creating work schedule:', error);
            throw new Error('Error creating work schedule');
        }
    }

    async findById(id: string): Promise<WorkSchedule | null> {
        return new Promise((resolve) => {
            const workSchedule = this.workSchedules.find(ws => ws.id === id);
            resolve(workSchedule || null);
        });
    }

    async findAll(): Promise<WorkSchedule[] | null> {
        return new Promise((resolve) => {
            const sortedSchedules = this.workSchedules.sort((a, b) => 
                a.assignedDate.localeCompare(b.assignedDate)
            );
            resolve(sortedSchedules.length > 0 ? sortedSchedules : null);
        });
    }

    async update(id: string, workSchedule: Partial<WorkSchedule>): Promise<WorkSchedule | null> {
        return new Promise((resolve) => {
            const index = this.workSchedules.findIndex(ws => ws.id === id);
            if (index !== -1) {
                this.workSchedules[index] = { 
                    ...this.workSchedules[index], 
                    ...workSchedule,
                    updatedAt: new Date()
                };
                resolve(this.workSchedules[index]);
            } else {
                resolve(null);
            }
        });
    }

    async delete(id: string): Promise<boolean> {
        return new Promise((resolve) => {
            const index = this.workSchedules.findIndex(ws => ws.id === id);
            if (index !== -1) {
                this.workSchedules.splice(index, 1);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    // Métodos específicos para testing
    async findByEmployeeDocument(employeeDocument: string): Promise<WorkSchedule[] | null> {
        return new Promise((resolve) => {
            const employeeSchedules = this.workSchedules.filter(
                ws => ws.employeeDocument === employeeDocument
            ).sort((a, b) => a.assignedDate.localeCompare(b.assignedDate));
            resolve(employeeSchedules.length > 0 ? employeeSchedules : null);
        });
    }

    async findByEmployeeAndDate(employeeDocument: string, date: string): Promise<WorkSchedule | null> {
        return new Promise((resolve) => {
            const workSchedule = this.workSchedules.find(
                ws => ws.employeeDocument === employeeDocument && ws.assignedDate === date
            );
            resolve(workSchedule || null);
        });
    }

    async findByStoreId(storeId: string): Promise<WorkSchedule[] | null> {
        return new Promise((resolve) => {
            const storeSchedules = this.workSchedules.filter(
                ws => ws.storeId === storeId
            ).sort((a, b) => a.assignedDate.localeCompare(b.assignedDate));
            resolve(storeSchedules.length > 0 ? storeSchedules : null);
        });
    }

    async findByDate(date: string): Promise<WorkSchedule[] | null> {
        return new Promise((resolve) => {
            const dateSchedules = this.workSchedules.filter(
                ws => ws.assignedDate === date
            );
            resolve(dateSchedules.length > 0 ? dateSchedules : null);
        });
    }

    // Utility para limpiar datos en tests
    clearAll(): void {
        this.workSchedules = [];
    }

    // Utility para obtener el count actual
    getCount(): number {
        return this.workSchedules.length;
    }
}

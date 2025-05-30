import { EmployeeRepository } from '@domain/repositories/employee.repository';
import { StoreRepository } from '@domain/repositories/store.repository';

import { EmployeeEntity } from '@domain/entities/employe.entity';
import { StoreEntity } from '@domain/entities/store.entity';

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

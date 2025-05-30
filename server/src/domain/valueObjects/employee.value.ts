import type { EmployeeEntity } from '@domain/entities/employe.entity';

export class EmployeeValue implements EmployeeEntity {
    readonly documento: string;
    readonly nombres: string;
    readonly grpvtasCode: string;
    readonly cargo: string;
    readonly nameCargo: string;
    readonly ccosto: string;

    constructor(employee: EmployeeEntity) {
        this.documento = employee.documento;
        this.nombres = employee.nombres;
        this.grpvtasCode = employee.grpvtasCode;
        this.cargo = employee.cargo;
        this.nameCargo = employee.nameCargo;
        this.ccosto = employee.ccosto;
    }
}
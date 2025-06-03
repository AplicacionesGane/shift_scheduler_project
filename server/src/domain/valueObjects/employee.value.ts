import type { EmployeeEntity } from '@domain/entities/employe.entity';

export interface EmployeeValueDTO {
    documento: string;
    nombres: string;
    nameCargo: string;
}

export class EmployeeValue implements EmployeeEntity {
    readonly documento: string;
    readonly nombres: string;
    readonly nameCargo: string;

    constructor(dto: EmployeeValueDTO) {
        // Validaciones opcionales
        if (!dto.documento?.trim()) {
            throw new Error('Documento es requerido');
        }
        if (!dto.nombres?.trim()) {
            throw new Error('Nombres son requeridos');
        }

        this.documento = dto.documento.trim();
        this.nombres = dto.nombres.trim();
        this.nameCargo = dto.nameCargo?.trim() || '';
    }

    // Método factory opcional para mayor claridad
    static create(dto: EmployeeValueDTO): EmployeeValue {
        return new EmployeeValue(dto);
    }
}
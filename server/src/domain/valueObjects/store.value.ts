import type { StoreEntity } from '@domain/entities/store.entity';

export interface StoreValueDTO {
    empresa: string;
    sucursal: string;
    nombre: string;
    direccion: string;
    estado?: 'A' | 'I'
}

export class StoreValue implements StoreEntity {
    readonly empresa: string;
    readonly sucursal: string;
    readonly nombre: string;
    readonly direccion: string;
    readonly estado: string

    constructor(dto: StoreValueDTO) {
        // Validaciones opcionales
        if (!dto.sucursal?.trim()) {
            throw new Error('Sucursal es requerida');
        }
        if (!dto.nombre?.trim()) {
            throw new Error('Nombre es requerido');
        }
        if (!dto.direccion?.trim()) {
            throw new Error('Dirección es requerida');
        }
        if (!dto.estado) {
            throw new Error('Estado es requerido');
        }

        this.empresa = dto.empresa.trim();
        this.sucursal = dto.sucursal.trim();
        this.nombre = dto.nombre.trim();
        this.direccion = dto.direccion.trim();
        this.estado = dto.estado;
    }

    // Método factory opcional para mayor claridad
    static create(dto: StoreValueDTO): StoreValue {
        return new StoreValue(dto);
    }

}
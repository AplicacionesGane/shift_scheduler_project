import type { VendedorEntity } from '@domain/entities/Vendedor';

// Repository de solo lectura para empleados que vienen del sistema de ventas (ETL)
export interface VendedorRepository {
    findById(document: string): Promise<VendedorEntity | null>;
    findAll(): Promise<VendedorEntity[]>;
    findByCargo(cargo: string): Promise<VendedorEntity[]>;
}
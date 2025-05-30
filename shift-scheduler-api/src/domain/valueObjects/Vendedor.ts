import type { VendedorEntity } from '@domain/entities/Vendedor';

export class Vendedor implements VendedorEntity {
    readonly documento: string;
    readonly nombres: string;
    readonly grpvtasCode: string;
    readonly cargo: string;
    readonly nameCargo: string;
    readonly ccosto: string;

    constructor(vendedor: Vendedor) {
        this.documento = vendedor.documento;
        this.nombres = vendedor.nombres;
        this.grpvtasCode = vendedor.grpvtasCode;
        this.cargo = vendedor.cargo;
        this.nameCargo = vendedor.nameCargo;
        this.ccosto = vendedor.ccosto;
    }
}
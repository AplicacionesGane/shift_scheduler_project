import { VendedorRepository } from '@domain/repositories/VendedorRepository';
import { VendedorEntity } from '@domain/entities/Vendedor';

export class VendedorUseCase {
    constructor(private readonly vendedorRepository: VendedorRepository) {}
    
    async getVendedorByDocument(document: string): Promise<VendedorEntity | null> {
        if (!document || document.trim() === '') {
            throw new Error('El documento es requerido');
        }
        return await this.vendedorRepository.findById(document.trim());
    }

    async getAllVendedores(): Promise<VendedorEntity[]> {
        return await this.vendedorRepository.findAll();
    }

    async getVendedoresByCargo(cargo: string): Promise<VendedorEntity[]> {
        if (!cargo || cargo.trim() === '') {
            throw new Error('El cargo es requerido');
        }
        return await this.vendedorRepository.findByCargo(cargo.trim());
    }
}
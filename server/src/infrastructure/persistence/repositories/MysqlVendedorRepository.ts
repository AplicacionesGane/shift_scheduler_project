import { VendedorModel } from '@infrastructure/persistence/models/VendedorModel'
import { VendedorUseCase } from '@/application/VendedorUseCase';
import { VendedorEntity } from '@domain/entities/Vendedor';

export class MysqlVendedorRepository implements VendedorUseCase {
    getVendedorByDocument(document: string): Promise<VendedorEntity | null> {
        throw new Error('Method not implemented.');
    }
    getAllVendedores(): Promise<VendedorEntity[]> {
        throw new Error('Method not implemented.');
    }
    getVendedoresByCargo(cargo: string): Promise<VendedorEntity[]> {
        throw new Error('Method not implemented.');
    }

}


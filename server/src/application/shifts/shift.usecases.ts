import { StoreRepository } from '@/domain/repositories/store.repository';
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { ShiftValue } from '@/domain/valueObjects/shift.value';
import { Shift } from '@domain/entities/shift.entity';

export interface CreateShiftDTO{
    startTime: string; 
    endTime: string;
    idStore: string; 
    date: string; 
}

export class ShiftUseCases {
    constructor(
        private readonly shiftRepo: ShiftRepository,
        private readonly storeRepo: StoreRepository
    ) {}

    async execute(shiftData: CreateShiftDTO): Promise<Shift> {
        // valida que la tienda existe ANTES de crear el turno
        if (shiftData.idStore) {
            const store = await this.storeRepo.findById(shiftData.idStore);
            if (!store) {
                throw new Error(`Store with ID ${shiftData.idStore} does not exist`);
            }
        }
        // Crear el ShiftValue ya validado
        const shift = new ShiftValue(shiftData);
        return await this.shiftRepo.save(shift);
    }

    async findById(id: string): Promise<Shift | null> {
        return this.shiftRepo.findById(id);
    }

    async findAll(): Promise<Shift[] | null> {
        return this.shiftRepo.findAll();
    }
}
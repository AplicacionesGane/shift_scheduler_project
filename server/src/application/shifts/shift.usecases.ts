import { ShiftValue, type ShiftDTO } from '@/domain/valueObjects/shift.value';
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { Shift } from '@domain/entities/shift.entity';

export class ShiftUseCases {
    constructor(private readonly shiftRepo: ShiftRepository,) { }

    async save(shiftData: ShiftDTO): Promise<Shift> {
        return await this.shiftRepo.save(new ShiftValue(shiftData));
    }

    async findById(id: string): Promise<Shift | null> {
        return this.shiftRepo.findById(id);
    }

    async findAll(): Promise<Shift[] | null> {
        return this.shiftRepo.findAll();
    }
}
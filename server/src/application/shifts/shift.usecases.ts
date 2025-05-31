import { ShiftRepository } from '@domain/repositories/shift.repository';
import { Shift } from '@domain/entities/shift.entity';

export class ShiftUseCases {
    constructor(private readonly shiftRepo: ShiftRepository) {}

    async create(shift: Shift): Promise<Shift> {
        return this.shiftRepo.create(shift);
    }

    async findById(id: string): Promise<Shift | null> {
        return this.shiftRepo.findById(id);
    }

    async findAll(): Promise<Shift[] | null> {
        return this.shiftRepo.findAll();
    }

    // async update(id: string, shift: Partial<Shift>): Promise<Shift | null> {
    //     return this.shiftRepo.update(id, shift);
    // }

    // async delete(id: string): Promise<boolean> {
    //     return this.shiftRepo.delete(id);
    // }
}
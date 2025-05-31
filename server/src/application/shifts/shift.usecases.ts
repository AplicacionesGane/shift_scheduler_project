
import { ShiftRepository } from '@domain/repositories/shift.repository';
import { ShiftValue } from '@/domain/valueObjects/shift.value';
import { Shift } from '@domain/entities/shift.entity';

export interface CreateShiftDTO {
    startTime: string;
    endTime: string;
    date: string;
    nameTurno: string;
    description?: string;
}

export class ShiftUseCases {
    constructor(private readonly shiftRepo: ShiftRepository,) { }

    async execute(shiftData: CreateShiftDTO): Promise<Shift> {
        return await this.shiftRepo.create(new ShiftValue(shiftData));
    }

    async findById(id: string): Promise<Shift | null> {
        return this.shiftRepo.findById(id);
    }

    async findAll(): Promise<Shift[] | null> {
        return this.shiftRepo.findAll();
    }
}
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ShiftDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    startTime: string;

    @IsString()
    @IsNotEmpty()
    endTime: string;

    @IsString()
    @IsOptional()
    storeId?: string;
}
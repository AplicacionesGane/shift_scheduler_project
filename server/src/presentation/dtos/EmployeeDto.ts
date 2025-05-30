import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class EmployeeDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    role?: string;
}
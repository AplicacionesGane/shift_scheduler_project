import { IsString, IsNotEmpty } from 'class-validator';

export class StoreDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string;
}
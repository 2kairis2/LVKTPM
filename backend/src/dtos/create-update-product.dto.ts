import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';
import { IsAfterToday } from './custom';

export class CreateUpdateProductDto {
    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsString()
    desc: string;

    @IsString()
    content: string;

    @Transform((data) => Number(data.value))
    @IsNumber()
    @IsPositive()
    price: number;

    @Transform((data) => new Date(data.value))
    @IsDate()
    @IsAfterToday()
    exp: Date;

    @Transform((data) => Number(data.value))
    @IsEnum([0, 1, 2, 3, 4, 5])
    type: number;

    @Transform((data) => Number(data.value))
    @IsEnum([0, 1, 2, 3, 4, 5])
    category: number;

    @Transform((data) => Number(data.value))
    @IsInt()
    weight: number;

    @IsArray()
    images: string[];
}

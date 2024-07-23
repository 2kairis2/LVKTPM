import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsString()
    desc: string;

    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    sale: number;

    @IsNotEmpty()
    images: Array<string>;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    expired: number;

    @IsOptional()
    @IsNumber()
    weight: number;
}

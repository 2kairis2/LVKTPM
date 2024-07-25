import {
    ArrayNotEmpty,
    IsArray,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';

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

    @IsArray()
    @ArrayNotEmpty()
    images: Array<string>;

    @IsNotEmpty()
    @IsMongoId()
    category: string;

    @IsNotEmpty()
    @IsMongoId()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    expired: number;

    @IsOptional()
    @IsNumber()
    weight: number;
}

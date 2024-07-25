import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { StatusProduct } from '~/types';

export class UpdateProductDto extends CreateProductDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    desc: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    sale: number;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    images: Array<string>;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    category: string;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    type: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    expired: number;

    @IsOptional()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsEnum(StatusProduct)
    status: StatusProduct;

    @IsOptional()
    @IsMongoId()
    discount: string;
}

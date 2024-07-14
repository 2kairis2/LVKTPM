import { IsDate, IsEnum, IsInt, IsPositive, IsString } from 'class-validator';
import { IsAfterToday } from '~/dtos/custom';
import { FeatureProduct, TypeProduct } from '~/types';

export class UpdateProductDto {
    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsString()
    desc: string;

    @IsString()
    content: string;

    @IsInt()
    @IsPositive()
    price: number;

    @IsDate()
    @IsAfterToday()
    exp: Date;

    @IsEnum(TypeProduct)
    type: number;

    @IsEnum(FeatureProduct)
    feature: number;

    @IsInt()
    weight: number;
}

import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';
import { StatusInventoryReceipt } from '~/types';

export class CreateInventoryReceiptDto {
    @IsOptional()
    @IsString()
    note: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ItemInventoryDto)
    products: Array<ItemInventoryDto>;

    @IsNotEmpty()
    @IsString()
    supplier: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    total_price: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    total_quantity: number;

    @IsOptional()
    @IsNumber()
    @IsEnum(StatusInventoryReceipt)
    status: string;
}

class ItemInventoryDto {
    @IsNotEmpty()
    @IsString()
    product: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNotEmpty()
    @IsDateString()
    producedAt: Date;
}

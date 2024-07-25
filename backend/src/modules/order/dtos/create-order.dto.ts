import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { PaymentMethod } from '~/types';

class Item {
    @IsNotEmpty()
    @IsMongoId()
    product: string;
}

export class CreateOrderDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Item)
    items: Array<Item>;

    @IsNotEmpty()
    @IsString()
    shipping_address: string;

    @IsNotEmpty()
    @IsEnum(PaymentMethod)
    payment_method: number;

    @IsOptional()
    @IsString()
    payment_info: string;

    @IsOptional()
    @IsString()
    note: string;
}

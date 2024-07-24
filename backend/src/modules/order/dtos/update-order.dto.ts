import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusOrder } from '~/types';

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsEnum(StatusOrder)
    status: number;

    @IsOptional()
    @IsString()
    note: string;

    @IsOptional()
    @IsString()
    payment_info: string;

    @IsOptional()
    @IsString()
    shipping_address: string;
}

import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { EBankCode } from '~/types';

export class CreatePaymentVNPDto {
    @IsNotEmpty()
    @IsEnum(EBankCode)
    bankCode: string;

    @IsOptional()
    @IsString()
    language: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsNotEmpty()
    @IsMongoId()
    orderId: string;
}

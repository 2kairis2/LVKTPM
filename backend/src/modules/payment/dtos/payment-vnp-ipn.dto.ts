import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { EBankCode } from '~/types';

export class PaymentVNPIpnDto {
    @IsNotEmpty()
    @IsString()
    vnp_SecureHash: string;

    @IsNotEmpty()
    @IsString()
    vnp_TxnRef: string;

    @IsNotEmpty()
    @IsNumberString()
    vnp_ResponseCode: string;

    @IsNotEmpty()
    @IsNumberString()
    vnp_Amount: string;

    @IsNotEmpty()
    @IsString()
    vnp_BankTranNo: string;

    @IsNotEmpty()
    @IsEnum(EBankCode)
    vnp_BankCode: string;

    @IsNotEmpty()
    @IsDateString()
    vnp_PayDate: string;
}

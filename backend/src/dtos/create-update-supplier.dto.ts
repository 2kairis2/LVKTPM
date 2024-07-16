import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUpdateSupplierDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

import {
    IsDateString,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';
import { EGender } from '~/types';

export class UpdateUserDto {
    @IsOptional()
    @IsMongoId()
    role: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    fullname: string;

    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @IsOptional()
    @IsNumber()
    @IsEnum(EGender)
    gender: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    birthday: Date;

    @IsOptional()
    @IsMongoId()
    avatar: string;
}

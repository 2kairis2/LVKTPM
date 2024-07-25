import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IPermission } from '~/types';

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    desc: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(IPermission, { each: true })
    permissions: Array<number>;
}

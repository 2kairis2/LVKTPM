import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IPermission } from '~/types';

export class CreateUpdateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    desc: string;

    @IsNotEmpty()
    @IsEnum(IPermission, { each: true })
    permissions: number[];
}

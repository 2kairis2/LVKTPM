import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateIf,
} from 'class-validator';
import { IsAfterDay, IsAfterToday } from '~/dtos/custom';
import { ETypeDiscount } from '~/types';

export class CreateDiscountDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsEnum(ETypeDiscount)
    type: number;

    @IsOptional()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsNumber()
    value: number;

    @IsNotEmpty()
    @IsDateString()
    @IsAfterToday()
    startAt: Date;

    @IsNotEmpty()
    @IsDateString()
    @IsAfterDay('startAt')
    endAt: Date;

    @ValidateIf((o) => o.type === ETypeDiscount.PERCENT)
    @Min(0)
    @Max(100)
    get valueConstraints() {
        return this.value;
    }
}

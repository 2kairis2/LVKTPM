import { Equals, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateDiscountDto } from './create-discount.dto';
import { EStatusDiscount } from '~/types';

export class UpdateDiscountDto extends CreateDiscountDto {
    @IsOptional()
    @IsNotEmpty()
    @Equals(EStatusDiscount.CANCEL)
    status: number;
}

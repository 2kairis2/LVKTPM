import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';

export class CreateProductDetailDto {
    @IsOptional()
    @IsString()
    note?: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    total_price: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    total_quantity: number;

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => Item)
    products: Array<Item>;

    @IsNotEmpty()
    @IsDateString()
    producedAt: Date;
}

class Item {
    @IsNotEmpty()
    @IsMongoId()
    product: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;
}

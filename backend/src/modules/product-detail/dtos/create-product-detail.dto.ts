import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

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

    @IsNotEmpty()
    products: Array<{
        product: string;
        quantity: number;
    }>;

    @IsNotEmpty()
    @IsDateString()
    producedAt: Date;
}

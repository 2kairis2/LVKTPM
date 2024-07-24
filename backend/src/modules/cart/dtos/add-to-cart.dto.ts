import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';

class ItemCart {
    @IsNotEmpty()
    @IsString()
    product: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;
}

export class AddToCartDto {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ItemCart)
    products: Array<ItemCart>;
}

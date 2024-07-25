import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';

class ItemCart {
    @IsNotEmpty()
    @IsMongoId()
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

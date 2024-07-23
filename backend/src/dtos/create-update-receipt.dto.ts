import { IsNotEmpty, Min, ValidateNested } from 'class-validator';

export class CreateUpdateReceiptDto {
    @IsNotEmpty()
    @ValidateNested()
    items: Array<ItemsDto>;

    @IsNotEmpty()
    supplier: string;
}

class ItemsDto {
    @IsNotEmpty()
    product: string;

    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @IsNotEmpty()
    @Min(1)
    price: number;
}

import { IsNotEmpty } from 'class-validator';
import { CreateProductDetailDto } from './create-product-detail.dto';

export class UpdateProductDetailDto extends CreateProductDetailDto {
    @IsNotEmpty()
    id: string;
}

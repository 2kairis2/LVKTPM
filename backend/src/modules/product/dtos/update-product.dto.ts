import { IsEnum } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { StatusProduct } from '~/types';

export class UpdateProductDto extends CreateProductDto {
    @IsEnum(StatusProduct)
    status: StatusProduct;
}

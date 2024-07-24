import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDetailDto {
    @IsNotEmpty()
    @IsString()
    note: string;
}

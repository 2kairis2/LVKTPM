import { IsNotEmpty, IsString } from 'class-validator';
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends CreateImageDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

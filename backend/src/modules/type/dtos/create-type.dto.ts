import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTypeDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    desc: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    image: string;
}

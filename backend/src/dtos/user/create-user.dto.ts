import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(6, 20)
    password: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 50)
    fullname: string;
}

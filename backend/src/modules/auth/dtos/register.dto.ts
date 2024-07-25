import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(6)
    fullname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

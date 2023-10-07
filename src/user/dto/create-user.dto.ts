import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 1,
    minLowercase: 0,
  })
  password: string;
  @IsString()
  job: string;
}

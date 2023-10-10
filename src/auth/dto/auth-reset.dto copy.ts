import { IsJWT, IsString, MinLength } from 'class-validator';
import { AuthLoginDto } from './auth-login.dto';

export class AuthResetDto extends AuthLoginDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsJWT()
  token: string;
}

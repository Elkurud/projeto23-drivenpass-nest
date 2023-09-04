import { IsNotEmpty, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}

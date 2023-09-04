import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/sign-up")
  signUp(@Body() SignUpDto: SignUpDto) {
    return this.userService.signUp(SignUpDto);
  }

  @Post("/sign-in")
  SignIn(@Body() SignInDto: SignInDto) {
    return this.userService.signIn(SignInDto);
  }

}

import { ConflictException, Injectable, NotFoundException, Scope, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from "bcrypt";
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {

  private EXPIRATION_TIME = "7 days";
  private ISSUER = "Driven";
  private AUDIENCE = "user";

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UserRepository) { }

  async signUp(userDto: SignUpDto) {
    const { username } = userDto;
    const user = await this.usersRepository.getUserByUsername(username);
    if (user) throw new ConflictException("Username already in use.");

    return await this.usersRepository.create(userDto);
  }

  async getById(id: number) {
    const user = await this.usersRepository.getById(id);
    if (!user) throw new NotFoundException("User not found!");

    return user;
  }

  async getUserByUsername(username: string) {
    return await this.usersRepository.getUserByUsername(username);
  }


  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.getUserByUsername(username);
    if (!user) throw new UnauthorizedException("Email or password not valid.");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException("Email or password not valid.");

    return this.createToken(user);

  }


  createToken(user: User) {
    const { id, username } = user;

    const token = this.jwtService.sign({ username }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: String(id),
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    })

    return { token };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: this.AUDIENCE,
      issuer: this.ISSUER
    });

    return data;
  }


}

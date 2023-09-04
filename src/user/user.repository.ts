import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UserRepository {

  private SALT = 10;
  constructor(private readonly prisma: PrismaService) { }

  create(userDto: SignUpDto) {
    return this.prisma.user.create({
      data: {
        ...userDto,
        password: bcrypt.hashSync(userDto.password, this.SALT)
      }
    })
  }

  getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }
  getUserByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: { username }
    })
  }
}

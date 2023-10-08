import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto) {
    const exist = await this.prisma.user.findFirst({
      where: {
        email: userDto.email,
      },
    });

    if (exist) {
      return `Usuário já criado com o email ${userDto.email}`;
    }

    const users = await this.prisma.user.create({
      data: userDto,
    });

    return users;
  }

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(data: UpdateUserDto, id: number) {
    await this.exists(id);
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async exists(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException(`Usuário com id: ${id} não existe.`);
    }
  }
}

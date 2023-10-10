import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  async list() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) param) {
    return this.userService.findOne(param);
  }

  @Patch(':id')
  async update(@Body() body: UpdateUserDto, @Param('id', ParseIntPipe) param) {
    return this.userService.update(body, param);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) param) {
    const user = await this.userService.delete(param);
    return `Usuário ${user?.name} deletado com sucesso`;
  }
}

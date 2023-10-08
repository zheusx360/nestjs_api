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

const users = [
  {
    id: 1,
    name: 'Jonas',
    email: 'jonas@nest.com.br',
    job: 'developer',
    password: '******',
  },
  {
    id: 2,
    name: 'Maria',
    email: 'maria@nest.com.br',
    job: 'designer',
    password: '******',
  },
  {
    id: 3,
    name: 'Pedro',
    email: 'pedro@nest.com.br',
    job: 'engenheiro',
    password: '******',
  },
  {
    id: 4,
    name: 'Ana',
    email: 'ana@nest.com.br',
    job: 'analista de dados',
    password: '******',
  },
  {
    id: 5,
    name: 'Carlos',
    email: 'carlos@nest.com.br',
    job: 'gerente de projeto',
    password: '******',
  },
  {
    id: 6,
    name: 'Lúcia',
    email: 'lucia@nest.com.br',
    job: 'desenvolvedora front-end',
    password: '******',
  },
  {
    id: 7,
    name: 'Rafael',
    email: 'rafael@nest.com.br',
    job: 'desenvolvedor back-end',
    password: '******',
  },
  {
    id: 8,
    name: 'Laura',
    email: 'laura@nest.com.br',
    job: 'engenheira de software',
    password: '******',
  },
  {
    id: 9,
    name: 'Mariana',
    email: 'mariana@nest.com.br',
    job: 'analista de qualidade',
    password: '******',
  },
  {
    id: 10,
    name: 'Fernando',
    email: 'fernando@nest.com.br',
    job: 'arquiteto de software',
    password: '******',
  },
];

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

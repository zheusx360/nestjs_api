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

let users = [
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
  @Post()
  async create(@Body() body: CreateUserDto) {
    const idExist = users.find((u) => u.id === body.id);
    if (idExist) {
      return { message: `Usuário com o id: ${body.id} já existe!` };
    }
    users.push(body);
    return { status: 'success', body };
  }

  @Get()
  async read() {
    return { response: users };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) param) {
    const user = users.find((u) => u.id === param);
    return { response: user, idUser: param.id };
  }

  @Patch(':id')
  async update(@Body() body: UpdateUserDto, @Param('id', ParseIntPipe) param) {
    const index = users.findIndex(function (user) {
      return user.id === param;
    });
    if (index !== -1) {
      Object.assign(users[index], {
        id: param,
        name: body.name,
        email: body.email,
        job: body.job,
      });
      return { message: 'Alterado com sucesso', user: users[index] };
    } else {
      return `Usuário com id: ${param} não encontrado.`;
    }
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) param) {
    const idExist = users.find((u) => u.id === param.id);
    if (!idExist) {
      return `Usuário com id: ${+param.id} não encontrado.`;
    }
    const user = users.filter((u) => u.id !== +param.id);
    users = user;
    return `Usuário com id: ${+param.id} deletado com sucesso!`;
  }
}

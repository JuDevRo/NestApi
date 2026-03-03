import { Controller, Delete, Get, Param, Post, Patch, Put, Body } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {

  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      name: 'Johna Doa',
      email: 'johna.doa@example.com',
    },
    {
      id: '3',
      name: 'Pepa Doa',
      email: 'pepa.doa@example.com',
    },
  ];

  @Get()
  getUsers() {
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return {
        error: 'User not found',
      }
    }
    return user;
  }

  @Post()
  createUser(@Body() body: User) {
    const newUser = {
      ...body,
      id: `${this.users.length + 1}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  // Solo algunos campos
  // @Patch(':id')

  // Todos los campos
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: User) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1 ) {
      return {
        error: 'User not found',
      };
    };

    const currentUser = this.users[position];
    const updatedUser = {
      ...currentUser,
      ...changes,
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return {
      message: 'User deleted',
    }
  }

}

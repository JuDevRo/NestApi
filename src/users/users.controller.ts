import { Controller, Delete, Get, Param, Post, Patch, Put, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  // Solo algunos campos
  // @Patch(':id')

  // // Todos los campos
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateUserDto) {
    return this.userService.update(id, changes);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}

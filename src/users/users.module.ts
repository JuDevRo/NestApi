import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // Sirve para permitir a otros modulos usar el servicio
  exports: [UsersService],
})
export class UsersModule {}

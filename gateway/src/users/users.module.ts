import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersClient } from 'src/common/clients/users.client';

@Module({
  imports: [UsersClient],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

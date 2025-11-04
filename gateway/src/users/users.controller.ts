import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getUsers() {
    console.log('Gateway: Requesting all users ');
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    console.log(`Gateway Requesting user ${id}`);
  }

  @Post('')
  async createUser(@Body() body: { name: string; email: string }) {
    console.log('Gateway creating users', body);
  }
}

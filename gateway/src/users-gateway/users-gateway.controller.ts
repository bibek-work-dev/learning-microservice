import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersGatewayService } from './users-gateway.service';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users-gateway')
export class UsersGatewayController {
  constructor(
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,
    private readonly usersGatewayService: UsersGatewayService,
  ) {}

  @Get('')
  async getUsers() {
    const result = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_users' }, {}),
    );
    console.log('data in getUsers gateway', result);
    return {
      message: 'All users fetched successfully',
      data: result,
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    console.log(`Gateway: Requesting user ${id}`);
    return {
      message: `User ${id} fetched successfully`,
      data: null,
    };
  }

  @Post('register')
  async registerUser(@Body() body: { name: string; email: string }) {
    console.log('Gateway creating user', body);
    return {
      message: 'User registered successfully',
      data: null,
    };
  }

  @Post('login')
  async loginUser(@Body() body: any) {
    console.log('Gateway login', body);
    return {
      message: 'User logged in successfully',
      data: null,
    };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string },
  ) {
    console.log(`Gateway updating user ${id}`, body);
    return {
      message: `User ${id} updated successfully`,
      data: null,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    console.log('Gateway delete', userId);
    return {
      message: `User ${userId} deleted successfully`,
      data: null,
    };
  }
}

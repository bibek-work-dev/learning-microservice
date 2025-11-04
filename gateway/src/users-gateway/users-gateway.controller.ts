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

import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users-gateway')
export class UsersGatewayController {
  constructor(
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,

  ) { }

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
  async getUserById(@Param('id') userId: string) {
    const result = await firstValueFrom(this.usersClient.send({ cmd: "get_user_by_id" }, userId))
    return {
      message: `User ${userId} fetched successfully`,
      data: result,
    };
  }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    console.log("here", registerUserDto)
    const result = await firstValueFrom(this.usersClient.send({ cmd: "register_user" }, registerUserDto))
    return {
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const result = await firstValueFrom(this.usersClient.send({ cmd: "login_user" }, loginUserDto))
    return {
      message: 'User logged in successfully',
      data: result,
    };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: { name?: string; email?: string },
  ) {
    const result = await firstValueFrom(this.usersClient.send({ cmd: "update_user" }, { params: { userId }, body: updateUserDto }))
    return {
      message: `User ${userId} updated successfully`,
      data: result,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    const result = await firstValueFrom(this.usersClient.send({ cmd: "delete_user" }, userId))
    return {
      message: `User ${userId} deleted successfully`,
      data: result,
    };
  }
}

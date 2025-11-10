import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IsMongoIdDto } from './dto/is-mongoId.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/gateway-commons/guards/auth.guard';
import { CurrentUser } from 'src/gateway-commons/decorators/current-user.decorator';

@Controller('users-gateway')
export class UsersGatewayController {
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientProxy) {}

  @Get('')
  async getUsers() {
    const result = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_users' }, {}),
    );
    return {
      message: 'All users fetched successfully',
      data: result,
    };
  }

  @Get(':id')
  async getUserById(@Param() params: IsMongoIdDto) {
    const { id } = params;
    const result = await firstValueFrom(
      this.usersClient.send({ cmd: 'get_user_by_id' }, { userId: id }),
    );
    return {
      message: `User ${id} fetched successfully`,
      data: result,
    };
  }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    console.log('here', registerUserDto);
    const result = await firstValueFrom(
      this.usersClient.send({ cmd: 'register_user' }, registerUserDto),
    );
    return {
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const result = await firstValueFrom(
      this.usersClient.send({ cmd: 'login_user' }, loginUserDto),
    );
    return {
      message: 'User logged in successfully',
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param() params: IsMongoIdDto,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @CurrentUser('id') userId: string,
  ) {
    const { id } = params;
    if (id !== userId)
      throw new UnauthorizedException("You aren't authorized at all");
    const result = await firstValueFrom(
      this.usersClient.send(
        { cmd: 'update_user' },
        { userId, body: updateUserDto },
      ),
    );
    return {
      message: `User ${userId} updated successfully`,
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param() params: IsMongoIdDto,
    @CurrentUser('id') userId: string,
  ) {
    const { id } = params;
    if (id !== userId)
      throw new UnauthorizedException("You aren't authorized at all");
    console.log('user', id, userId);
    const result = await firstValueFrom(
      this.usersClient.send({ cmd: 'delete_user' }, { userId }),
    );
    return {
      message: `User ${userId} deleted successfully`,
      data: result,
    };
  }
}

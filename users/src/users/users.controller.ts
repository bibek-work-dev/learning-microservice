import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    const result = await this.usersService.findAll();
    console.log('result in users controller in users microservice', result);
    return result;
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() id: string) {
    return this.usersService.findById(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() data: { name: string; email?: string }) {
    return this.usersService.createUser(data.name, data.email);
  }

  @EventPattern({ cmd: 'post_created' })
  async handlePostCreated(
    @Payload() data: { postId: string; title: string; authorId: string },
  ) {
    console.log('📢 Users service received post_created event:', data);
    // Optional: handle event, e.g., update user stats or send notification
  }
}

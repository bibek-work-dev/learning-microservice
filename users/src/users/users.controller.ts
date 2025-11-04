import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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

  @MessagePattern({ cmd: 'register_user' })
  async registerUser(@Payload() data: { name: string; email: string; password: string }) {
    console.log("data in register_user", data)
    const result = await this.usersService.register(data.name, data.email, data.password);
    console.log("result in registerUser", result)
    return result
  }

  @MessagePattern({ cmd: 'login_user' })
  async loginUser(@Payload() data: { email: string; password: string }) {
    const result = await this.usersService.login(data.email, data.password);
    console.log("result in loginUser", result)
    return result;
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(@Payload() data: { id: string; update: Partial<any> }) {
    const result = await this.usersService.update(data.id, data.update);
    console.log("result in updateUser", result)
    return result
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() id: string) {
    const result = await this.usersService.delete(id);
    console.log("result", result);
    return result;
  }

  @EventPattern({ cmd: 'post_created' })
  async handlePostCreated(
    @Payload() data: { postId: string; title: string; authorId: string },
  ) {
    console.log('📢 Users service received post_created event:', data);
    // Optional: handle event, e.g., update user stats or send notification
  }
}

import { Controller, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('EVENTS_BUS') private eventsBus: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(@Ctx() context: RmqContext) {
    const result = await this.usersService.findAll();
    console.log('result in users controller in users microservice', result);
    return result;
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() payload: { userId: string }) {
    console.log('type of userId', typeof payload.userId);
    const { userId } = payload;
    const result = await this.usersService.findById(userId);
    return result;
  }

  @MessagePattern({ cmd: 'register_user' })
  async registerUser(@Payload() data: any) {
    const result = await this.usersService.register(data);
    return result;
  }

  @MessagePattern({ cmd: 'login_user' })
  async loginUser(@Payload() data: { email: string; password: string }) {
    const result = await this.usersService.login(data);
    return result;
  }

  @MessagePattern({ cmd: 'update_user' })
  async updateUser(@Payload() data: { userId: string; body: Partial<any> }) {
    const { userId, body } = data;
    const result = await this.usersService.update(userId, data.body);
    return result;
  }

  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() payload: any) {
    const { userId } = payload;
    const result = await this.usersService.delete(userId);
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

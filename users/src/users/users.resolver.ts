import { Resolver,  } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    return this.usersService.findAll();
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
  async handlePostCreated(@Payload() data: { postId: string; title: string; authorId: string }) {
    console.log('📢 Users service received post_created event:', data);
    // Optional: do something, e.g., update user stats, send notification, etc.
  }

}

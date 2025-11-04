import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersGatewayModule } from './users-gateway/users-gateway.module';
import { PostsGatewayModule } from './posts-gateway/posts-gateway.module';
import { CommentsGatewayModule } from './comments-gateway/comments-gateway.module';
import { GatewayCommonsModule } from './gateway-commons/gateway-commons.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersGatewayModule,
    PostsGatewayModule,
    CommentsGatewayModule,
    GatewayCommonsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
//  constructor(
//     private readonly gatewayService: GatewayService,
//     @Inject('USERS_SERVICE') private usersClient: ClientProxy,
//     // @Inject('POSTS_SERVICE') private postsClient: ClientProxy,
//     // @Inject('EVENTS_BUS') private eventsBus: ClientProxy,
//   ) {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommonModule } from './common/common.module';
import { CommentsModule } from './comments/comments.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PostsModule,
    CommonModule,
    CommentsModule,
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

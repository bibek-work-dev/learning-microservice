import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsClient } from 'src/common/clients/posts.client';

@Module({
  imports: [PostsClient],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

import { Module } from '@nestjs/common';
import { PostsGatewayService } from './posts-gateway.service';
import { PostsGatewayController } from './posts-gateway.controller';
import { PostsClient } from 'src/gateway-commons/clients/posts.client';

@Module({
  imports: [PostsClient],
  controllers: [PostsGatewayController],
  providers: [PostsGatewayService],
})
export class PostsGatewayModule {}

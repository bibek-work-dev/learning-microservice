import { Module } from '@nestjs/common';

import { PostsGatewayController } from './posts-gateway.controller';
import { PostsClient } from 'src/gateway-commons/clients/posts.client';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PostsClient, JwtModule],
  controllers: [PostsGatewayController],
  providers: [],
})
export class PostsGatewayModule {}

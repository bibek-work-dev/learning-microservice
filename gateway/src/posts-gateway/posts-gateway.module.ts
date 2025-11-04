import { Module } from '@nestjs/common';

import { PostsGatewayController } from './posts-gateway.controller';
import { PostsClient } from 'src/gateway-commons/clients/posts.client';

@Module({
  imports: [PostsClient],
  controllers: [PostsGatewayController],
  providers: [],
})
export class PostsGatewayModule { }

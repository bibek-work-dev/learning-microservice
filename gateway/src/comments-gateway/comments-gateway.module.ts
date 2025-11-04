import { Module } from '@nestjs/common';
import { CommentsGatewayService } from './comments-gateway.service';
import { CommentsGatewayController } from './comments-gateway.controller';

@Module({
  imports: [],
  controllers: [CommentsGatewayController],
  providers: [CommentsGatewayService],
})
export class CommentsGatewayModule {}

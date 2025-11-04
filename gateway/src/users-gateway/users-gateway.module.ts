import { Module } from '@nestjs/common';
import { UsersGatewayService } from './users-gateway.service';
import { UsersGatewayController } from './users-gateway.controller';
import { UsersClient } from 'src/gateway-commons/clients/users.client';

@Module({
  imports: [UsersClient],
  controllers: [UsersGatewayController],
  providers: [UsersGatewayService],
})
export class UsersGatewayModule {}

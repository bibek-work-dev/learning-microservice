import { Module } from '@nestjs/common';

import { UsersGatewayController } from './users-gateway.controller';
import { UsersClient } from 'src/gateway-commons/clients/users.client';
import { GatewayCommonsModule } from 'src/gateway-commons/gateway-commons.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersClient, GatewayCommonsModule, JwtModule],
  controllers: [UsersGatewayController],
  providers: [],
})
export class UsersGatewayModule {}

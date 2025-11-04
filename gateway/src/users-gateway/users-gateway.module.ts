import { Module } from '@nestjs/common';

import { UsersGatewayController } from './users-gateway.controller';
import { UsersClient } from 'src/gateway-commons/clients/users.client';

@Module({
  imports: [UsersClient],
  controllers: [UsersGatewayController],
  providers: [],
})
export class UsersGatewayModule { }

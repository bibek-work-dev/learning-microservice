import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

type AllowedFields = 'id' | 'name';

export const CurrentUser = createParamDecorator(
  (data: AllowedFields | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    console.log('real in user custom decorator', user);

    if (!user) {
      throw new ForbiddenException('User not found or not authenticated');
    }

    if (data) {
      const value = user[data];
      if (typeof value === 'undefined') {
        throw new ForbiddenException(`User property "${data}" not found`);
      }
      return value;
    }

    return user;
  },
);

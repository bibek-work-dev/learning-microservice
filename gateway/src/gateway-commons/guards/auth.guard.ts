import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];
    if (!authHeader) return false;

    console.log('authHeader', authHeader);

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      console.log('here');
      return false;
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: 'my-secret',
      });
      req['user'] = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
}

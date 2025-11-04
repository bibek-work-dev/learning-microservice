import { Controller, Get } from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';

@Controller('')
export class AppController {
  constructor() {}

  @Get('health')
  async healthCheck() {
    const services = ['USERS_SERVICE', 'POSTS_SERVICE'];
    const results = {};
    for (const service of services) {
      try {
        await firstValueFrom(
          this[service.toLowerCase().replace('_service', 'Client')]
            .send({ cmd: 'health' }, {})
            .pipe(timeout(2000)),
        );
      } catch (error) {
        results[service] = 'DOWN';
      }
    }

    return {
      gateway: 'UP',
      services: results,
      timeStamp: new Date().toISOString(),
    };
  }
}

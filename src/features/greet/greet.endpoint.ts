// src/features/greet/greet.endpoint.ts
import type { Router } from '../../core/router';
import type { Bus } from '../../core/bus';

export function registerGreetEndpoint(router: Router) {
  router.register('post', '/greet', async (req, bus: Bus) => {
    const body = await req.json();
    return bus.send('GreetUser', body);
  });
}

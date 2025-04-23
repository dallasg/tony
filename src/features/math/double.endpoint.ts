// src/features/math/double.endpoint.ts
import type { Router } from '../../core/router';
import type { Bus } from '../../core/bus';

export function registerDoubleEndpoint(router: Router) {
  router.register('post', '/double', async (req, bus: Bus) => {
    const body = await req.json();
    return bus.send('DoubleNumber', body);
  });
}

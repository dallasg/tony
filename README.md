# Tony

> Your edge-native message guy.

**Tony** is a minimalist, message-driven, dependency-injected backend framework built to run on Cloudflare Workers. More coming soon.

## 🚀 Usage

Create a service
```TypeScript
// src/services/MathService.ts
export interface IMathService {
  double(value: number): number;
}

export class MathService implements IMathService {
  double(value: number): number {
    return value * 2;
  }
}
```

Create a handler
```TypeScript
// src/features/math/DoubleNumberHandler.ts
import type { IMathService } from '../../services/MathService';

export class DoubleNumberHandler {
  constructor(private math: IMathService) {}

  async handle(input: { value: number }): Promise<{ result: number }> {
    return { result: this.math.double(input.value) };
  }
}
```


Create an endpoint
```TypeScript
// src/features/math/double.endpoint.ts

import type { Router } from '../../core/router';
import type { Bus } from '../../core/bus';

export function registerDoubleEndpoint(router: Router) {
  router.register('post', '/double', async (req, bus: Bus) => {
    const body = await req.json();
    return bus.send('DoubleNumber', body);
  });
}
```


Inject them
```TypeScript
// src/index.ts
container.addSingleton(IMathService, new MathService());
container.addSingleton('DoubleNumberHandler', new DoubleNumberHandler(container.resolve(IMathService)));
bus.register('DoubleNumber', 'DoubleNumberHandler');

registerDoubleEndpoint(router);
```


Use it
```bash
npx wrangler dev
http POST http://localhost:8787/greet name=Tony
```


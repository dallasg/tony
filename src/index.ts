/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;

// src/index.ts
import { Container } from './core/container';
import { Bus } from './core/bus';
import { Router } from './core/router';
import { loggerBehavior } from './core/behaviors/logger';

import { GreetingService } from './services/GreetingService';
import { GreetUserHandler } from './features/greet/GreetUserHandler';
import { registerGreetEndpoint } from './features/greet/greet.endpoint';
import { MathService } from './services/MathService';
import { DoubleNumberHandler } from './features/math/DoubleNumberHandler';
import { registerDoubleEndpoint } from './features/math/double.endpoint';

export default {
  async fetch(req: Request): Promise<Response> {
    const container = new Container();

    const router = new Router();
    const bus = new Bus(container);

    container.register('GreetingService', new GreetingService());
    container.register('GreetUserHandler', new GreetUserHandler(container.resolve('GreetingService')));

    container.register('LoggerBehavior', loggerBehavior);

    bus.register('GreetUser', 'GreetUserHandler');
    bus.use('LoggerBehavior');

    registerGreetEndpoint(router);

    container.register('MathService', new MathService());
    container.register('DoubleNumberHandler', new DoubleNumberHandler(container.resolve('MathService')));

    bus.register('DoubleNumber', 'DoubleNumberHandler');

    registerDoubleEndpoint(router);

    return router.handle(req, bus);
  }
} satisfies ExportedHandler<Env>;

// src/core/router.ts
import type { Bus } from './bus';

type HandlerFn = (req: Request, bus: Bus) => Promise<any>;

interface Route {
  method: string;
  path: string;
  handler: HandlerFn;
}

export class Router {
  private routes = new Map<string, HandlerFn>();

  register(method: string, path: string, handler: HandlerFn) {
    this.routes.set(`${method.toLowerCase()}:${path}`, handler);
  }

  async handle(req: Request, bus: Bus): Promise<Response> {
    const url = new URL(req.url);
    const key = `${req.method.toLowerCase()}:${url.pathname}`;
    const handler = this.routes.get(key);
    if (!handler) return new Response('Not found', { status: 404 });

    try {
      const result = await handler(req, bus);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err: any) {
      return new Response(err.message || 'Error', { status: 500 });
    }
  }
}

import { Container } from "./container";
// src/core/bus.ts
export type HandlerFn<TInput = any, TResult = any> = (input: TInput) => Promise<TResult>;

export type Behavior<TInput = any, TResult = any> = (
  input: TInput,
  next: () => Promise<TResult>
) => Promise<TResult>;

export class Bus {
  private handlers = new Map<string, string>();
  private behaviors: string[] = [];

  constructor(private container: Container) {}

  register(name: string, handlerToken: string) {
    this.handlers.set(name, handlerToken);
  }

  use(behaviorToken: string) {
    this.behaviors.push(behaviorToken);
  }

  async send<TInput, TResult>(type: string, input: TInput): Promise<TResult> {
    const token = this.handlers.get(type);
    if (!token) throw new Error(`No handler registered for "${type}"`);

    const handler = this.container.resolve<{ handle: HandlerFn<TInput, TResult> }>(token);

    let pipeline = () => handler.handle(input);

    for (const token of [...this.behaviors].reverse()) {
      const behavior = this.container.resolve<Behavior<TInput, TResult>>(token);
      const next = pipeline;
      pipeline = () => behavior(input, next);
    }

    return pipeline();
  }
}

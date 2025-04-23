// src/features/greet/GreetUserHandler.ts
import type { IGreetingService } from '../../services/GreetingService';

export class GreetUserHandler {
  constructor(private service: IGreetingService) {}

  async handle(input: { name: string }): Promise<{ message: string }> {
    return {
      message: this.service.generateGreeting(input.name),
    };
  }
}

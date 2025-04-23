// src/services/GreetingService.ts
export interface IGreetingService {
    generateGreeting(name: string): string;
  }

  export class GreetingService implements IGreetingService {
    generateGreeting(name: string): string {
      return `Hello, ${name}!`;
    }
  }

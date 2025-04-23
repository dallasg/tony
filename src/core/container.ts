// src/core/container.ts
export class Container {
    private registry = new Map<string, any>();

    register<T>(token: string, instance: T): void {
      this.registry.set(token, instance);
    }

    resolve<T>(token: string): T {
      const value = this.registry.get(token);
      if (!value) throw new Error(`Service not found: ${token}`);
      return value;
    }
  }

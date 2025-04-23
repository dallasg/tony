// src/features/math/DoubleNumberHandler.ts
import type { IMathService } from '../../services/MathService';

export class DoubleNumberHandler {
  constructor(private math: IMathService) {}

  async handle(input: { value: number }): Promise<{ result: number }> {
    return { result: this.math.double(input.value) };
  }
}

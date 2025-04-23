// src/services/MathService.ts
export interface IMathService {
    double(value: number): number;
  }

  export class MathService implements IMathService {
    double(value: number): number {
      return value * 2;
    }
  }

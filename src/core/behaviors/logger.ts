// src/core/behaviors/logger.ts
import type { Behavior } from '../bus';

export const loggerBehavior: Behavior = async (input, next) => {
  console.log(`[Bus] ->`, input);
  const result = await next();
  console.log(`[Bus] <-`, result);
  return result;
};

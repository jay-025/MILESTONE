// src/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function safeDivide(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
export const DIRECTIONS = {
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
};

export type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

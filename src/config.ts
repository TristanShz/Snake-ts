export const DIRECTIONS = {
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
};
export type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];
export const GAME_WIDTH = 600;
export const GAME_HEIGHT = 600;
export const TILE_SIZE = 30;
export const ROWS = GAME_WIDTH / TILE_SIZE;
export const COLS = GAME_HEIGHT / TILE_SIZE;
export const GAME_STATE = {
  PAUSE: 0,
  RUN: 1,
  STOP: 3,
};

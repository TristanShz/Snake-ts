import { Game } from "./Game";
import { COLS, ROWS, TILE_SIZE } from "./config";

export class Food {
  width: number;
  height: number;
  position: { x: number; y: number };
  constructor(game: Game) {
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.position = this.getRandomPosition(game);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#F6511D";
    ctx.strokeStyle = "#a72e08";
    const args = [
      this.position.x * TILE_SIZE,
      this.position.y * TILE_SIZE,
      this.width,
      this.height,
    ] as const;
    ctx.fillRect(...args);
    ctx.strokeRect(...args);
  }
  private getRandomPosition(game: Game): { x: number; y: number } {
    const x = this.getRandomInt(1, COLS - 1);
    const y = this.getRandomInt(1, ROWS - 1);
    let isOnSnake = false;
    game.snake.body.forEach((part) => {
      if (part.x === x && part.y === y) {
        isOnSnake = true;
      }
    });
    if (isOnSnake) {
      return this.getRandomPosition(game);
    } else {
      return { x, y };
    }
  }
  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

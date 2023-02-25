import { Direction, DIRECTIONS } from "./utils";
import { COLS, ROWS, TILE_SIZE } from "./main";
import { Game } from "./Game";

const INITIAL_SNAKE = [
  { x: 12, y: 10 },
  { x: 11, y: 10 },
  { x: 10, y: 10 },
];
export class Snake {
  body: { x: number; y: number }[];
  private readonly game: Game;
  private direction: Direction | undefined;
  constructor(game: Game) {
    this.body = [...INITIAL_SNAKE];
    this.direction = undefined;
    this.game = game;
  }

  get head() {
    return {
      x: this.body[0].x,
      y: this.body[0].y,
    };
  }

  grow() {
    const tail = this.body[this.body.length - 1];
    this.body.push({ ...tail });
  }
  setDirection(direction: Direction) {
    if (this.direction === DIRECTIONS.UP && direction === DIRECTIONS.DOWN)
      return;
    if (this.direction === DIRECTIONS.DOWN && direction === DIRECTIONS.UP)
      return;
    if (this.direction === DIRECTIONS.LEFT && direction === DIRECTIONS.RIGHT)
      return;
    if (this.direction === DIRECTIONS.RIGHT && direction === DIRECTIONS.LEFT)
      return;
    this.direction = direction;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#D9F9A5";
    ctx.strokeStyle = "#b6d77f";
    this.body.forEach((bodyPart) => {
      const posX = bodyPart.x * TILE_SIZE;
      const posY = bodyPart.y * TILE_SIZE;
      ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
      ctx.strokeRect(posX, posY, TILE_SIZE, TILE_SIZE);
    });
  }

  update() {
    if (this.direction === undefined) {
      return;
    }
    this.move();
    if (this.checkCollision()) {
      this.game.gameOver();
    }
  }

  private checkCollision() {
    const head = this.body[0];
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  }

  private move() {
    const head = this.head;
    let newHead;
    switch (this.direction) {
      case DIRECTIONS.UP:
        if (head.y === 0) newHead = { x: head.x, y: ROWS - 1 };
        else newHead = { x: head.x, y: head.y - 1 };
        break;
      case DIRECTIONS.DOWN:
        if (head.y === ROWS - 1) newHead = { x: head.x, y: 0 };
        else newHead = { x: head.x, y: head.y + 1 };
        break;
      case DIRECTIONS.LEFT:
        if (head.x === 0) newHead = { x: COLS - 1, y: head.y };
        else newHead = { x: head.x - 1, y: head.y };
        break;
      case DIRECTIONS.RIGHT:
        if (head.x === COLS - 1) newHead = { x: 0, y: head.y };
        else newHead = { x: head.x + 1, y: head.y };
        break;
    }
    if (!newHead) return;

    this.body.unshift(newHead);
    this.body.pop();
  }
}

import { Snake } from "./Snake";
import { InputHandler } from "./InputHandler";
import { Food } from "./Food";
import { GAME_HEIGHT, GAME_STATE, GAME_WIDTH } from "./config";

export class Game {
  state = GAME_STATE.RUN;
  speed = 1;
  snake: Snake;
  food: Food;
  bestScore = localStorage.getItem("snakeScore") || 0;
  score = 0;
  inputHandler: InputHandler;
  constructor() {
    this.snake = new Snake(this);
    this.food = new Food(this);
    this.inputHandler = new InputHandler(this);
  }

  restart() {
    this.score = 0;
    this.speed = 1;
    this.snake = new Snake(this);
    this.food = new Food(this);
    this.state = GAME_STATE.RUN;
  }

  pause() {
    this.state = GAME_STATE.PAUSE;
  }

  resume() {
    this.state = GAME_STATE.RUN;
  }

  gameOver() {
    this.state = GAME_STATE.STOP;
    if (this.score > this.bestScore) this.saveScore();
  }

  saveScore() {
    localStorage.setItem("snakeScore", this.score.toString());
    this.bestScore = this.score;
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.snake.draw(ctx);
    this.food?.draw(ctx);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    if (this.state === GAME_STATE.RUN) {
      ctx.fillText(`Score: ${this.score}`, 10, 20);
      ctx.fillText(`Best Score: ${this.bestScore}`, 10, 45);
    } else if (
      this.state === GAME_STATE.STOP ||
      this.state === GAME_STATE.PAUSE
    ) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
    }
    if (this.state === GAME_STATE.STOP) {
      ctx.fillText(`Game Over`, 10, 20);
      ctx.fillText(`Press Enter to restart`, 10, 45);
    } else if (this.state === GAME_STATE.PAUSE) {
      ctx.fillText(`Paused`, 10, 20);
      ctx.fillText(`Press Enter to resume`, 10, 45);
    }
  }

  update() {
    if (this.state !== GAME_STATE.RUN) return;
    this.snake.update();

    if (
      this.snake.head.x === this.food.position.x &&
      this.snake.head.y === this.food.position.y
    ) {
      this.snake.grow();
      this.food = new Food(this);
      this.score++;
      this.speed += 0.01;
    }
  }
}

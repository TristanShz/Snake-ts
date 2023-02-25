import { Game } from "./Game";
import { DIRECTIONS, GAME_STATE } from "./config";

export class InputHandler {
  constructor(game: Game) {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
          game.snake.setDirection(DIRECTIONS.DOWN);
          break;
        case "ArrowUp":
          game.snake.setDirection(DIRECTIONS.UP);
          break;
        case "ArrowLeft":
          game.snake.setDirection(DIRECTIONS.LEFT);
          break;
        case "ArrowRight":
          game.snake.setDirection(DIRECTIONS.RIGHT);
          break;
        case "Enter":
        case "Escape":
          if (game.state === GAME_STATE.RUN) game.pause();
          else if (game.state === GAME_STATE.PAUSE) game.resume();
          else if (game.state === GAME_STATE.STOP) game.restart();
          break;
      }
    });
  }
}

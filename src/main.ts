import "./style.css";
import { Game } from "./Game";

export const GAME_WIDTH = 600;
export const GAME_HEIGHT = 600;
export const TILE_SIZE = 30;
export const ROWS = GAME_WIDTH / TILE_SIZE;
export const COLS = GAME_HEIGHT / TILE_SIZE;

const app = document.querySelector("#app");

const canvas = document.createElement("canvas");

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const ctx = canvas.getContext("2d");

const game = new Game();

let now: number;
let then = Date.now();
let delta: number;
const gameLoop = (ctx: CanvasRenderingContext2D | null) => {
  if (ctx === null) return;
  let fpsLimit = game.speed * 10 > 15 ? 15 : game.speed * 10;
  let interval = 1000 / fpsLimit;
  requestAnimationFrame(gameLoop.bind(null, ctx));
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update();
    game.draw(ctx);
    then = now - (delta % interval);
  }
};

app!.appendChild(canvas);
gameLoop(ctx);

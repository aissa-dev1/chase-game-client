import { onCleanup, onMount } from "solid-js";
import { WebGame } from "~/game/web/game";

export default function WebBoard() {
  let canvas!: HTMLCanvasElement;
  let game: WebGame;

  onMount(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game = new WebGame({ ctx: canvas.getContext("2d")! });
    game.init();
  });

  onCleanup(() => {
    if (!game) return;

    game.destroy();
  });

  return (
    <canvas
      width="750"
      height="500"
      class="bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      ref={canvas}
    />
  );
}

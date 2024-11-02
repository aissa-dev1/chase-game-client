import { WebPlayer, WebPlayerManager } from "./player";

interface WebGameConfig {
  ctx: CanvasRenderingContext2D;
}

export class WebGame {
  private ctx: CanvasRenderingContext2D;
  private animationId!: number;
  private player1Manager: WebPlayerManager;
  private player2Manager: WebPlayerManager;
  private playerManagers: Array<WebPlayerManager>;

  constructor(config: WebGameConfig) {
    this.ctx = config.ctx;
    this.player1Manager = new WebPlayerManager({
      ctx: this.ctx,
      player: new WebPlayer({
        x: 50,
        y: 50,
        fill: "red",
      }),
      moveLeftKey: "ArrowLeft",
      moveUpKey: "ArrowUp",
      moveRightKey: "ArrowRight",
      moveDownKey: "ArrowDown",
    });
    this.player2Manager = new WebPlayerManager({
      ctx: this.ctx,
      player: new WebPlayer({
        x: 50,
        y: 250,
        fill: "blue",
      }),
      moveLeftKey: "q",
      moveUpKey: "z",
      moveRightKey: "d",
      moveDownKey: "s",
    });
    this.playerManagers = [this.player1Manager, this.player2Manager];
  }

  init() {
    this.animate();
    for (const playerManager of this.playerManagers) {
      playerManager.init();
    }
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    for (const playerManager of this.playerManagers) {
      playerManager.destroy();
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (const playerManager of this.playerManagers) {
      playerManager.draw();
    }
  }

  private update() {
    for (const playerManager of this.playerManagers) {
      playerManager.update();
    }
  }

  private animate() {
    this.draw();
    this.update();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

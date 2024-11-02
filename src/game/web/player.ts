interface WebPlayerConfig {
  x: number;
  y: number;
  fill: string;
}

export class WebPlayer {
  private ctx!: CanvasRenderingContext2D;
  private _x: number;
  private _y: number;
  private _size = 20;
  private _speed = 7;
  private _fill: string;

  constructor(config: WebPlayerConfig) {
    this._x = config.x;
    this._y = config.y;
    this._fill = config.fill;
  }

  draw() {
    if (!this.ctx) return;

    this.ctx.fillStyle = this.fill;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.fill();
  }

  update() {}

  setCtx(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  setX(x: number) {
    this._x = x;
  }

  setY(y: number) {
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get size(): number {
    return this._size;
  }

  get speed(): number {
    return this._speed;
  }

  get fill(): string {
    return this._fill;
  }
}

interface WebPlayerControllerConfig {
  player: WebPlayer;
  moveLeftKey: string;
  moveUpKey: string;
  moveRightKey: string;
  moveDownKey: string;
}

export class WebPlayerController {
  private player: WebPlayer;
  private keys = new Set<string>();
  private moveLeftKey: string;
  private moveUpKey: string;
  private moveRightKey: string;
  private moveDownKey: string;

  constructor(config: WebPlayerControllerConfig) {
    this.player = config.player;
    this.moveLeftKey = config.moveLeftKey;
    this.moveUpKey = config.moveUpKey;
    this.moveRightKey = config.moveRightKey;
    this.moveDownKey = config.moveDownKey;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  init() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  destroy() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  update() {
    if (this.keys.has(this.moveLeftKey.toLowerCase())) {
      this.player.setX(this.player.x - this.player.speed);
    }
    if (this.keys.has(this.moveUpKey.toLowerCase())) {
      this.player.setY(this.player.y - this.player.speed);
    }
    if (this.keys.has(this.moveRightKey.toLowerCase())) {
      this.player.setX(this.player.x + this.player.speed);
    }
    if (this.keys.has(this.moveDownKey.toLowerCase())) {
      this.player.setY(this.player.y + this.player.speed);
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    this.keys.add(e.key.toLowerCase());
  }

  private handleKeyUp(e: KeyboardEvent) {
    this.keys.delete(e.key.toLowerCase());
  }
}

interface WebPlayerManagerConfig extends WebPlayerControllerConfig {
  ctx: CanvasRenderingContext2D;
}

export class WebPlayerManager {
  private player: WebPlayer;
  private playerController: WebPlayerController;

  constructor(config: WebPlayerManagerConfig) {
    this.player = new WebPlayer({
      x: config.player.x,
      y: config.player.y,
      fill: config.player.fill,
    });
    this.player.setCtx(config.ctx);
    this.playerController = new WebPlayerController({
      player: this.player,
      moveLeftKey: config.moveLeftKey,
      moveUpKey: config.moveUpKey,
      moveRightKey: config.moveRightKey,
      moveDownKey: config.moveDownKey,
    });
  }

  init() {
    this.playerController.init();
  }

  destroy() {
    this.playerController.destroy();
  }

  draw() {
    this.player.draw();
  }

  update() {
    this.player.update();
    this.playerController.update();
  }
}

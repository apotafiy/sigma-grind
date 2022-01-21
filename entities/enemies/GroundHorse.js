class GroundHorse {
  constructor(game) {
    this.game = game;
    this.animations = [];
    this.loadAnimations();
  }

  loadAnimations() {
    this.animations[0] = new Animator( // down idle
      ASSET_MANAGER.getAsset('./sprites/groundhorse.png'),
      0,
      1,
      28,
      37,
      1,
      0.5
    );
    this.animations[1] = new Animator( // jumps up
      ASSET_MANAGER.getAsset('./sprites/groundhorse.png'),
      0,
      1,
      28,
      37,
      7,
      0.1
    );
    this.animations[2] = new Animator( // up idle
      ASSET_MANAGER.getAsset('./sprites/groundhorse.png'),
      0,
      39,
      28,
      37,
      2,
      0.3
    );
    this.animations[3] = new Animator( // go back down
      ASSET_MANAGER.getAsset('./sprites/groundhorse.png'),
      0,
      77,
      28,
      37,
      5,
      0.2
    );
  }

  update() {}

  draw(ctx) {
    this.animations[0].drawFrame(this.game.clockTick, ctx, 0, 0, 3);
    this.animations[1].drawFrame(this.game.clockTick, ctx, 0, 120, 3);
    this.animations[2].drawFrame(this.game.clockTick, ctx, 0, 230, 3);
    this.animations[3].drawFrame(this.game.clockTick, ctx, 0, 350, 3);
  }
}

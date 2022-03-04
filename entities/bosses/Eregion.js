class Eregion {
  constructor(game, x, y) {
    //     gameEngine.addEntity(new Eregion(gameEngine,19,-245));
    this.x = x * 64;
    this.y = y * 64;
    this.game = game;
    this.isActive = false;
    this.player = this.game.getPlayer();
    this.lifeExpectancy = 999999999;
    this.cache = [];
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.health = 25;
    this.acceleration = 3000;
    this.DISTANCE_MULT = 1;
    this.frames = 0;
    this.isPog = true;
    this.scale = 3.5;
    this.angle = 0;
    this.offSetBB = 32;
    this.drawBobOffset = 0;
    this.drawOffset = 0;
    this.flashframes = 0;
    this.iframes = 0;
    // Boss health
    this.maxHealth = 20;
    this.health = this.maxHealth;
    this.healthBar = new HealthBar(this);

    this.BB = new BoundingBox(
      this.x + this.offSetBB,
      this.y + this.offSetBB,
      (51 / 2) * this.scale,
      (51 / 2) * this.scale
    );
    this.state = 0;

    this.isHostile = true;
    this.collisionDamage = 5;

    this.animations = [];
    this.loadAnimations();
  }

  die() {
    this.state = 3;
  }

  loadAnimations() {
    this.animations[0] = new Animator( //main body part
      ASSET_MANAGER.getAsset("./sprites/eregion/eregion_main_64x109.png"),
      0,
      0,
      64,
      109,
      1,
      1,
      0,
      false,
      true
    );

    this.animations[1] = new Animator( //Left wing
      ASSET_MANAGER.getAsset("./sprites/eregion/eregion_wings_118x142.png"),
      0,
      0,
      142,
      236,
      6,
      0.1,
      0,
      false,
      true
    );

    this.animations[2] = new Animator( //Right wing
      ASSET_MANAGER.getAsset("./sprites/eregion/eregion_wings_118x142.png"),
      852,
      0,
      142,
      236,
      6,
      0.1,
      0,
      true,
      true
    );
  }

  updateBB() {
    this.BB = new BoundingBox(
      this.x,
      this.y + this.drawOffset,
      64 * this.scale,
      109 * this.scale
    );
  }
  die() {
    //TODO add actual good death logic
    console.log(this.deathTimer);
    if (!this.isDead) {
        this.isDead = true;
        this.deathTimer = 2;
        this.xVelocity = 0;
    } else {
        this.deathTimer -= 1 * this.game.clockTick;
        if (this.deathTimer <= 0) {
            this.game.camera.finalTime =
                this.game.camera.getFormattedTime();
            this.game.camera.isLevel = false;
            this.game.camera.currentState = 3;
            this.game.camera.setMenuMode(this.game);
            this.removeFromWorld = true;
        }
    }
}
  update() {
    this.updateBB();
    this.drawBobOffset += 2 * this.game.clockTick;
    this.drawOffset = Math.sin(this.drawBobOffset) * 30;

    //Invincibility frames 
    if (this.iframes >= 0) {
        this.flashframes =
            (this.flashframes + 60 * this.game.clockTick) % 10;
    } else {
        this.flashframes = 0;
    }

    if (this.health <= 0) this.die();
    this.iframes -= 1 * this.game.clockTick;
  }

  draw(ctx) {
    let that = this;
    that.animations[1].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x + 150,
      that.y - that.game.camera.y - 300 + this.drawOffset, // + that.BB.height / 4,
      that.scale
    );
    that.animations[2].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x - 400,
      that.y - that.game.camera.y - 300 + this.drawOffset, // + that.BB.height / 4,
      that.scale
    );
    if (this.iframes >= 0) {
        ctx.filter = ` brightness(${this.flashframes})`;
    }
    that.animations[0].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x,
      that.y - that.game.camera.y + this.drawOffset, // + that.BB.height / 4,
      that.scale
    );
    if (this.iframes >= 0) {
        ctx.filter = 'none';
    }
    //Draw the boss health_bar
    this.healthBar.drawBossHealthBar(ctx);
    if (params.debug && this.BB) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(
        this.BB.x - this.game.camera.x,
        this.BB.y - this.game.camera.y,
        this.BB.width,
        this.BB.height
      );
    }
  }
}

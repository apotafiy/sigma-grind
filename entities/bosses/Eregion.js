class Eregion {
  constructor(game, x, y) {
  // gameEngine.addEntity(new Player(gameEngine, 9, -220));
//   gameEngine.addEntity(new Eregion(gameEngine,19,-245));
//   gameEngine.addEntity(new Lava(gameEngine, -1, -1));
    this.attacksPerformed = 1;
    this.teleportLocations = [
      { x: 9, y: -246 },
      { x: 29, y: -246 },
      { x: 19, y: -246 },
      { x: 11, y: -249 },
      { x: 27, y: -249 },
      { x: 17, y: -249 },
    ]; // Update this to be based on star coordinates
    this.x = x * 64;
    this.y = y * 64;
    this.game = game;
    this.isActive = false;
    this.player = this.game.getPlayer();
    this.entityArrayPos = game.entities.length;
    this.lifeExpectancy = 999999999;
    this.cache = [];
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.gravity = 200 * 0.2;
    // this.health = 300;
    this.acceleration = 3000;
    this.isPog = true;
    this.scale = 3.5;
    this.angle = 0;
    this.offSetBB = 32;
    this.drawBobOffset = 0;
    this.drawOffset = 0;
    this.flashframes = 0;
    this.iframes = 0;
    this.attackCooldown = 3;
    // Boss health
    this.maxHealth = 250;
    this.health = this.maxHealth;
    this.healthBar = new HealthBar(this);
    this.opacity = 1;
    this.BB = new BoundingBox(
      this.x + this.offSetBB,
      this.y + this.offSetBB,
      (51 / 2) * this.scale,
      (51 / 2) * this.scale
    );
    this.state = 0;
    this.alwaysRender = true;
    // this.isHostile = true;
    // this.collisionDamage = 5;

    this.animations = [];
    this.loadAnimations();
    //Sound soundEffects
    this.soundEffects = {};
    this.soundEffects.roar = SOUND_MANAGER.getSound("eregion_roar");
    this.soundEffects.teleport = SOUND_MANAGER.getSound("eregion_teleport");
    this.soundEffects.death = SOUND_MANAGER.getSound("eregion_death");
    this.soundEffects.ball_attack = SOUND_MANAGER.getSound("eregion_ball_attack");
    this.soundEffects.up_attack = SOUND_MANAGER.getSound("eregion_up_attack");

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
    if (!this.isDead) {
        this.soundEffects.death.play();
      this.isDead = true;
      this.deathTimer = 2;
      this.xVelocity = 0;
    } else {
      this.deathTimer -= 1 * this.game.clockTick;
      this.opacity = Math.max(0, this.opacity - 1 * this.game.clockTick);
      if (this.deathTimer <= 0) {
        this.game.camera.finalTime = this.game.camera.getFormattedTime();
        params.totalTime += this.game.camera.parseTime(this.game.camera.finalTime);
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
      this.flashframes = (this.flashframes + 60 * this.game.clockTick) % 10;
    } else {
      this.flashframes = 0;
    }

    if (this.health <= 0) this.die();
    this.iframes -= 1 * this.game.clockTick;
    this.attackCooldown -= 1 * this.game.clockTick;
    if (this.attackCooldown <= 0) {
      //on every 3 attacks have boss teleport
      if (Math.floor(this.attacksPerformed % 3) == 0) {
          this.soundEffects.teleport.play();
        // this.teleport();
      }
      // if (Math.floor(this.attacksPerformed % 5) == 0) {
      //     this.soundEffects.up_attack.play();
      //   for (let i = 0; i <= 6; i += 2) {
      //       this.game.addEntityAtIndex(
      //           new GroundProjectile(
      //               this.game,
      //               this.x + 130,
      //               this.y + 150,
      //               i,
      //               -8,
      //               1,
      //               this.gravity / 360
      //               // true
      //           ),
      //           this.entityArrayPos - 1
      //       );
      //       //make them live longer
      //       // this.game.entities[this.entityArrayPos -1].time = 200;
      //       this.game.addEntityAtIndex(
      //           new GroundProjectile(
      //               this.game,
      //               this.x + 130,
      //               this.y + 150,
      //               i,
      //               -8,
      //               -1,
      //               this.gravity / 360
      //               // true
      //           ),
      //           this.entityArrayPos - 1
      //       );
            //make them live longer
            // this.game.entities[this.entityArrayPos - 1].time = 200;
        }
        this.attackCooldown = 2;
    //   } else {
    //       this.soundEffects.ball_attack.play();
    //     this.game.addEntityAtIndex(
    //       new HomingBall(this.game, this.x / 64, this.y / 64, 1),
    //       this.entityArrayPos - 1
    //     );
    //     this.attackCooldown = 4;
    //   }
    //   this.attacksPerformed++;
    // }
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
    if(this.isDead){
        ctx.filter = `brightness(${this.flashframes}) opacity(${this.opacity})`;
    }
    that.animations[0].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x,
      that.y - that.game.camera.y + this.drawOffset, // + that.BB.height / 4,
      that.scale
    );
    if (this.iframes >= 0) {
      ctx.filter = "none";
    }
    //Draw the boss health_bar
    // this.healthBar.drawBossHealthBar(ctx);
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
  teleport() {
    let location = this.getRandomInt(0, this.teleportLocations.length);
    this.x = this.teleportLocations[location].x * 64;
    this.y = this.teleportLocations[location].y * 64;

  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}

class AirProjectile {
  /**
   * time per frame
   */

  constructor(game, x, y, xVel, yVel, direction, gravity) {
    this.scale = 2;
    this.glow = 0;
    this.attacking = 0;
    this.game = game;
    this.time = 3;//this.getRandomInt(100,200);
    this.currentState = 0;
    this.attackCooldown = 0;
    this.animations = [[], []];
    this.xVelocity = xVel;
    this.yVelocity = yVel;
    this.x = x * 64;
    this.y = y * 64;
    this.gravity = gravity;
    this.direction = direction;
    this.dieOnCollide = true;
    this.alwaysRender = true;
    this.isHostile = true;
    this.collisionDamage = 10;

    this.loadAnimation();
    //bounding box
    this.BB = new BoundingBox(this.x, this.y, 96 * this.scale, 96 * this.scale);
    this.lastBB = this.BB;

    //death handler
    this.isDead = false;
    this.deathtimer = 0;
    console;
  }
  loadAnimation() {
    //Direction, animation
    //0 = walk
    this.animations[0][0] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/dogboss/spike_96x96.png"),
      0,
      0,
      96,
      96,
      1,
      1,
      0,
      0,
      1
    );
  }
  die() {
    if(this.time > 0.05*this.clockTick){
        this.time = 0.05 * this.clockTick;
    } else if (this.time >= 0) {
        this.time -=1*this.game.clockTick; 
    } else {
        this.removeFromWorld = true;
    }
  }
  updateBB() {
    this.lastBB = this.BB;
    const yOffSet = 6; // Make sprite goes below the ground slightly not the bounding box itself
    this.BB = new BoundingBox(
      this.x + 24 * this.scale,
      this.y,
      96 * this.scale - (48 * this.scale),
      96 * this.scale - yOffSet
    );
  }
  update() {
    this.glow = (this.glow + 1) % 360
    let that = this;
    //vanish after 200 seconds
    this.time -= 1 *this.game.clockTick;
    if (this.time <= 0) this.die();
    //apply gravity to the enemy
    that.yVelocity += that.gravity;
    that.x += that.xVelocity * that.direction * this.game.clockTick;
    that.y += that.yVelocity * this.game.clockTick;
    //update out bounding box every frame
    that.updateBB();
    //Collision
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
        //if falling check below
        if (that.yVelocity > 0) {
          if (entity instanceof Ground && that.lastBB.bottom <= entity.BB.top) {
            if (that.dieOnCollide)  that.die();
            // ws above last tick
            that.y = entity.BB.top - that.BB.height; //set to top of bounding box of ground
            that.yVelocity = 0;
            that.updateBB();
          }
        } else if (that.direction == 1) {
          if (entity instanceof Ground && that.lastBB.left < entity.BB.right) {
            if (that.dieOnCollide) that.removeFromWorld = true;
            that.x = entity.BB.right;
            that.direction = -1;
            that.dirIndex = 0;
            that.updateBB();
          }
        } else if (that.direction == -1) {
          if (entity instanceof Ground && that.lastBB.right > entity.BB.left) {
            // is in the wall
            //subtract because origin is on left
            if (that.dieOnCollide) that.removeFromWorld = true;
            that.x = entity.BB.left - that.BB.width;
            that.direction = 1;
            that.dirIndex = 1;
            that.updateBB();
          }
        }
      }
    });
  }

  draw(ctx) {
    let that = this;
    ctx.filter = `hue-rotate(${this.glow}deg)`;
    // console.log(that.currentState, that.yVelocity)
    that.animations[0][0].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x,
      that.y - that.game.camera.y, // + that.BB.height / 4,
      that.scale
    );
    ctx.filter = `none`;
    if (params.debug) {
      ctx.strokeStyle = "Purple";
      ctx.strokeRect(
        that.BB.x - that.game.camera.x,
        that.BB.y - that.game.camera.y,
        that.BB.width,
        that.BB.height
      );
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}

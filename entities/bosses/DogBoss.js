class DogBoss {
  /**
   * time per frame
   */
  /**
   * 0 = walk left
   * 1 = walk right
   * 2 = jump
   * 3 = ?
   * 4 = get up
   * 5 = dead
   */
  constructor(game, x, y, gravity) {
    this.scale = 3;
    this.entityArrayPos = game.entities.length;
    this.attacking = 0;
    this.game = game;
    this.currentState = 0;
    this.attackCooldown = 0;
    this.animations = [[], []];
    this.xVelocity = -2;
    this.yVelocity = 0;
    this.x = x * 64;
    this.y = y * 64;
    this.gravity = gravity;
    this.direction = 1;
    this.dirIndex = 1;
    if (this.xVelocity > 0) {
      this.direction = -1;
      this.dirIndex = 0;
    }

    this.loadAnimation();
    //bounding box
    this.BB = new BoundingBox(
      this.x,
      this.y,
      130 * this.scale,
      96 * this.scale
    );
    this.lastBB = this.BB;

    //death handler
    this.isDead = false;
    this.deathtimer = 0;
  }
  loadAnimation() {
    //Direction, animation
    //0 = walk
    this.animations[1][0] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/dogboss/dogboss_walk_130x96.png"),
      0,
      0,
      130,
      96,
      8,
      0.12,
      0,
      0,
      1
    );

    this.animations[0][0] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/dogboss/dogboss_walk_130x96.png"),
      1010,
      0,
      130,
      96,
      8,
      0.12,
      0,
      1,
      1
    );
    this.animations[0][1] = new Animator(
      ASSET_MANAGER.getAsset(
        "./sprites/dogboss/dogboss_front_facing_128x96.png"
      ),
      0,
      0,
      128,
      96,
      9,
      0.12,
      0,
      0,
      1
    );
    this.animations[1][1] = new Animator(
      ASSET_MANAGER.getAsset(
        "./sprites/dogboss/dogboss_front_facing_128x96.png"
      ),
      0,
      0,
      128,
      96,
      9,
      0.12,
      0,
      0,
      1
    );
  }
  die() {
    if (!this.isDead) {
      this.isDead = true;
      this.deathTimer = 20;
      this.xVelocity = 0;
    }
  }
  updateBB() {
    this.lastBB = this.BB;
    const yOffSet = 6; // Make sprite goes below the ground slightly not the bounding box itself
    this.BB = new BoundingBox(
      this.x,
      this.y,
      130 * this.scale,
      96 * this.scale - yOffSet
    );
  }
  update() {
    let that = this;
    this.attackCooldown--;
    if (this.currentState == 0) {
      //apply gravity to the enemy
      that.yVelocity += that.gravity;
      //move in the direction of the player
      if (this.x < this.game.player.x) {
        that.direction = -1;
        that.dirIndex = 0;
      } else {
        that.direction = 1;
        that.dirIndex = 1;
      }
      that.x += that.xVelocity * that.direction;
      that.y += that.yVelocity;
      //update out bounding box every frame
      that.updateBB();
      //check if we need to attack
      if (
        this.attackCooldown <= 0 &&
        Math.abs(this.x - this.game.player.x) < 200
      ) {
        this.attackCooldown = 500;
        this.attacking = 200;
        this.currentState = 1;
      }
    } else if (this.currentState == 1) {
      //stand and attack
      if (this.attacking > 100 && this.attacking % 20 == 0) {
        //spwan the little things!
        this.game.addEntityAtIndex(
          new GroundProjectile(
            this.game,
            that.x + 40,
            that.y + 140,
            this.getRandomInt(4, 5),
            -3,
            -1,
            this.gravity
          ),
          this.entityArrayPos-1
        );
        this.game.addEntityAtIndex(
          new GroundProjectile(
            this.game,
            that.x + 260,
            that.y + 140,
            this.getRandomInt(4, 5),
            -3,
            1,
            this.gravity
          ),
          this.entityArrayPos-1
        );
      }
      if (this.attacking > 0) {
        this.attacking--;
      } else {
        this.currentState = 0;
      }
    }

    //collisions
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
        //if falling check below
        if (that.yVelocity > 0) {
          if (entity instanceof Ground && that.lastBB.bottom <= entity.BB.top) {
            // ws above last tick
            that.y = entity.BB.top - that.BB.height; //set to top of bounding box of ground
            that.yVelocity = 0;
            that.updateBB();
          }
        } else if (that.direction == 1) {
          if (entity instanceof Ground && that.lastBB.left < entity.BB.right) {
            that.x = entity.BB.right;
            that.direction = -1;
            that.dirIndex = 0;
            that.updateBB();
          }
        } else if (that.direction == -1) {
          if (entity instanceof Ground && that.lastBB.right > entity.BB.left) {
            // is in the wall
            //subtract because origin is on left
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
    // console.log(that.currentState, that.yVelocity)
    that.animations[that.dirIndex][this.currentState].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x,
      that.y - that.game.camera.y, // + that.BB.height / 4,
      that.scale
    );

    if (params.debug) {
      ctx.strokeStyle = "Orange";
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

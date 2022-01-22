class Player {
  constructor(game, x, y, gravity) {
    Object.assign(this, { game, x, y });

    this.game.player = this;
    this.gravity = gravity;

    this.facing = 0; // 0 = right, 1 = left

    /* States:
        0 - idle
        1 - run
        2 - dash
        3 - jump
        ...
        */
    this.state = 0;
    this.dead = false;

    this.velocity = { x: 0, y: 0 };
    this.veloConst = 6.9;
    this.fallAcc = 562.5;

    this.updateBB();

    this.animations = [];
    this.loadAnimations();
  }

  loadAnimations() {
    for (var i = 0; i < 4; i++) {
      // four states
      this.animations.push([]);
      for (var k = 0; k < 2; k++) {
        // two directions
        this.animations[i].push([]);
      }
    }

    // Idle - State 0
    // Face right = 0
    this.animations[0][0] = new Animator(
      ASSET_MANAGER.getAsset('./sprites/player/zerox4idle.png'),
      0,
      0,
      44,
      48,
      5,
      0.1,
      4,
      false,
      true
    );

    // // Face left = 1
    this.animations[0][1] = new Animator(
      ASSET_MANAGER.getAsset('./sprites/player/zerox4idle.png'),
      254,
      0,
      44,
      48,
      5,
      0.1,
      4,
      1,
      true
    );

    // Run - State 1
    // Face right = 0
    this.animations[1][0] = new Animator(
      ASSET_MANAGER.getAsset('./sprites/player/zerox4move.png'),
      0,
      0,
      36,
      49,
      16,
      0.05,
      17,
      false,
      true
    );

    // // Face left = 1
    this.animations[1][1] = new Animator(
      ASSET_MANAGER.getAsset('./sprites/player/zerox4move.png'),
      855,
      0,
      36,
      49,
      15,
      0.05,
      17,
      true,
      true
    );
  }

  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x, this.y, 48 * 2, 48 * 2);
  }

  // TODO
  die() {
    // this.velocity.y = -640;
    this.dead = true;
  }

  update() {
    // let that = this;
    // that.velocity.y += that.gravity

    // that.x += that.velocity.x * that.facing
    // that.y += that.velocity.y;

    const TICK = this.game.clockTick;

    const MIN_RUN = 10;
    const MAX_RUN = 120;

    const MAX_DASH = 200;

    const ACC_WALK = 500;

    const DEC_REL = 600;
    const DEC_SKID = 400;

    const MAX_FALL = 270;

    if (this.dead) {
      // Do death stuff
    } else {
      // update velocity

      if (this.state !== 3) {
        // not jumping
        // ground physics
        if (Math.abs(this.velocity.x) < MIN_RUN) {
          // slower than a walk
          // starting, stopping or turning around
          this.velocity.x = 0;
          this.state = 0;
          if (this.game.keys.KeyA) {
            this.velocity.x -= MIN_RUN;
          }
          if (this.game.keys.KeyD) {
            this.velocity.x += MIN_RUN;
          }
        } else if (Math.abs(this.velocity.x) >= MIN_RUN) {
          // faster than a walk
          // accelerating or decelerating
          if (this.facing === 0) {
            if (this.game.keys.KeyD && !this.game.keys.KeyA) {
              this.velocity.x += ACC_WALK * TICK;
            } else if (this.game.keys.KeyA && !this.game.keys.KeyD) {
              this.velocity.x -= DEC_SKID * TICK;
            } else {
              this.velocity.x -= DEC_REL * TICK;
            }
          }
          if (this.facing === 1) {
            if (this.game.keys.KeyA && !this.game.keys.KeyD) {
              this.velocity.x -= ACC_WALK * TICK;
            } else if (this.game.keys.KeyD && !this.game.keys.KeyA) {
              this.velocity.x += DEC_SKID * TICK;
            } else {
              this.velocity.x += DEC_REL * TICK;
            }
          }
        }
      }
    }

    this.velocity.y += this.fallAcc * TICK;

    // max speed calculation
    if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
    if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

    if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
    if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;

    // update position
    // scale = 3
    this.x += this.velocity.x * TICK * 3;
    this.y += this.velocity.y * TICK * 3;
    this.updateBB();

    // Fall off map = dead
    // Assuming block width is 64
    if (this.y > 64 * 16) this.die();

    // collision
    var that = this;
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
        if (that.velocity.y > 0) {
          // falling
          if (
            entity instanceof Ground && // landing
            that.lastBB.bottom <= entity.BB.top
          ) {
            that.y = entity.BB.top - that.BB.height; //set to top of bounding box of ground
            that.velocity.y = 0;
            if (that.state === 3) that.state = 0; // set state to idle
            that.updateBB();
          }
        }
      }
    });

    // update state
    if (this.state !== 4) {
      if (Math.abs(this.velocity.x) >= MIN_RUN) this.state = 1;
      else this.state = 0;
    } else {
    }

    // update direction
    if (this.velocity.x < 0) this.facing = 1;
    if (this.velocity.x > 0) this.facing = 0;
  }

  draw(ctx) {
    let that = this;

    // console.log(that.state);
    // console.log(that.facing);
    that.animations[that.state][that.facing].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x, // camera sidescrolling
      that.y,
      2
    );
    // ctx.strokeStyle = 'Blue';
    // ctx.strokeRect(that.BB.x - that.game.camera.x, that.BB.y, that.BB.width, that.BB.height);
  }
}

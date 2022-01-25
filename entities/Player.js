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
        4 - falling
        ...
        */
    this.state = 0;
    this.dead = false;

    this.velocity = { x: 0, y: 0 };
    this.veloConst = 6.9;
    this.fallAcc = 562.5;

    this.currentSize = { width: 0, height: 0 };
    this.updateBB();

    this.animations = [];
    this.idleSprite = ASSET_MANAGER.getAsset(
      './sprites/player/player-idle-43x48.png'
    );
    this.runSprite = ASSET_MANAGER.getAsset(
      './sprites/player/player-run-51x49.png'
    );
    this.jumpSprite = ASSET_MANAGER.getAsset(
      './sprites/player/player-jump-47x80.png'
    );

    this.loadAnimations();
  }

  loadAnimations() {
    for (var i = 0; i < 5; i++) {
      // five states
      this.animations.push([]);
      for (var k = 0; k < 2; k++) {
        // two directions
        this.animations[i].push([]);
      }
    }
    const that = this;

    // Idle - State 0
    // Face right = 0
    this.animations[0][0] = new Animator(
      this.idleSprite,
      0,
      0,
      43,
      48,
      5,
      0.18,
      0,
      false,
      true
    );

    // Face left = 1
    this.animations[0][1] = new Animator(
      this.idleSprite,
      215,
      0,
      43,
      48,
      5,
      0.18,
      0,
      true,
      true
    );

    // Run - State 1
    // Face right = 0
    this.animations[1][0] = new Animator(
      this.runSprite,
      95,
      0,
      51,
      49,
      14,
      0.05,
      0,
      false,
      true
    );

    // Face left = 1
    this.animations[1][1] = new Animator(
      this.runSprite,
      823,
      0,
      51,
      49,
      14,
      0.05,
      0,
      true,
      true
    );

    // Jump - State 3
    // Face right = 0
    this.animations[3][0] = new Animator(
      this.jumpSprite,
      0,
      0,
      47,
      80,
      16,
      0.07,
      0,
      false,
      true
    );
    // Face left = 1
    this.animations[3][1] = new Animator(
      this.jumpSprite,
      752,
      0,
      47,
      80,
      16,
      0.05,
      0,
      true,
      true
    );

    // Fall - State 4 - frames 10,11,12
    // Face right = 0
    this.animations[4][0] = new Animator(
      this.jumpSprite,
      423,
      0,
      47,
      80,
      3,
      0.07,
      0,
      false,
      true
    );
    // Face left = 1
    this.animations[4][1] = new Animator(
      this.jumpSprite,
      940,
      0,
      47,
      80,
      3,
      0.05,
      0,
      true,
      true
    );
  }

  updateBB() {
    this.lastBB = this.BB;
    const that = this;

    const xOffset = 0;
    const yOffset = 10; // Make player sprite goes below the ground slightly not the bounding box itself

    // Get the right bounding box for the different states
    switch (this.state) {
      case 0:
        that.currentSize.width = 43;
        that.currentSize.height = 48;
        break;
      case 1:
        that.currentSize.width = 51;
        that.currentSize.height = 49;
        break;
      case 4:
      case 3:
        that.currentSize.width = 47;
        that.currentSize.height = 49; //Supposed to be 80 but the bottom edge of box goes below the ground
        break;
    }
    this.BB = new BoundingBox(
      this.x,
      this.y,
      (this.currentSize.width - xOffset) * 2,
      (this.currentSize.height - yOffset) * 2
    );
  }

  // TODO
  die() {
    // this.velocity.y = -640;
    this.dead = true;
  }

  update() {
    const TICK = this.game.clockTick;

    const MIN_RUN = 10;
    const MAX_RUN = 120;

    const MAX_DASH = 200;

    const ACC_RUN = 500;

    const DEC_REL = 600;
    const DEC_SKID = 500;

    const STOP_FALL = 1500;
    const STOP_FALL_A = 450;
    const RUN_FALL = 2025;
    const RUN_FALL_A = 562.5;
    const MAX_FALL = 270;

    if (this.dead) {
      // Do death stuff
    } else {
      // update velocity

      if (this.state !== 3 && this.state !== 4) {
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
              this.velocity.x += ACC_RUN * TICK;
            } else if (this.game.keys.KeyA && !this.game.keys.KeyD) {
              this.velocity.x -= DEC_SKID * TICK;
            } else {
              this.velocity.x -= DEC_REL * TICK;
            }
          }
          if (this.facing === 1) {
            if (this.game.keys.KeyA && !this.game.keys.KeyD) {
              this.velocity.x -= ACC_RUN * TICK;
            } else if (this.game.keys.KeyD && !this.game.keys.KeyA) {
              this.velocity.x += DEC_SKID * TICK;
            } else {
              this.velocity.x += DEC_REL * TICK;
            }
          }
        }

        // Jump
        if (this.game.keys.Space) {
          if (Math.abs(this.velocity.x) < 16) {
            // Jump height while idle
            this.velocity.y = -240;
            this.fallAcc = STOP_FALL;
          } else {
            // Jump height while there's side way momentum
            this.velocity.y = -300;
            this.fallAcc = RUN_FALL;
          }

          // Set state to jump (3)
          this.state = 3;
          // Set the jump animation to start at the beginning
          this.animations[this.state][this.facing].elapsedTime = 0;
        }
      } else {
        // air physics
        // vertical physics
        if (this.velocity.y < 0 && this.game.keys.Space) {
          // holding space while jumping jumps higher
          if (this.fallAcc === STOP_FALL)
            this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
          if (this.fallAcc === RUN_FALL)
            this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
        } else if (this.velocity.y > 0 && !this.game.keys.Space) {
          this.state = 4;
        }
        // if (
        //   this.velocity.y > 0 &&
        //   !this.game.keys.Space &&
        //   !this.game.keys.KeyA &&
        //   !this.game.keys.KeyD
        // ) {
        //   this.state = 4;
        // }

        // horizontal physics
        if (this.game.keys.KeyD && !this.game.keys.KeyA) {
          this.velocity.x += ACC_RUN * TICK;
        } else if (this.game.keys.KeyA && !this.game.keys.KeyD) {
          this.velocity.x -= ACC_RUN * TICK;
        } else {
          // do nothing
        }
      }

      // Faling
      if (this.velocity.y > 0) {
        this.state = 4;
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
            if (that.state === 3 || that.state === 4) that.state = 0; // set state to idle
            that.updateBB();
          }
        } else if (that.velocity.x > 0) {
          if (entity instanceof Ground && that.lastBB.left < entity.BB.right) {
            that.x = entity.BB.left - that.BB.width;
          }
        } else if (that.velocity.x < 0) {
          if (entity instanceof Ground && that.lastBB.right > entity.BB.left) {
            that.x = entity.BB.right;
          }
        }

        // TODO
        if (that.velocity.y < 0) {
          // jumping
          // hit ceiling...
        }

        // TODO: Wall hang
        // if (that.velocity.y < 0 && that.velocity.x < 0) {
        //   console.log('Jump and to the left');
        // }
        // if (that.velocity.y < 0 && that.velocity.x > 0) {
        //   console.log('Jump and to the right');
        // }
      }
    });

    // update state
    if (this.state !== 3 && that.state !== 4) {
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

    that.animations[that.state][that.facing].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x, // camera sidescrolling
      that.y - that.game.camera.y,
      2
    );

    // ctx.strokeStyle = 'Blue';
    // ctx.strokeRect(
    //   that.BB.x - that.game.camera.x,
    //   that.BB.y - that.game.camera.y,
    //   that.BB.width,
    //   that.BB.height
    // );
  }
}

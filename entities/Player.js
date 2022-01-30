class Player {
  constructor(game, x, y, gravity) {
    Object.assign(this, { game, x, y });

    this.game.player = this;
    this.gravity = gravity;
    this.animationTick = 0;
    this.attackSpeed = 0.01
    this.facing = 0; // 0 = right, 1 = left

    /* States:
        0 - idle
        1 - run
        2 - dash
        3 - jump
        4 - falling
        5 - wall hang
        ...
        */
    this.state = 0;
    this.dead = false;

    this.velocity = { x: 0, y: 0 };
    this.veloConst = 6.9;
    this.fallAcc = 400;

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
    this.wallhangSprite = ASSET_MANAGER.getAsset(
      './sprites/player/player-wallhang-36x65.png'
    );

    this.attackRight = ASSET_MANAGER.getAsset(
      './sprites/player/zero_attack_right_one_92_64_2.png'
    );
    this.attackRightTwo = ASSET_MANAGER.getAsset(
      './sprites/player/zero_attack_right_two.png'
    );
    this.attackRightThree = ASSET_MANAGER.getAsset(
      './sprites/player/zero_attack_right_three_114x64-Sheet.png'
    );

    this.loadAnimations();

      // Dat GUI stuff
      this.gui = new dat.GUI();
      this.playerFolder = this.gui.addFolder("Player values");
      this.testValues = {
        attackSpeed: this.attackSpeed
      };
      this.playerFolder
          .add(this.testValues, "attackSpeed")
          .min(0.005)
          .max(0.5)
          .step(0.005)
          .onChange(val => {
              this.attackSpeed = val;
              this.loadAnimations();
          })
          .name("Attack Speed");
  }

  loadAnimations() {
    for (var i = 0; i < 9; i++) {
      // six states
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
      0.07,
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
      0.07,
      0,
      true,
      true
    );

    // Wall hang - State 5
    // Face right = 0
    this.animations[5][0] = new Animator(
      this.wallhangSprite,
      0,
      0,
      45,
      65,
      2,
      0.12,
      0,
      false,
      true
    );
    // Face left = 1
    this.animations[5][1] = new Animator(
      this.wallhangSprite,
      90,
      0,
      45,
      65,
      2,
      0.12,
      0,
      true,
      true
    );
     // Face right = 0
     this.animations[6][0] = new Animator(
      this.attackRight,
      0,
      0,
      92,
      64,
      12,
      this.attackSpeed,
      2,
      false,
      false
    );
    // Face right slash two
    this.animations[7][0] = new Animator(
      this.attackRightTwo,
      0,
      0,
      114,
      64,
      11,
      this.attackSpeed,
      1,
      false,
      false
    );
    // Face right slash 3
    this.animations[8][0] = new Animator(
      this.attackRightThree,
      0,
      0,
      112,
      74,
      12,
      this.attackSpeed,
      2,
      false,
      false
    );
  }

  updateBB() {
    this.lastBB = this.BB;
    const that = this;

    let xOffset = 0;
    let yOffset = 0;
    let widthOffset = 0;
    let heightOffset = 10; // Make player sprite goes below the ground slightly not the bounding box itself
    // Offsetting the bounding box like this might make things look weird later when it comes to implementing pogo

    // Get the right bounding box for the different states
    switch (this.state) {
      case 0:
        that.currentSize.width = 43;
        that.currentSize.height = 48;
        break;
      case 1:
        that.currentSize.width = 45;
        that.currentSize.height = 49;
        xOffset = 0;
        if (this.facing === 0) {
          xOffset = 10;
        }
        break;
      case 3:
        that.currentSize.width = 45;
        that.currentSize.height = 49; //Supposed to be 80 but the bottom edge of box goes below the ground
        yOffset = 0;
        break;
      case 4:
        that.currentSize.width = 45;
        that.currentSize.height = 49;
        yOffset = 35;
        break;
      case 5:
        that.currentSize.width = 45;
        that.currentSize.height = 50;
        // if (this.facing === 0) {
        //   xOffset = 20;
        // }
        break;
    }
    this.BB = new BoundingBox(
      this.x + xOffset,
      this.y + yOffset,
      (this.currentSize.width - widthOffset) * 2,
      (this.currentSize.height - heightOffset) * 2
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
    const STOP_FALL_A = 400;
    const RUN_FALL = 2025;
    const RUN_FALL_A = 500;
    const MAX_FALL = 270;

    //testing
    if(this.game.keys.KeyJ) this.animationTick = 0;
    if(this.game.keys.KeyK) this.animationTick = 1;
    if(this.game.keys.KeyL) this.animationTick = 2;


    if (this.dead) {
      // Do death stuff
    } else {
      // update velocity

      if (this.state !== 3 && this.state !== 4 && this.state !== 5) {
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

        this.velocity.y += this.fallAcc * TICK;

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
        }
        if (that.velocity.y < 0) {
          // jumping
          // hit ceiling...
          if (entity instanceof Ground && that.lastBB.top >= entity.BB.bottom) {
            that.velocity.y = 0;
          }
        }

        // Side collisions
        if (
          entity instanceof Ground &&
          entity.type &&
          that.BB.collide(entity.BB)
        ) {
          if (that.BB.collide(entity.leftBB)) {
            // Right side collision
            that.x = entity.BB.left - that.BB.width;
            if (that.velocity.x > 0) that.velocity.x = 0;
          }
          if (that.BB.collide(entity.rightBB)) {
            // Left side collision
            that.x = entity.BB.right;
            if (that.velocity.x < 0) that.velocity.x = 0;
          }
          // wall hanging
          if (
            !that.BB.collide(entity.bottomBB) &&
            !that.BB.collide(entity.topBB)
          ) {
            if (that.velocity.y > 0 && !that.game.keys.Space) {
              // falling and not holding jump
              // Set state to wall hang
              that.state = 5;
              that.velocity.y = -12;
            } else if (that.velocity.y > 0 && that.game.keys.Space) {
              // falling then hit jump, bounce from wall
              if (that.facing === 1) {
                that.velocity.x = 100;
              } else {
                that.velocity.x = -100;
              }
              that.velocity.y = -200;
              that.fallAcc = STOP_FALL;
              that.state = 3;
            } else if (that.velocity.y === 0) {
              // Prevent player from being stuck in wall hang animation
              // when touches the ground
              that.state = 0;
            }
          }
          that.updateBB();
        }
      }
    });

    // update state
    if (this.state !== 3 && that.state !== 4 && that.state !== 5) {
      if (Math.abs(this.velocity.x) >= MIN_RUN) {
        this.state = 1;
        this.updateBB();
      } else this.state = 0;
    } else {
    }

    // update direction
    if (this.velocity.x < 0) this.facing = 1;
    if (this.velocity.x > 0) this.facing = 0;
  }

  draw(ctx) {
    let that = this;
    //actual animation code
    that.animations[that.state][that.facing].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x, // camera sidescrolling
      that.y - that.game.camera.y,
      2
    );
    //12,11,10
    //testing attack code
    // if(this.animationTick == 0){
    //   that.animations[6+ this.animationTick][0].drawFrame(
    //     that.game.clockTick,
    //     ctx,
    //     that.x - that.game.camera.x, // camera sidescrolling
    //     that.y - that.game.camera.y,
    //     2
    //   );
    // } else if (this.animationTick == 1){
    //   that.animations[6 + this.animationTick][0].drawFrame(
    //     that.game.clockTick,
    //     ctx,
    //     that.x - that.game.camera.x - 20, // camera sidescrolling
    //     that.y - that.game.camera.y,
    //     2
    //   );
    // } else if(this.animationTick == 2){
    //   that.animations[6 + this.animationTick][0].drawFrame(
    //     that.game.clockTick,
    //     ctx,
    //     that.x - that.game.camera.x, // camera sidescrolling
    //     that.y - that.game.camera.y,
    //     2
    //   );
    // }
    // console.log(this.animations[6][0].isDone(), this.animations[6][0].elapsedTime)
    // if(this.animations[6 + this.animationTick][0].isDone()){
    //   this.animations[6 + this.animationTick][0].elapsedTime = 0;
    //   this.animationTick = (this.animationTick+ 1) % 3;

    // }
    // if(this.animationTick == 0){
    //   that.animations[6][0].drawFrame(
    //     that.game.clockTick,
    //     ctx,
    //     that.x - that.game.camera.x, // camera sidescrolling
    //     that.y - that.game.camera.y,
    //     2
    //   );
    // } else if (this.animationTick == 1){
    //   that.animations[7][0].drawFrame(
    //     that.game.clockTick,
    //     ctx,
    //     that.x - that.game.camera.x - 20, // camera sidescrolling
    //     that.y - that.game.camera.y,
    //     2
    //   );
    // } else if(this.animationTick == 2){
    //   that.animations[8][0].drawFrame(
    //     that.game.clockTick,
    //     ctx,
    //     that.x - that.game.camera.x, // camera sidescrolling
    //     that.y - that.game.camera.y,
    //     2
    //   );
    // }
    if (params.debug) {
      ctx.strokeStyle = 'Blue';
      ctx.strokeRect(
        that.BB.x - that.game.camera.x,
        that.BB.y - that.game.camera.y,
        that.BB.width,
        that.BB.height
      );
    }
  }
}

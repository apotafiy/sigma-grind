class Mettaur {
  /**
   * time per frame
   */
  /**
   * 0 = walk left
   * 1 = walk right
   * 2 = jump
   */
  constructor(game, x, y, gravity) {
    this.game = game;
    this.currentState = 0;
    this.animations = [[],[]];
    this.xVelocity = -2;
    this.yVelocity = 0;
    this.x = x;
    this.y = y;
    this.gravity = gravity;
    this.direction = -1;
    this.dirIndex = 0;
    this.loadAnimation();
    //bounding box
    this.BB = new BoundingBox(this.x, this.y, 32, 36);
    this.lastBB = this.BB;
  }
  loadAnimation() {
    this.animations[1][0] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),
      0,
      0,
      32,
      36,
      8,
      0.1,
      0,
      0,
      1
    );
    this.animations[1][1] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-jump.png"),
      0,
      0,
      32,
      36,
      7,
      0.1,
      0,
      0,
      1,
      0,
      0,
      1
    );
    this.animations[1][2] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-duck.png"),
      0,
      0,
      32,
      36,
      7,
      0.1,
      0,
      0,
      1
    );
    this.animations[1][3] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),
      0,
      0,
      36,
      38,
      6,
      0.1,
      0,
      0,
      1
    );
    this.animations[1][4] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),
      0,
      0,
      36,
      38,
      6,
      0.5,
      0,
      0,
      1

    );
    //right facing Animations
    this.animations[0][0] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk-right.png"),
      0,
      0,
      32,
      36,
      8,
      0.1,
      0,
      1,
      1
    );
    this.animations[0][1] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-jump-right.png"),
      0,
      0,
      32,
      36,
      7,
      0.1,
      0,
      1,
      1
    );
  }
  updateBB() {
    this.lastBB = this.BB;
    this.BB = new BoundingBox(this.x, this.y, 64, 72);
  }
  update() {
    let that = this;
    //apply gravity to the enemy
    that.yVelocity += that.gravity;
    //apply the velocity to the position
    that.x += that.xVelocity * that.direction;
    that.y += that.yVelocity;
    //update out bounding box every frame
    that.updateBB();
    //update the animation 
    //collisions
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
        //if falling check below
        if (that.yVelocity > 0) {
          // console.log("triggered check 1")
          if (entity instanceof Ground && that.lastBB.bottom <= entity.BB.top) {
            // ws above last tick
            that.y = entity.BB.top - that.BB.height; //set to top of bounding box of ground
            that.yVelocity = 0;
            that.updateBB();
          }
        } else if (that.direction == 1) {
          // console.log("Checking");
          // console.log("triggered check 2")
          if (entity instanceof Ground && that.lastBB.left < entity.BB.right) {
            // is in the wall
            // console.log("HIT!")
            that.x = entity.BB.right;
            that.direction = -1;
            that.dirIndex = 0;
          }
        } else if (that.direction == -1) {
          // console.log("triggered check 3")
          // console.log("Checking");
          if (entity instanceof Ground && that.lastBB.right > entity.BB.left) {
            // is in the wall
            //subtract because origin is on left
            that.x = entity.BB.left - that.BB.width;
            that.direction = 1;
            that.dirIndex = 1;
          }
        }
      }
    });
    // console.log(that.x, that.y)
    // console.log(that.xVelocity * that.direction, that.yVelocity );
    if(that.yVelocity > 0){
      that.currentState = 1;
    } else{
      that.currentState = 0;
    }
    console.log(that.yVelocity);
    console.log("end update");
  }

  draw(ctx) {
    let that = this;
    console.log(that.currentState, that.yVelocity);
    that.animations[that.dirIndex][that.currentState].drawFrame(
      that.game.clockTick,
      ctx,
      that.x,
      that.y,
      2
    );
    ctx.strokeStyle = "Red";
    ctx.strokeRect(that.BB.x, that.BB.y, that.BB.width, that.BB.height);
  }
}

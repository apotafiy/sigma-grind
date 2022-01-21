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
    this.animations = [];
    this.loadAnimation();
    this.xVelocity = -2;
    this.yVelocity = 0;
    this.x = x;
    this.y = y;
    this.gravity = gravity;
    //bounding box
    this.BB = new BoundingBox(this.x, this.y, 32, 36);
    this.lastBB = this.BB;
  }
  loadAnimation() {
    this.animations[0] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),
      0,
      0,
      32,
      36,
      8,
      0.1
    );
    this.animations[1] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-jump.png"),
      0,
      0,
      32,
      36,
      7,
      0.1
    );
    this.animations[2] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-duck.png"),
      0,
      0,
      32,
      36,
      7,
      0.1
    );
    this.animations[3] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),
      0,
      0,
      36,
      38,
      6,
      0.1
    );
    this.animations[4] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),
      0,
      0,
      36,
      38,
      6,
      0.5
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
    that.x += that.xVelocity;
    that.y += that.yVelocity;
    window.addEventListener(
      "keydown",
      function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        //   console.log(event.key);
        switch (event.key) {
          case "q":
            that.currentState = 0;
            break;
          case "w":
            that.currentState = 1;
            break;
          case "e":
            that.currentState = 2;
            break;
          case "r":
            that.currentState = 3;
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      },
      true
    );
      //update out bounding box every frame
      that.updateBB();

      //collisions
      this.game.entities.forEach(function(entity) {
        if(entity.BB && that.BB.collide(entity.BB)){
          //if falling check below
          if(that.yVelocity > 0){
            if((entity instanceof Ground) &&
             that.lastBB.bottom <= entity.BB.top){ // ws above last tick
              that.y = entity.BB.top - that.BB.height ; //set to top of bounding box of ground
              that.yVelocity = 0;
              that.updateBB();
            }
          }
        }
      });

  }

  draw(ctx) {
    let that = this;
    that.animations[that.currentState].drawFrame(
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

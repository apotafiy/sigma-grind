class Mettaur{
    /** 
     * time per frame
     */
    /**
     * 0 = walk left
     * 1 = walk right
     * 2 = jump
     */
	constructor(game, x, y, gravity){
		this.game = game;
        this.currentState = 0;
        this.animations = [];
        this.loadAnimation();
        this.xVelocity = -5;
        this.yVelocity = 0;
        this.x = x;
        this.y = y;
        this.gravity = gravity;
		// this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),0, 0,32,36,8,0.1);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-jump.png"),0, 0,32,36,7,0.08);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-duck.png"),0, 0,32,36,6,0.5);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),0, 0,36,38,6,0.5);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),0, 0,36,38,6,0.5);
        

	};
    loadAnimation() {
        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),0, 0,32,36,8,0.1);
        this.animations[1]= new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-jump.png"),0, 0,32,36,7,0.1);
        this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-duck.png"),0, 0,32,36,7,0.1);
        this.animations[3] = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),0, 0,36,38,6,0.1);
        this.animations[4] = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),0, 0,36,38,6,0.5);
    }
	update() {

      let that = this;
      //apply gravity to the enemy
      that.yVelocity += that.gravity;
      //apply the velocity to the position 
      that.x += that.xVelocity;
      that.y += that.yVelocity;
      window.addEventListener("keydown", function (event) {
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
        }, true);
	};

	draw(ctx) {
		// console.log(this.animator.currentFrame());
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
		// console.log(this.game.clockTick);
		// ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),0,0);
	};
}
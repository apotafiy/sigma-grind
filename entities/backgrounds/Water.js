class Water{
    /**
     *  draw method params
     * start x position
     * start y position
     * sprite width
     * sprite height
     * frame count
     * 
     * time per frame
     */
    /**
     * 0 = walk left
     * 1 = walk right
     * 2 = jump
     */
	constructor(game){
		this.game = game;
        this.animations = [];
        this.xoffset = 0;
        this.loadAnimation();
	};
    loadAnimation() {
        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./sprites/backgrounds/water.png"),0, 0,512,2800,1,1);
    }
	update() {
        //Temporary
        let that = this;
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
              return; // Do nothing if the event was already processed
            }   
        //   console.log(event.key);
            switch (event.key) {
              case "a":
                that.xoffset += 2;
                console.log(that.xoffset);
                break;
              case "d":
                that.xoffset -= 2;
                console.log(that.xoffset);
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
		this.animations[0].drawFrame(this.game.clockTick, ctx, 0 + this.xoffset, 0, 2);
		// console.log(this.game.clockTick);
		// ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),0,0);
	};
}
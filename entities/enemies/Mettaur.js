class Mettaur{
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
        this.currentState = 0;
		// this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),0, 0,32,36,8,0.1);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-jump.png"),0, 0,32,36,7,0.08);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-duck.png"),0, 0,32,36,6,0.5);
        this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),0, 0,36,38,6,0.5);
        

	};
	update() {
	};

	draw(ctx) {
		console.log(this.animator.currentFrame());
		this.animator.drawFrame(this.game.clockTick, ctx, 0, 0, 3);
		console.log(this.game.clockTick);
		// ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),0,0);
	};
}
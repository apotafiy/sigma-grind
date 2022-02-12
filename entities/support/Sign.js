class Sign {
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
    constructor(game, x, y, dir ) {
        this.scale = 1;
        this.game = game;
        this.animations = [[], []];
        this.x = x * 64;
        this.y = y * 64;
        this.direction = dir
        this.xOffset = 0;
        this.yOffSet = 0;
        this.loadAnimation();
        //bounding box
        this.BB = new BoundingBox(this.x, this.y, 38 * this.scale, 35 * this.scale);
        this.lastBB = this.BB;
        this.setOffset(dir);
;

    }
    /**
     * 0 is spawn in
     * 1 is warp out
     * 2 is sitting
     */
    setOffset(dir){
        switch(dir){
            case 0:
                this.xOffset = 0;
                this.yOffSet = 10;
                return;
            case 1:
                this.xOffset = 0;
                this.yOffSet = 10;
                return;
            case 2:
                this.xOffset = 10;
                this.yOffSet = -0;
                return;
            case 3:
                this.xOffset = 10;
                this.yOffSet = -0;
                return;
            case 4:
                this.xOffset = -10;
                this.yOffSet = -0;
                return;
            case 5:
                this.xOffset = -10;
                this.yOffSet = -0;
                return;
            default:
                this.xOffset = 10;
                this.yOffSet = 0;
        }
    }
    loadAnimation() {
        this.animations[0][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/misc/sign_64x64.png'),
            0 + 64*this.direction,
            0,
            64,
            64,
            1,
            2,
            0,
            0,
            0
        );


    }
    updateBB() {
        this.lastBB = this.BB;
        const yOffSet = 6; // Make sprite goes below the ground slightly not the bounding box itself
        this.BB = new BoundingBox(this.x, this.y, 64 * this.scale, (64 - yOffSet) * this.scale);
    }
    update() {

    
    }

    draw(ctx) {
        let that = this;
        that.animations[0][0].drawFrame(
            that.game.clockTick,
            ctx,
            that.x - that.game.camera.x + that.xOffset,
            that.y - that.game.camera.y + that.yOffSet,
            this.scale
        );
        if (params.debug) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(
                that.BB.x - that.game.camera.x + that.xOffset,
                that.BB.y - that.game.camera.y + that.yOffset,
                that.BB.width,
                that.BB.height
            );
        }
    }
}

class Water {
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
    constructor(game) {
        this.game = game;
        this.animations = [];
        this.xoffset = 0;
        this.loadAnimation();
    }
    loadAnimation() {
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/backgrounds/water.png'),
            0,
            0,
            2800,
            240,
            1,
            1,
            0,
            0,
            1
        );
    }
    update() {}

    draw(ctx) {
        this.animations[0].drawFrame(
            this.game.clockTick,
            ctx,
            0 + this.xoffset--,
            0,
            2
        );
    }
}

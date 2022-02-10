class Spike {
    /**
     *
     * @param {object} game
     * @param {num} x
     * @param {num} y
     * @param {int} horizontal
     * @param {int} vertical
     * @param {int} orientation 0 = up, 1 = right, 2 = down, 3 = left
     */
    constructor(game, x, y, horizontal, vertical, orientation) {
        this.game = game;
        this.x = x * 64;
        this.y = y * 64;
        this.horizontal = horizontal;
        this.vertical = vertical;
        this.orientation = orientation * 320;
        this.scale = 0.2;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            64 * this.horizontal,
            64 * this.vertical
        );

        this.leftBB = new BoundingBox(
            this.xstart,
            this.ystart + 5,
            (64 * horizontal) / 2,
            64 * vertical - 15
        );
        this.rightBB = new BoundingBox(
            this.xstart + (64 * horizontal) / 2,
            this.ystart + 5,
            (64 * horizontal) / 2,
            64 * vertical - 15
        );

        // Need bottom bounding box to prevent
        // player teleportation when head hit top platform
        this.bottomBB = new BoundingBox(
            this.xstart + 10,
            this.ystart + 64 * vertical,
            64 * horizontal - 20,
            (64 * vertical) / 12 // Making it thinner
        );

        // Need this to fix player wall hanging
        // too high with his hand in the air
        // like he just dont care
        this.topBB = new BoundingBox(
            this.xstart,
            this.ystart - (64 * vertical) / 50 + 5, // Making it goes above the ground a bit
            64 * horizontal,
            (64 * vertical) / 50 // Making it thinner
        );

        this.animation = new Animator(
            ASSET_MANAGER.getAsset('./sprites/spike1.png'),
            0,
            0 + this.orientation,
            320,
            320,
            1,
            1,
            0,
            false,
            false
        );
    }

    update() {}

    draw(ctx) {
        for (let i = 0; i < this.vertical; i++) {
            for (let j = 0; j < this.horizontal; j++) {
                this.animation.drawFrame(
                    this.game.clockTick,
                    ctx,
                    this.x - this.game.camera.x + 64 * j,
                    this.y - this.game.camera.y + 64 * i,
                    this.scale
                );
            }
        }

        if (params.debug) {
            ctx.strokeStyle = 'Red';
            if (this.BB) {
                ctx.strokeRect(
                    this.BB.x - this.game.camera.x,
                    this.BB.y - this.game.camera.y,
                    this.BB.width,
                    this.BB.height
                );
            }
        }
    }
}

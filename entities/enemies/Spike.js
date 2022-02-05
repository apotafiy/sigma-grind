class Spike {
    constructor(game, x, y, orientation) {
        this.game = game;
        this.x = x * 64;
        this.y = y * 64;
        this.orientation = orientation * 320;
        this.scale = 0.2;
        this.BB = new BoundingBox(this.x, this.y, 64, 64);
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
        this.animation.drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.scale
        );

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

class Drill {
    constructor(game, x, y) {
        this.x = x * 64;
        this.y = y * 64;
        this.game = game;
        this.BB = new BoundingBox(this.x, this.y, 51 * 3, 20 * 3);
        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/drill/drill_ready.png'),
            0,
            0,
            51,
            44,
            5,
            0.2,
            0,
            false,
            true
        );
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/drill/drill.png'),
            0,
            0,
            51,
            19,
            3,
            0.05,
            0,
            false,
            true
        );
    }

    update() {}

    draw(ctx) {
        this.animations[0].drawFrame(
            this.game.clockTick,
            ctx,
            this.x + 210 - this.game.camera.x, //- this.game.camera.x,
            this.y + 50 - this.game.camera.y, //- this.game.camera.y,
            3
        );
        this.animations[1].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x, //- this.game.camera.x,
            this.y - this.game.camera.y, //- this.game.camera.y,
            3
        );
        if (params.debug) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(
                this.BB.x - this.game.camera.x,
                this.BB.y - this.game.camera.y,
                this.BB.width,
                this.BB.height
            );
        }
    }
}

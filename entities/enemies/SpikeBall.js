class SpikeBall {
    constructor(game, x, y) {
        this.game = game;
        this.x = x * 64;
        this.y = y * 64;
        this.anchorY = this.y;
        this.animations = [];
        this.width = 50;
        this.height = 30;
        this.state = 0;
        this.scale = 2;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale
        );
        this.isPog = true;
        this.sinWave = 0;
        this.loadAnimations();
    }

    loadAnimations() {
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/spikeball.png'),
            0,
            0,
            this.width,
            this.height,
            6,
            0.1,
            0,
            false,
            true
        );
    }

    pogo() {
        //basically checking if spike is going up
        if (this.sinWave < (3 * Math.PI) / 2 && this.sinWave > Math.PI / 2) {
            // this makes it go back down
            this.sinWave = Math.PI - this.sinWave;
        }
    }

    update() {
        this.sinWave += 3 * this.game.clockTick;
        if (this.sinWave > Math.PI * 2) {
            // makes it easier to do calculations if its always between 0 and 2PI
            this.sinWave -= Math.PI * 2;
        }

        const multiplier = 30;
        this.y = this.anchorY + Math.sin(this.sinWave) * multiplier;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale
        );
    }

    draw(ctx) {
        this.animations[this.state].drawFrame(
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

class BossDoor {
    constructor(game, x, y) {
        this.game = game;
        this.scale = 2.2;
        this.states = {
            close: 0,
            open: 1,
        };
        this.state = this.states.close;
        this.entered = false;
        this.canCollide = true;
        this.animations = [];

        this.x = x * 64;
        this.y = y * 64;
        this.loadAnimation();
        this.updateBB();
    }

    loadAnimation() {
        this.animations[this.states.close] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/misc/bossDoor-30x64.png'),
            0,
            0,
            30,
            64,
            13,
            0.06,
            0,
            true,
            false
        );
        this.animations[this.states.open] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/misc/bossDoor-30x64.png'),
            0,
            0,
            30,
            64,
            13,
            0.06,
            0,
            false,
            false
        );
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            30 * this.scale,
            64 * this.scale
        );
        this.leftBB = new BoundingBox(
            this.x,
            this.y,
            (30 * this.scale) / 2,
            64 * this.scale
        );
        this.rightBB = new BoundingBox(
            this.x + (30 * this.scale) / 2,
            this.y,
            (30 * this.scale) / 2,
            64 * this.scale
        );
        this.bottomBB = new BoundingBox(
            this.x + 10,
            this.y + 64 * this.scale,
            30 * this.scale - 20,
            10 // Making it thinner
        );
        this.topBB = new BoundingBox(
            this.x + 10,
            this.y, // Making it goes above the ground a bit
            30 * this.scale - 20,
            10 // Making it thinner
        );
    }

    update() {
        if (this.game.player.y > this.y) {
            if (!this.entered) {
                let playerDist = getDistance(this, this.game.player);
                if (playerDist <= 150) {
                    this.state = this.states.open;
                    if (this.animations[this.state].isDone()) {
                        this.canCollide = false;
                        this.animations[this.states.close].elapsedTime = 0;
                        this.state = this.states.close;
                    }
                } else {
                    this.canCollide = true;
                    this.animations[this.states.open].elapsedTime = 0;
                }
            }

            if (this.game.player.x > this.rightBB.x + this.rightBB.width) {
                this.entered = true;
                this.canCollide = true;
            }
            if (this.game.player.x < this.rightBB.x + this.rightBB.width) {
                this.entered = false;
            }

            this.updateBB();
        }
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
            ctx.strokeStyle = '#FF06B5';
            ctx.strokeRect(
                this.BB.x - this.game.camera.x,
                this.BB.y - this.game.camera.y,
                this.BB.width,
                this.BB.height
            );
            ctx.strokeStyle = '#00fff7';
            ctx.strokeRect(
                this.leftBB.x - this.game.camera.x,
                this.leftBB.y - this.game.camera.y,
                this.leftBB.width,
                this.leftBB.height
            );
            ctx.strokeStyle = '#a0ff06';
            ctx.strokeRect(
                this.rightBB.x - this.game.camera.x,
                this.rightBB.y - this.game.camera.y,
                this.rightBB.width,
                this.rightBB.height
            );
            ctx.strokeStyle = '#ffee00';
            ctx.strokeRect(
                this.topBB.x - this.game.camera.x,
                this.topBB.y - this.game.camera.y,
                this.topBB.width,
                this.topBB.height
            );
            ctx.strokeStyle = '#06ff2b';
            ctx.strokeRect(
                this.bottomBB.x - this.game.camera.x,
                this.bottomBB.y - this.game.camera.y,
                this.bottomBB.width,
                this.bottomBB.height
            );
            ctx.strokeStyle = '#000';
        }
    }
}

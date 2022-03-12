class Lava {
    constructor(game, x, y) {
        this.game = game;
        this.origin = y * 64;
        this.x = x * 64;
        this.y = y * 64;
        this.scale = 2;
        if (params.hardcore) this.speed = -200;
        else this.speed = -180;
        this.isHostile = true;
        this.collisionDamage = 999999;
        this.alwaysRender = true;
        this.start = false;
        this.onScreen = false;
        this.animation = new Animator(
            ASSET_MANAGER.getAsset('./sprites/misc/lava-1400x26.png'),
            0,
            0,
            1400,
            26,
            4,
            0.09,
            0,
            false,
            true
        );

        this.lavaBottom = new Animator(
            ASSET_MANAGER.getAsset('./sprites/misc/lavaBottom.png'),
            0,
            0,
            1400,
            1920,
            1,
            0,
            0,
            false,
            false
        );

        this.indicator = new Animator(
            ASSET_MANAGER.getAsset('./sprites/misc/lavaRising.png'),
            0,
            0,
            196,
            147,
            1,
            0,
            0,
            false,
            false
        );
        this.lavaBottomX = this.x;
        this.lavaBottomY = this.y + 26;

        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            1400 * this.scale,
            2000 * this.scale
        );
    }

    die() {
        this.removeFromWorld = true;
    }

    update() {
        // If player is above the s turn, start rising
        if (this.game.player.y < -46 * 64 && !this.start) this.start = true;

        if (this.start) {
            // reset to below player when player die and respawn
            if (this.game.player.respawned) {
                this.y = this.game.player.y + 1000;
                // if player respawn but is below the s turn, dont start
                if (this.game.player.y > -46 * 64 && this.start)
                    this.start = false;
            } else if (this.y >= -238 * 64) {
                this.y += this.speed * this.game.clockTick;
            } else {
                // do nothing
            }

            this.updateBB();
        }
    }

    draw(ctx) {
        this.animation.drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.scale
        );
        this.drawBottom(ctx, this.y + 26);
        if (
            this.start &&
            this.getYDistance(this.y, this.game.player.y) > 450 &&
            this.y >= -238 * 64
        )
            this.drawIndicator(ctx);
        if (params.debug) {
            ctx.strokeStyle = '#FF06B5';
            ctx.strokeRect(
                this.BB.x - this.game.camera.x,
                this.BB.y - this.game.camera.y,
                this.BB.width,
                this.BB.height
            );
            ctx.strokeStyle = '#000';
        }
    }

    drawBottom(ctx, y) {
        this.lavaBottom.drawFrame(
            this.game.clockTick,
            ctx,
            this.lavaBottomX - this.game.camera.x,
            y - this.game.camera.y,
            this.scale
        );
    }

    drawIndicator(ctx) {
        this.indicator.drawFrame(1, ctx, 450, 660, 0.69);

        ctx.font = '18px "Arial"';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff3b34';
        ctx.fillText(
            `${Math.round(
                this.getYDistance(this.y, this.game.player.y) - 450
            )}`,
            518,
            723
        );
    }

    getYDistance(y1, y2) {
        return Math.abs(y1 - y2);
    }
}

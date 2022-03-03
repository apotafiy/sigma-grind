class Clock {
    constructor(game, x, y, time) {
        this.game = game;
        this.x = x * 64;
        this.y = y * 64;

        // Clock sprite sheet
        this.clockSprite = ASSET_MANAGER.getAsset(
            './sprites/items/clock-16x20.png'
        );

        // Clock animation
        this.clock = new Animator(
            this.clockSprite,
            0,
            1,
            16,
            20,
            8,
            0.1,
            0,
            0,
            1
        );
        this.clockGrabbed = new Animator(
            this.clockSprite,
            0,
            21,
            16,
            20,
            7,
            0.1,
            0,
            0,
            0
        );
        this.bobTimer = 0;
        this.bobHeight = 10;
        this.scale = 2.5;
        this.xOffset = 0;
        this.yOffset = 5;

        // Bounding box for collision
        this.BB = new BoundingBox(
            this.x + this.xOffset,
            this.y + this.yOffset,
            15 * this.scale,
            19 * this.scale
        );
        this.lastBB = this.BB;
        this.grabbed = false;
        this.decrementOffset = time;

        // Sound effect(s)
        this.soundEffects = {};
        // TODO: Load sound effect here
    }

    update() {
        // console.log(this.game.timer.gameTime); // TODO: Delete later
        this.bobTimer += 5 * this.game.clockTick;
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Player) {
                    that.game.camera.msOffset += that.decrementOffset;
                    that.grabbed = true;
                    that.die();
                }
            }
        });
        this.updateBB();
    }

    // Updates bounding box for collision
    updateBB() {
        if (!this.grabbed) {
            this.lastBB = this.BB;
            this.BB = new BoundingBox(
                this.x + this.xOffset,
                this.y +
                    this.yOffset +
                    Math.sin(this.bobTimer) * this.bobHeight,
                15 * this.scale,
                19 * this.scale
            );
        } else {
            this.BB = new BoundingBox(0, 0, 0, 0);
        }
    }

    die() {
        // TODO: Play sound effect here
        if (this.clockGrabbed.isDone()) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        let that = this;
        if (!that.grabbed) {
            that.clock.drawFrame(
                that.game.clockTick,
                ctx,
                that.x - that.game.camera.x,
                that.y -
                    that.game.camera.y +
                    this.yOffset +
                    Math.sin(this.bobTimer) * this.bobHeight,
                this.scale
            );
        } else {
            that.clockGrabbed.drawFrame(
                that.game.clockTick,
                ctx,
                that.x - that.game.camera.x,
                that.y -
                    that.game.camera.y +
                    this.yOffset +
                    Math.sin(this.bobTimer) * this.bobHeight,
                this.scale
            );
            if (that.clockGrabbed.isDone()) {
                that.removeFromWorld = true;
            }
        }

        if (params.debug) {
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect(
                that.BB.x - that.game.camera.x,
                that.BB.y - that.game.camera.y,
                that.BB.width,
                that.BB.height
            );
            ctx.strokeStyle = 'Black';
        }
    }
}

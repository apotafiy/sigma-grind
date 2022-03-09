class Checkpoint {
    constructor(game, x, y) {
        this.game = game;
        this.x = x * BLOCK_DIMENSION;
        this.y = y * BLOCK_DIMENSION;

        // Boolean flag whether the player has hit the checkpoint
        this.reached = false;
        this.fullyReached = false;

        // Checkpoint sprite sheet
        this.checkpointSprite = ASSET_MANAGER.getAsset(
            './sprites/misc/checkpoint.png'
        );

        // Idle animation of the checkpoint where the player hasn't reached it yet
        this.idleCheckpoint = new Animator(
            this.checkpointSprite,
            0,
            12,
            12,
            -12,
            6,
            0.1,
            0,
            0,
            1
        );

        // Animation for when you reached the checkpoint
        this.checkpointAnimation = new Animator(
            this.checkpointSprite,
            0,
            46,
            20,
            -32,
            12,
            0.1,
            0,
            0,
            0
        );

        // Animation for checkpoint reached
        this.checkpointReached = new Animator(
            this.checkpointSprite,
            0,
            80,
            20,
            -30,
            6,
            0.1,
            0,
            0,
            1
        );

        this.bobTimer = 0;
        this.bobHeight = 5;
        this.scale = 3;
        this.xOffset = 0;
        this.yOffset = 60;

        // Bounding box for collision
        this.BB = new BoundingBox(
            this.x + this.xOffset,
            this.y + this.yOffset - 12 * this.scale,
            12 * this.scale,
            12 * this.scale
        );
        this.lastBB = this.BB;

        // Sound effect(s)
        this.soundEffects = {};
        // TODO: Load sound effect(s) here
    }

    update() {
        let that = this;
        that.bobTimer += 5 * that.game.clockTick;
        that.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Player && !that.reached) {
                    that.reached = true;
                    entity.checkpointX = that.x;
                    entity.checkpointY = that.y - 50;
                }
            }
        });
        that.updateBB();
    }

    // Updates bounding box for collision
    updateBB() {
        // If we haven't reached the checkpoint yet, we will use the idle animation BB
        if (!this.reached) {
            this.lastBB = this.BB;
            this.BB = new BoundingBox(
                this.x + this.xOffset,
                this.y +
                    this.yOffset +
                    Math.sin(this.bobTimer) * this.bobHeight -
                    12 * this.scale,
                12 * this.scale,
                12 * this.scale
            );
        } else {
            this.lastBB = this.BB;
            this.BB = new BoundingBox(
                this.x + this.xOffset,
                this.y +
                    this.yOffset +
                    Math.sin(this.bobTimer) * this.bobHeight -
                    30 * this.scale,
                20 * this.scale,
                30 * this.scale
            );
        }
    }

    draw(ctx) {
        let that = this;
        // If we haven't reached the checkpoint yet, we will use the idle animation
        if (!that.reached) {
            that.idleCheckpoint.drawFrame(
                that.game.clockTick,
                ctx,
                that.x - that.game.camera.x,
                that.y -
                    that.game.camera.y +
                    that.yOffset +
                    Math.sin(that.bobTimer) * that.bobHeight,
                that.scale
            );
        } else if (that.reached && !that.fullyReached) {
            // The flag pole goes up animation
            that.checkpointAnimation.drawFrame(
                that.game.clockTick,
                ctx,
                that.x - that.game.camera.x,
                that.y -
                    that.game.camera.y +
                    that.yOffset +
                    Math.sin(that.bobTimer) * that.bobHeight,
                that.scale
            );
            // Once the flag pole going up animation is done,
            // we play the flag flapping in the air loop animation
            if (that.checkpointAnimation.isDone()) {
                that.fullyReached = true;
            }
        }
        if (that.reached && that.fullyReached) {
            that.checkpointReached.drawFrame(
                that.game.clockTick,
                ctx,
                that.x - that.game.camera.x,
                that.y -
                    that.game.camera.y +
                    that.yOffset +
                    Math.sin(that.bobTimer) * that.bobHeight,
                that.scale
            );
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

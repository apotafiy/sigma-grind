class BeamBarrier {
    /**
     *
     * @param {object} game
     * @param {int} x
     * @param {int} y
     * @param {int} orientation 0 is vertical, 1 is horizontal
     * @param {number} restTime the amount of time that the beam is not active
     */
    constructor(game, x, y, orientation, restTime) {
        this.game = game;
        this.x = x * 64;
        this.y = y * 64;
        this.restTime = restTime;
        this.animations = [];
        this.orientation = orientation;
        if (orientation == 0) {
            this.width = 20;
            this.height = 64;
            this.orientationSheet = 'vertical';
        } else {
            this.width = 64;
            this.height = 20;
            this.orientationSheet = 'horizontal';
        }
        this.scale = 3;
        this.state = 0;
        this.isPog = false;
        this.isHostile = true;
        this.collisionDamage = 10;
        this.loadAnimations();
    }

    loadAnimations() {
        // idle
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset(
                `./sprites/${this.orientationSheet}Beam.png`
            ),
            0,
            0,
            this.width,
            this.height,
            1,
            this.restTime,
            0,
            false,
            false
        );
        // readying
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset(
                `./sprites/${this.orientationSheet}Beam.png`
            ),
            this.width,
            0,
            this.width,
            this.height,
            4,
            0.1,
            0,
            false,
            false
        );
        // filling
        this.animations[2] = new Animator(
            ASSET_MANAGER.getAsset(
                `./sprites/${this.orientationSheet}Beam.png`
            ),
            this.width * 5,
            0,
            this.width,
            this.height,
            3,
            0.01,
            0,
            false,
            false
        );
        // full
        this.animations[3] = new Animator(
            ASSET_MANAGER.getAsset(
                `./sprites/${this.orientationSheet}Beam.png`
            ),
            this.width * 8,
            0,
            this.width,
            this.height,
            1,
            this.restTime,
            0,
            false,
            false
        );
    }

    update() {
        if (this.animations[this.state].isDone()) {
            this.animations[this.state].elapsedTime = 0;
            this.state++;
            if (this.state >= this.animations.length) {
                this.state = 0;
            }
        }
        if (this.state > 1) {
            if (this.orientation == 0) {
                this.BB = new BoundingBox(
                    this.x + 8,
                    this.y,
                    (this.width - 6) * this.scale,
                    this.height * this.scale
                );
            } else if (this.orientation == 1) {
                this.BB = new BoundingBox(
                    this.x,
                    this.y + 8,
                    this.width * this.scale,
                    (this.height - 6) * this.scale
                );
            }
        } else {
            this.BB = undefined;
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

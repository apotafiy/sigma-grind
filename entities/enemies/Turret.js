class Turret {
    /**
     *
     * @param {object} game
     * @param {int} x
     * @param {int} y
     * @param {int} orientation 0 = up, 1 = right, 2 = down, 3 = left
     */
    constructor(game, x, y, orientation) {
        this.game = game;
        this.entityArrayPos = game.entities.length;
        this.isAlive = true;
        this.isFiring = false;
        this.shotsPerSecond = 1;
        this.x = x * 64;
        this.y = y * 64;
        this.orientation = orientation;
        this.width = 35;
        this.height = 35;
        this.scale = 2;
        this.state = 0;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale
        );
        this.player = this.game.getPlayer();
        this.animations = [];
        this.aggroDistance = 250;
        this.loadAnimations();
    }

    die() {
        //this.removeFromWorld = true;
        this.isAlive = false;
        this.isFiring = false;
    }
    fire() {
        this.game.addEntityAtIndex(
            new TurretBullet(this.game, this.x / 64, this.y / 64)
        );
    }

    startFiring() {
        if (this.isFiring) {
            this.fire();
            setTimeout(() => {
                this.startFiring();
            }, 1000 * this.shotsPerSecond);
        }
    }
    loadAnimations() {
        //idle
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/turret/turret.png'),
            0,
            0 + this.orientation * this.height,
            this.width,
            this.height,
            1,
            0.5,
            0,
            false,
            false
        );
        //opening
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/turret/turret.png'),
            this.width,
            0 + this.orientation * this.height,
            this.width,
            this.height,
            3,
            0.3,
            0,
            false,
            false
        );
        // open
        this.animations[2] = new Animator( // TODO: not animating both frames
            ASSET_MANAGER.getAsset('./sprites/turret/turret.png'),
            this.width * 3,
            0 + this.orientation * this.height,
            this.width,
            this.height,
            2,
            0.3,
            0,
            false,
            false
        );
        // closing
        this.animations[3] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/turret/turret.png'),
            this.width,
            0 + this.orientation * this.height,
            this.width,
            this.height,
            3,
            0.3,
            0,
            true,
            false
        );
    }
    update() {
        if (this.isAlive) {
            if (getDistance(this, this.player) < this.aggroDistance) {
                if (this.state == 0) {
                    this.state = 1;
                } else if (this.state == 1) {
                    if (this.animations[this.state].isDone()) {
                        this.animations[this.state].elapsedTime = 0;
                        this.state = 2;
                    }
                } else if (this.state == 2) {
                    if (!this.isFiring) {
                        this.isFiring = true;
                        this.startFiring();
                    }
                }
            } else {
                if (this.state != 0) {
                    this.state = 3;
                    if (this.animations[this.state].isDone()) {
                        this.animations[this.state].elapsedTime = 0;
                        this.state = 0;
                    }
                }
                this.isFiring = false;
            }
        } else {
            this.state = 4; // TODO: death
            if (this.animations[this.state].isDone()) {
                this.animations[this.state].elapsedTime = 0;
                // if death animation is done
                this.removeFromWorld = true;
            }
        }
        // if (this.animations[this.state].isDone()) {
        //     this.animations[this.state].elapsedTime = 0;
        //     this.state++;
        //     if (this.state >= this.animations.length) {
        //         this.state = 0;
        //     }
        // }
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

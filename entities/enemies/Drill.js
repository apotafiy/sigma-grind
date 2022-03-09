class Drill {
    constructor(game, x, y, lifeExpectancy) {
        this.x = x * 64;
        this.y = y * 64;
        this.game = game;
        this.isActive = false;
        this.player = this.game.getPlayer();
        this.lifeExpectancy = lifeExpectancy;
        this.cache = [];
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.health = 25;
        this.acceleration = 3000;
        this.DISTANCE_MULT = 1;
        this.frames = 0;
        this.isPog = true;
        this.scale = 2.5;
        this.angle = 0;
        this.offSetBB = 32;
        this.BB = new BoundingBox(
            this.x + this.offSetBB,
            this.y + this.offSetBB,
            (51 / 2) * this.scale,
            (51 / 2) * this.scale
        );
        this.state = 0;

        this.isHostile = true;
        this.collisionDamage = 5;

        this.animations = [];
        this.loadAnimations();
    }

    die() {
        this.state = 3;
        this.BB = undefined;
        console.log('no BB');
    }

    drawAngle(ctx, angle) {
        if (angle < 0 || angle > 359) return;
        const width = 51;

        if (this.cache[this.state] === undefined) {
            this.cache[this.state] = [];
        }
        if (
            this.cache[this.state][
                this.animations[this.state].currentFrame()
            ] === undefined
        ) {
            // if doesnt have array for frame
            this.cache[this.state][this.animations[this.state].currentFrame()] =
                [];
        }
        if (
            this.cache[this.state][this.animations[this.state].currentFrame()][
                angle
            ] === undefined
        ) {
            let radians = (angle / 360) * 2 * Math.PI;
            let offscreenCanvas = document.createElement('canvas');

            offscreenCanvas.width = width * this.scale;
            offscreenCanvas.height = width * this.scale;

            let offscreenCtx = offscreenCanvas.getContext('2d');
            offscreenCtx.imageSmoothingEnabled = false;

            offscreenCtx.save();
            offscreenCtx.translate(
                (width / 2) * this.scale,
                (width / 2) * this.scale
            );
            offscreenCtx.rotate(radians);
            offscreenCtx.translate(
                ((-1 * width) / 2) * this.scale,
                ((-1 * width) / 2) * this.scale
            );
            offscreenCtx.drawImage(
                this.animations[this.state].spritesheet,
                0 + this.animations[this.state].currentFrame() * width,
                0,
                width,
                width,
                0,
                9 * this.scale,
                width * this.scale,
                width * this.scale
            );
            offscreenCtx.restore();
            this.cache[this.state][this.animations[this.state].currentFrame()][
                angle
            ] = offscreenCanvas;
        }

        ctx.drawImage(
            this.cache[this.state][this.animations[this.state].currentFrame()][
                angle
            ],
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            width * this.scale,
            width * this.scale
        );
        if (params.debug) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(
                this.x - this.game.camera.x,
                this.y - this.game.camera.y,
                width * this.scale,
                width * this.scale
            );
        }
    }

    loadAnimations() {
        this.animations[0] = new Animator( // idle
            ASSET_MANAGER.getAsset('./sprites/drill/drill_ready.png'),
            0,
            0,
            51,
            44,
            1,
            1,
            0,
            false,
            true
        );
        this.animations[1] = new Animator( // ready
            ASSET_MANAGER.getAsset('./sprites/drill/drill_ready.png'),
            0,
            0,
            51,
            44,
            5,
            0.2,
            0,
            false,
            false
        );
        this.animations[2] = new Animator( // fly
            ASSET_MANAGER.getAsset('./sprites/drill/drill.png'),
            0,
            0,
            51,
            19,
            3,
            0.04,
            0,
            false,
            true
        );
        // this.animations[3] = new Animator( // die
        //     ASSET_MANAGER.getAsset('./sprites/mettaur/fire.png'),
        //     0,
        //     0,
        //     32,
        //     60,
        //     7,
        //     0.08,
        //     0,
        //     false,
        //     false
        // );
        this.animations[3] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/misc/explosion.png'),
            10,
            80,
            65,
            50,
            9,
            0.05,
            0,
            false,
            false
        );
    }

    updateBB() {
        if (this.state == 3) {
            return;
        }
        this.BB = new BoundingBox(
            this.x + this.offSetBB,
            this.y + this.offSetBB,
            (51 / 2) * this.scale,
            (51 / 2) * this.scale
        );
    }

    update() {
        const TICK = this.game.clockTick;
        let dist = getDistance(this, this.player);
        const that = this;
        if (this.health <= 0) {
            this.die();
        }
        if (this.state === 3) {
            this.angle = 0;
            // death animation
            if (this.animations[this.state].isDone()) {
                this.removeFromWorld = true;
            }
            return;
        }
        if (this.state === 1 || this.state === 0) {
            // idle or ready
            if (dist < 450 && this.state == 0) {
                setTimeout(() => {
                    this.die();
                }, 1000 * that.lifeExpectancy);
                this.state = 1;
            }

            if (this.animations[this.state].isDone()) {
                this.state += 1;
                this.isActive = true;
            }
            this.angle = Math.floor(
                Math.atan((this.y - this.player.y) / (this.x - this.player.x)) *
                    (180 / Math.PI)
            );

            if (this.angle < 0) {
                this.angle += 360;
            }
            if (this.x < this.player.x) {
                this.angle += 180;
            }
            if (this.angle > 359) {
                this.angle -= 360;
            }
        } else if (this.isActive) {
            let xdif = (this.player.x - this.x) / dist;
            let ydif = (this.game.player.y - this.y) / dist;

            // slows velocity by half each second. idk why tho
            // it seems to be resposible for the drill not flying away too far
            // and sticking close to the player
            this.xVelocity -= TICK * this.xVelocity * 0.4;
            this.yVelocity -= TICK * this.yVelocity * 0.4;

            // idk
            this.xVelocity +=
                (TICK * xdif * this.acceleration) / (dist * this.DISTANCE_MULT);
            this.yVelocity +=
                (TICK * ydif * this.acceleration * 2) /
                (dist * this.DISTANCE_MULT);

            this.x += this.xVelocity;
            this.y += this.yVelocity;
            // calculate the angle based on velocity
            this.angle =
                Math.floor(
                    (Math.atan(this.yVelocity / this.xVelocity) *
                        (180 / Math.PI)) /
                        2
                ) * 2;

            if (this.angle < 0) {
                this.angle += 360;
            }
            if (this.xVelocity < 0) {
                this.angle += 180;
            }
            if (this.angle > 359) {
                this.angle -= 360;
            }
        }
        this.updateBB();
    }

    draw(ctx) {
        // if (this.animations[this.state] === 3) {
        //     //this.animations[this.state].loop = false;
        //     if (this.animations[this.state].isDone()) {
        //         return;
        //     }
        // }
        if (getDistance(this, this.player) < 700) {
            if (this.state == 3) {
                this.animations[this.state].drawFrame(
                    this.game.clockTick,
                    ctx,
                    this.x - this.game.camera.x,
                    this.y - this.game.camera.y,
                    2
                );
            } else {
                this.drawAngle(ctx, this.angle);
                this.myDrawFrame(this.game.clockTick, ctx);
            }

            if (params.debug && this.BB) {
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

    /**
     * Regular animator.drawFrame() does not work well with rotations and such.
     * So I create my own version.
     * Actually this only does the administrative tasks. this.drawAngle() does the drawing.
     * Half of this was copied from the animator.js file.
     *
     * @param {*} tick
     * @param {*} ctx
     */
    myDrawFrame(tick, ctx) {
        const animator = this.animations[this.state];
        animator.elapsedTime += tick;
        //add looping functionality
        if (animator.isDone()) {
            if (animator.loop) {
                animator.elapsedTime -= animator.totalTime;
            } else {
                //TODO This was changed to show the lat frame of the image rather than nothing and;
            }
        }
        let frame = animator.currentFrame();
        if (animator.reverse) frame = animator.frameCount - frame - 1;
        //update to the last frame if it does not loop
        if (animator.isDone()) {
            frame = animator.frameCount - 1;
            if (animator.reverse) frame = 0;
        }
    }
}

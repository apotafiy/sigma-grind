class Mettaur {
    /**
     * time per frame
     */
    /**
     * 0 = walk left
     * 1 = walk right
     * 2 = jump
     * 3 = ?
     * 4 = get up
     * 5 = dead
     */
    constructor(game, x, y, gravity) {
        this.game = game;
        this.currentState = 0;
        this.animations = [[], []];
        this.xVelocity = this.getRandomInt(-2, 3);
        this.yVelocity = 0;
        this.x = x;
        this.y = y;
        this.gravity = gravity;
        this.direction = 1;
        this.dirIndex = 1;
        if (this.xVelocity > 0) {
            this.direction = -1;
            this.dirIndex = 0;
        }
        this.internalTimer = 0;
        this.duckTimer = 0;
        this.loadAnimation();
        this.check = this.getRandomInt(100, 400);
        //bounding box
        this.BB = new BoundingBox(this.x, this.y, 32, 36);
        this.lastBB = this.BB;

        //death handler
        this.isDead = false;
        this.deathtimer = 0;
    }
    loadAnimation() {
        this.animations[1][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-walk.png'),
            0,
            0,
            32,
            36,
            8,
            0.1,
            0,
            0,
            1
        );
        this.animations[1][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-jump.png'),
            0,
            0,
            32,
            36,
            7,
            0.1,
            0,
            0,
            1,
            0,
            0,
            1
        );
        this.animations[1][2] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-duck.png'),
            0,
            -4,
            32,
            36,
            6,
            0.1,
            0,
            1,
            0
        );
        this.animations[1][3] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-fall.png'),
            0,
            0,
            36,
            38,
            6,
            0.1,
            0,
            0,
            1
        );
        this.animations[1][4] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-duck.png'),
            0,
            -4,
            32,
            36,
            6,
            0.1,
            0,
            0,
            0
        );
        this.animations[1][5] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/fire.png'),
            0,
            0,
            32,
            46,
            7,
            0.1,
            0,
            0,
            1
        );
        //right facing Animations
        this.animations[0][5] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/death.png'),
            0,
            0,
            74,
            64,
            4,
            0.1,
            0,
            0,
            0
        );
        this.animations[0][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-walk-right.png'),
            0,
            0,
            32,
            36,
            8,
            0.1,
            0,
            1,
            1
        );
        this.animations[0][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-jump-right.png'),
            0,
            0,
            32,
            36,
            7,
            0.1,
            0,
            1,
            1
        );
        this.animations[0][2] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-duck-right.png'),
            0,
            -4,
            32,
            36,
            6,
            0.1,
            0,
            0,
            0
        );

        this.animations[0][4] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/mettaur-duck-right.png'),
            0,
            -4,
            32,
            36,
            6,
            0.1,
            0,
            1,
            0
        );
    }
    updateBB() {
        this.lastBB = this.BB;
        const yOffSet = 6; // Make sprite goes below the ground slightly not the bounding box itself
        this.BB = new BoundingBox(this.x, this.y, 64, 72 - yOffSet);
    }
    update() {
        let that = this;
        //apply gravity to the enemy
        that.yVelocity += that.gravity;
        //apply the velocity to the position
        that.x += that.xVelocity * that.direction;
        that.y += that.yVelocity;
        //update out bounding box every frame
        that.updateBB();
        //update the animation
        //collisions
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                //if falling check below
                if (that.yVelocity > 0) {
                    if (
                        entity instanceof Ground &&
                        that.lastBB.bottom <= entity.BB.top
                    ) {
                        // ws above last tick
                        that.y = entity.BB.top - that.BB.height; //set to top of bounding box of ground
                        that.yVelocity = 0;
                        that.updateBB();
                    }
                } else if (that.direction == 1) {
                    if (
                        entity instanceof Ground &&
                        that.lastBB.left < entity.BB.right
                    ) {
                        that.x = entity.BB.right;
                        that.direction = -1;
                        that.dirIndex = 0;
                        that.updateBB();
                    }
                } else if (that.direction == -1) {
                    if (
                        entity instanceof Ground &&
                        that.lastBB.right > entity.BB.left
                    ) {
                        // is in the wall
                        //subtract because origin is on left
                        that.x = entity.BB.left - that.BB.width;
                        that.direction = 1;
                        that.dirIndex = 1;
                        that.updateBB();
                    }
                }
            }
        });
        // console.log(that.x, that.y)
        // console.log(that.xVelocity * that.direction, that.yVelocity );

        //handle ducking
        that.internalTimer++;
        // console.log(that.internalTimer);
        //have a chance to duck every time
        if (that.internalTimer % that.check == 0) {
            that.currentState = 2;
            that.duckTimer = that.getRandomInt(100, 400);
        } else if (that.isDead) {
            console.log('Dying in: ', that.deathtimer);
            if (that.deathTimer <= 0) {
                //get rid of it after death;
                that.removeFromWorld = true;
            } else {
                that.deathTimer--;
            }
        } else if (that.duckTimer <= 0) {
            if (that.yVelocity > 0) {
                that.currentState = 1;
            } else {
                that.currentState = 0;
                that.xVelocity = -2;
            }
        } else {
            // console.log("Timer :",that.duckTimer);
            that.duckTimer--;
            that.internalTimer = 1;
            that.xVelocity = 0;
            if (that.duckTimer == 25) {
                //reset time passed for non looing animations
                that.animations[that.dirIndex][2].elapsedTime = 0;
                that.animations[that.dirIndex][4].elapsedTime = 0;
                that.currentState = 4;
                that.check = that.getRandomInt(100, 400);
            }
        }
        //temp death
        // window.addEventListener('keypress', function (event) {
        //   console.log(event.code);
        //   if (event.code == 'KeyQ') {
        //     that.isDead = true;
        //     that.deathTimer = 20;
        //     that.xVelocity = 0;
        //   }
        // });
    }

    draw(ctx) {
        let that = this;
        // console.log(that.currentState, that.yVelocity);
        if (!that.isDead) {
            that.animations[that.dirIndex][that.currentState].drawFrame(
                that.game.clockTick,
                ctx,
                that.x - that.game.camera.x,
                that.y - that.game.camera.y,
                2
            );
        } else {
            that.animations[1][5].drawFrame(
                that.game.clockTick,
                ctx,
                that.x - that.game.camera.x,
                that.y - that.game.camera.y + that.BB.height / 4,
                1.5
            );
        }

        if (params.debug) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(
                that.BB.x - that.game.camera.x,
                that.BB.y - that.game.camera.y,
                that.BB.width,
                that.BB.height
            );
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}

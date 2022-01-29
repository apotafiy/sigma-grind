class Drill {
    constructor(game, x, y, lifeExpectancy) {
        this.x = x * 64;
        this.y = y * 64;
        this.game = game;
        this.isActive = false;
        this.player = this.game.getPlayer();
        this.isDead = false;
        this.lifeExpectancy = lifeExpectancy;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.acceleration = 15;
        this.DISTANCE_MULT = 0.9;
        this.scale = 2.5;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            51 * this.scale,
            20 * this.scale
        );
        this.state = 0;
        this.animations = [];
        this.loadAnimations();
    }

    die() {
        this.BB = undefined;
        this.state = 3;
        this.isDead = true;
    }

    loadAnimations() {
        this.animations[0] = new Animator(
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
        this.animations[1] = new Animator(
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
        this.animations[2] = new Animator(
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
        this.animations[3] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/mettaur/fire.png'),
            0,
            0,
            32,
            60,
            7,
            0.08,
            0,
            false,
            false
        );
    }

    update() {
        if (this.isDead) {
            return;
        }
        if (this.state == 1 && this.animations[this.state].isDone()) {
            this.state += 1;
            this.isActive = true;
        }

        let dist = getDistance(this, this.player);
        const that = this;
        if (dist < 400 && this.state == 0) {
            setTimeout(() => {
                this.die();
            }, 1000 * that.lifeExpectancy);
            this.state = 1;
        }
        if (!this.isActive) {
            return;
        }
        let xdif = (this.player.x - this.x) / dist;
        let ydif = (this.game.player.y - this.y) / dist;

        this.xVelocity -= this.game.clockTick * (this.xVelocity * 0.5);
        this.yVelocity -= this.game.clockTick * this.yVelocity * 0.5;
        this.xVelocity +=
            (xdif * this.acceleration) / (dist * this.DISTANCE_MULT);
        this.yVelocity +=
            (ydif * this.acceleration * 2) / (dist * this.DISTANCE_MULT);
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.BB.x = this.x;
        this.BB.y = this.y;

        // TODO: rotation
    }

    draw(ctx) {
        if (this.isDead) {
            this.animations[this.state].loop = false;
            if (this.animations[this.state].isDone()) {
                return;
            }
        }
        this.animations[this.state].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.scale
        );
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

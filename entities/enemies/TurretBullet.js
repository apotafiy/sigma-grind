class TurretBullet {
    constructor(game, x, y) {
        this.game = game;
        const offset = 32; // for centering in the block
        this.x = x * 64 + offset;
        this.y = y * 64 + offset / 2;
        this.width = 37;
        this.height = 32;
        this.scale = 1;
        this.xVel = 0;
        this.yVel = 0;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale
        );
        this.state = 0;
        this.player = this.game.getPlayer();
        this.animations = [];
        this.loadAnimations();
        this.trigWave = 0;
        this.lifeExpectancy = 3;
        this.isHostile = true;
        this.collisionDamage = 1;
        setTimeout(() => {
            this.die();
        }, 1000 * this.lifeExpectancy);
    }
    die() {
        this.removeFromWorld = true;
    }

    loadAnimations() {
        // active
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/turret/turretbullet.png'),
            0,
            0,
            this.width,
            this.height,
            12,
            0.1,
            0,
            false,
            true
        );
    }

    update() {
        const TICK = this.game.clockTick;
        const amplitude = 3;
        this.trigWave = this.trigWave + 10 * TICK;
        this.x = this.x - Math.sin(this.trigWave) * amplitude * TICK * 50;
        this.y = this.y - Math.cos(this.trigWave) * amplitude * TICK * 50;

        // TODO: follow player
        const distance = getDistance(this, this.player);
        const deltaX = (this.player.x - this.x) / distance;
        const deltaY = (this.player.y - this.y) / distance;

        this.xVel -= this.xVel * 0.5 * TICK;
        this.yVel -= this.yVel * 0.5 * TICK;

        this.xVel += (TICK * deltaX * 75000) / distance;
        this.yVel += (TICK * deltaY * 75000) / distance;

        //const velocityMult = 1;
        //let mult = 100;
        // mult += Math.abs(
        //     Math.pow(getDistance(this, this.player), 3) / 10000000
        // );
        //this.xVel += deltaX * TICK * mult;
        //this.yVel += deltaY * TICK * mult;

        this.x += this.xVel * TICK; // * TICK;
        this.y += this.yVel * TICK; // * TICK;

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

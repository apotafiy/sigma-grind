class SigmaHead {
    constructor(game, x, y) {
        this.scale = 2;
        this.game = game;

        this.states = {
            idle: 0,
            spawn: 1,
            attack: 2,
        };
        this.state = this.states.spawn;
        this.spawnIn = false;
        this.fadeValue = 0;

        this.facing = 1;

        this.animations = [];

        this.x = x;
        this.y = y;

        this.isPog = true;
        this.isHostile = true;
        this.collisionDamage = 10;

        this.loadAnimation();
        this.updateBB();
    }

    loadAnimation() {
        for (var i = 0; i < 3; i++) {
            this.animations.push([]);
            for (var k = 0; k < 2; k++) {
                // two directions
                this.animations[i].push([]);
            }
        }

        this.animations[this.states.idle][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-head-158x168.png'),
            158,
            0,
            158,
            168,
            1,
            0,
            0,
            false,
            false
        );
        this.animations[this.states.idle][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-head-158x168.png'),
            0,
            0,
            158,
            168,
            1,
            0,
            0,
            false,
            false
        );

        this.animations[this.states.spawn][0] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/sigma/sigma-headSpawn-156x170.png'
            ),
            156,
            0,
            156,
            170,
            1,
            0,
            0,
            false,
            false
        );
        this.animations[this.states.spawn][1] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/sigma/sigma-headSpawn-156x170.png'
            ),
            0,
            0,
            156,
            170,
            1,
            0,
            0,
            false,
            false
        );

        this.animations[this.states.attack][0] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/sigma/sigma-headAttack-158x168.png'
            ),
            632,
            0,
            158,
            168,
            4,
            0,
            0,
            true,
            false
        );
        this.animations[this.states.attack][1] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/sigma/sigma-headAttack-158x168.png'
            ),
            0,
            0,
            158,
            168,
            4,
            0,
            0,
            false,
            false
        );
    }

    die() {
        this.removeFromWorld = true;
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            158 * this.scale,
            168 * this.scale
        );
    }

    update() {
        const TICK = this.game.clockTick;

        this.updateBB();
    }

    spawnFade(ctx) {
        if (this.spawnIn) {
            this.fadeValue += this.game.clockTick;
            this.fadeValue = Math.min(this.fadeValue, 1);
            console.log(this.fadeValue);
            ctx.filter = `opacity(${this.fadeValue})`;
        } else {
            // TODO: Fade out
            ctx.filter = `opacity(0.6)`;
        }
    }

    draw(ctx) {
        console.log(this.x + ' ' + this.y);

        this.spawnFade(ctx);

        this.animations[this.state][this.facing].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.scale
        );

        ctx.filter = 'none';

        if (params.debug) {
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect(
                this.BB.x - this.game.camera.x,
                this.BB.y - this.game.camera.y,
                this.BB.width,
                this.BB.height
            );
        }
    }
}

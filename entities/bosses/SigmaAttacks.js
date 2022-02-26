class SigmaHead {
    constructor(game, x, y) {
        this.scale = 2;
        this.game = game;
        this.entityArrayPos = game.entities.length;

        this.states = {
            idle: 0,
            spawn: 1,
            attack: 2,
        };
        this.state = this.states.spawn;
        this.spawnIn = false;
        this.initDone = false;
        this.fadeValue = 0;
        this.idleTime = 1;
        this.beamTime = 5;

        this.animations = [];

        this.x = x;
        this.y = y;
        this.facing = 1;

        this.isPog = true;
        this.isHostile = true;
        this.collisionDamage = 10;

        this.loadAnimation();
        this.updateBB();

        this.crosshair = new BeamCrosshair(game, null, null, this);
        this.beam = new Beam(game, null, null, this);
        this.game.addEntityAtIndex(this.beam, this.entityArrayPos + 1);
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
            0.09,
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
            0.09,
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

        // During spawn in, no interaction with player
        if (this.spawnIn) {
            this.isPog = false;
            this.isHostile = false;
            this.collisionDamage = 0;
        } else {
            this.isPog = true;
            this.isHostile = true;
            this.collisionDamage = 10;
        }

        // wait a bit after spawn to attack
        if (this.state === this.states.idle) {
            this.idleTime -= TICK;
            this.idleTime = Math.max(this.idleTime, 0);
        }

        // Set states
        if (this.initDone) {
            this.state = this.states.idle;
        }
        if (this.idleTime === 0) {
            this.state = this.states.attack;
        }

        // Set position
        if (this.state === this.states.attack) {
            // Count down before firing
            if (this.beamTime > 0) {
                this.beamTime -= TICK;
                this.beamTime = Math.max(this.beamTime, 0);

                this.y = lerp(this.y, this.game.player.y - 200, 0.069);

                // Position crosshair x to be next to player
                let playerX = this.game.player.x;
                let playerWidth = this.game.player.BB.width;
                if (this.facing === 1) this.crosshair.x = playerX + playerWidth;
                else this.crosshair.x = playerX - this.crosshair.size.width;

                // Position crosshair y to match sigma mouth;
                this.crosshair.y = this.y + 204;
            }

            // Init beam
            if (this.beamTime === 0) {
                this.beam.init(this.x, this.y, this.facing);
                this.crosshair = null;
            }
        }

        this.updateBB();
    }

    spawnFade(ctx) {
        if (this.spawnIn) {
            this.fadeValue += this.game.clockTick;
            this.fadeValue = Math.min(this.fadeValue, 1);
            ctx.filter = `opacity(${this.fadeValue})`;
            if (this.fadeValue === 1) {
                this.spawnIn = false;
                this.initDone = true;
            }
        } else {
            // TODO: Fade out
            // ctx.filter = `opacity(0.3)`;
        }
    }

    draw(ctx) {
        // console.log(this.x + ' ' + this.y);
        console.log(this.beamTime);

        this.spawnFade(ctx);

        // console.log(this.state.x + ' ' + this.facing);
        this.animations[this.state][this.facing].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.scale
        );

        if (this.state === this.states.attack && this.beamTime > 0) {
            this.crosshair.drawCrosshair(ctx);
        }

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

class BeamCrosshair {
    constructor(game, x, y, sigmaHead) {
        this.game = game;
        this.sigmaHead = sigmaHead;
        this.x = x;
        this.y = y;
        this.size = {
            width: 30,
            height: 110,
        };
        this.animation = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/beam-aim-30x110.png'),
            0,
            0,
            30,
            110,
            5,
            0.06,
            0,
            false,
            true
        );
    }

    die() {
        // TODO
        // this.removeFromWorld = true;
    }

    // update() {
    //     // this.y = this.sigmaHead.y - 300;
    // }

    drawCrosshair(ctx) {
        // console.log(this.x + ' ' + this.y);
        this.animation.drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            1
        );
    }
}

class Beam {
    constructor(game, x, y, sigmaHead) {
        this.game = game;
        this.sigmaHead = sigmaHead;
        // this.scale = 2;
        this.x = x;
        this.y = y;
        this.facing = 1;
        this.isHostile = true;
        this.isPog = false;
        this.collisionDamage = 10;

        this.animations = [];
        this.loadAnimation();
        this.updateBB();
    }

    loadAnimation() {
        // Face right
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-beam-1202x177.png'),
            0,
            0,
            1202,
            177,
            12,
            0.06,
            0,
            false,
            true
        );
        // Face left
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-beam-1202x177.png'),
            14424,
            0,
            1202,
            177,
            12,
            0.06,
            0,
            true,
            true
        );
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 1202, 177);
    }

    die() {
        // TODO
        // this.removeFromWorld = true;
    }

    update() {
        // this.facing = this.sigmaHead.facing;
        // this.y = this.sigmaHead.y - 300;

        this.updateBB();
    }

    init(x, y, facing) {
        this.facing = facing;
        if (this.facing === 1) this.x = x - this.BB.width;
        else this.x = x + this.sigmaHead.BB.width;
        this.y = y + 174;
    }

    draw(ctx) {
        // console.log(this.facing);
        this.animations[this.facing].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            1
        );

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

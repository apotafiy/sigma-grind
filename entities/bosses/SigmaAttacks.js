class SigmaHead {
    constructor(game, x, y, isHidden) {
        this.scale = 2;
        this.game = game;
        this.isHidden = isHidden;

        this.states = {
            idle: 0,
            spawn: 1,
            attack: 2,
        };
        this.state = this.states.spawn;
        this.spawnIn = false;
        this.spawnOut = false;
        this.initDone = false;
        this.fadeValue = 0;
        this.idleTime = 0.3;
        this.beamTime = 3;
        this.beamEnd = 5;
        this.alwaysRender = true;

        this.animations = [];

        this.x = x;
        this.y = y;
        this.facing = 1;

        this.isPog = true;
        this.isHostile = true;
        this.collisionDamage = 30;

        this.loadAnimation();
        this.updateBB();

        this.crosshair = new BeamCrosshair(game, null, null, this);
        this.beam = new Beam(game, null, null, this);
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
        if (!this.isHidden) {
            const TICK = this.game.clockTick;

            if (
                this.state === this.states.idle ||
                this.state === this.states.attack
            ) {
                this.isPog = true;
                this.isHostile = true;
                this.collisionDamage = 30;
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
                    if (this.facing === 1)
                        this.crosshair.x = playerX + playerWidth;
                    else this.crosshair.x = playerX - this.crosshair.size.width;

                    // Position crosshair y to match sigma mouth;
                    this.crosshair.y = this.y + 204;
                }

                // Init beam
                if (this.beamTime === 0 && this.beamEnd > 0) {
                    this.beam.init(this.x, this.y, this.facing);
                    this.crosshair = null;
                    this.beamEnd -= TICK;
                    this.beamEnd = Math.max(this.beamEnd, 0);
                }

                if (this.beamEnd === 0) {
                    this.beam.die();
                }
            }
            this.updateBB();
        } else {
            this.isHostile = false;
            this.isPog = false;
            this.collisionDamage = 0;
        }
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
        }

        if (this.spawnOut) {
            this.fadeValue -= this.game.clockTick;
            this.fadeValue = Math.max(this.fadeValue, 0);
            ctx.filter = `opacity(${this.fadeValue})`;
            if (this.fadeValue === 0) {
                this.spawnOut = false;
                this.die();
            }
        }
    }

    draw(ctx) {
        if (!this.isHidden) {
            this.spawnFade(ctx);
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
        }
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

    drawCrosshair(ctx) {
        this.animation.drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            1
        );

        ctx.font = '15px "Zen Dots"';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#34f5ff';
        ctx.fillText(
            `${Math.round(this.sigmaHead.beamTime * 100) / 100}`,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y - 10
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
        this.alwaysRender = true;

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
            7,
            0.03,
            0,
            false,
            true
        );
        // Face left
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-beam-1202x177.png'),
            20434,
            0,
            1202,
            177,
            7,
            0.03,
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
        this.removeFromWorld = true;
    }

    update() {
        if (!this.sigmaHead.isHidden) {
            this.isHostile = true;
            this.collisionDamage = 30;
            this.updateBB();
        } else {
            this.isHostile = false;
            this.collisionDamage = 0;
        }
    }

    init(x, y, facing) {
        this.facing = facing;
        let offset = 60;
        if (this.facing === 1) this.x = x - this.BB.width + offset;
        else this.x = x + this.sigmaHead.BB.width - offset;
        this.y = y + 174;
    }

    draw(ctx) {
        if (!this.sigmaHead.isHidden) {
            this.animations[this.facing].drawFrame(
                this.game.clockTick,
                ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y,
                1
            );
        }

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

class SigmaBall {
    constructor(game, x, y, speedX, speedY) {
        this.scale = 2;
        this.game = game;
        this.activeTime = 200;
        this.x = x;
        this.y = y;
        this.speed = {
            x: speedX,
            y: speedY,
        };

        this.isHostile = true;
        this.collisionDamage = 10;
        this.alwaysRender = true;
        this.dead = false;

        this.animation = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-balls-32x32.png'),
            0,
            0,
            32,
            32,
            10,
            0.08,
            0,
            false,
            true
        );

        this.updateBB();
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            32 * this.scale,
            32 * this.scale
        );
    }

    die() {
        this.removeFromWorld = true;
    }

    update() {
        const TICK = this.game.clockTick;

        this.activeTime -= 1;
        if (this.activeTime <= 0) this.die();

        this.x += this.speed.x * TICK;
        this.y += this.speed.y * TICK;
        this.updateBB();

        // Collision
        this.game.entities.forEach((entity) => {
            if (
                entity.BB &&
                this.BB.collide(entity.BB) &&
                entity instanceof Ground
            ) {
                this.die();
            }
        });
    }

    draw(ctx) {
        this.animation.drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.scale
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

class Wave {
    constructor(game, x, y) {
        this.game = game;
        this.scale = 2;
        this.x = x;
        this.y = y;
        this.facing = 1;
        this.isHostile = true;
        this.isPog = false;
        this.isHidden = true;
        this.collisionDamage = 10;
        this.alwaysRender = true;

        this.started = false;

        this.animations = [];
        this.loadAnimation();
        this.updateBB();
    }

    loadAnimation() {
        // Face right
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-wave-70x146.png'),
            210,
            0,
            70,
            146,
            3,
            0.06,
            0,
            true,
            true
        );
        // Face left
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-wave-70x146.png'),
            0,
            0,
            70,
            146,
            3,
            0.06,
            0,
            false,
            true
        );
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.started) {
            this.BB = new BoundingBox(
                this.x,
                this.y,
                70 * this.scale,
                146 * this.scale
            );
        } else {
            this.BB = new BoundingBox(0, 0, 0, 0);
        }
    }

    die() {
        this.removeFromWorld = true;
    }

    start(x, y, facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.started = true;
        this.isHidden = false;
        this.speed = 300;
    }

    reset() {
        this.started = false;
        this.isHidden = true;
        // this.updateBB();
    }

    update() {
        const TICK = this.game.clockTick;

        if (!this.isHidden) {
            this.isHostile = true;
            this.collisionDamage = 30;

            this.x +=
                (this.facing === 0 ? this.speed : -this.speed) *
                TICK *
                this.scale;

            // Collision
            this.game.entities.forEach((entity) => {
                if (
                    entity.BB &&
                    this.BB.collide(entity.BB) &&
                    entity instanceof Ground
                ) {
                    if (this.BB.collide(entity.leftBB)) {
                        this.x = entity.BB.left - this.BB.width;
                        if (this.speed > 0) this.speed = 0;
                    } else if (this.BB.collide(entity.rightBB)) {
                        this.x = entity.BB.right;
                        if (this.speed < 0) this.speed = 0;
                    }
                    this.reset();
                }
            });
        } else {
            this.isHostile = false;
            this.collisionDamage = 0;
        }
        this.updateBB();
    }

    draw(ctx) {
        if (!this.isHidden) {
            this.animations[this.facing].drawFrame(
                this.game.clockTick,
                ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y,
                this.scale
            );
        }

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

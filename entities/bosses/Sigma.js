class Sigma {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.scale = 2;
        this.game = game;
        this.entityArrayPos = game.entities.length;

        this.state = 0;
        this.states = {
            spawnIn: 0,
            wingsOff: 1,
            idle: 2,
            teleportOut: 3,
            teleportIn: 4,
            dash: 5,
            attack1: 6, // Head kamehameha thing
            attack2: 7, // Energy wave
            attack3: 8, // Balls
            dead: 9,
        };
        this.x = x * 64;
        // Place sigma higher up
        this.y = (y - 7) * 64;

        // Original position on the ground
        // used to check distance with the player for intro
        this.introObject = {
            // x = the ground
            x: x * 64,
            y: y * 64,
        };
        this.teleportPoints = [
            // Ground level
            { x: (x + 2.406) * 64, y: (y + 0.3) * 64, type: 'right' },
            { x: (x - 12) * 64, y: (y + 0.3) * 64, type: 'left' },
            // mid air
            { x: (x + 2.406) * 64, y: (y - 2.5) * 64, type: 'right' },
            { x: (x - 12) * 64, y: (y - 2.5) * 64, type: 'left' },
            { x: (x - 5) * 64, y: (y - 7) * 64, type: 'mid' },
        ];
        this.teleportTo = {
            rightCorner: 0,
            leftCorner: 1,
            rightMid: 2,
            leftMid: 3,
            mid: 4,
        };
        this.pattern = null;
        this.performTeleport = null;
        this.dashEndAction = null;
        this.laserEndAction = null;
        this.waveEndAction = null;
        this.ballsEndAction = null;

        this.facing = 1;
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 400;

        this.isIntro = true;
        this.isPog = true;
        this.isHostile = true;
        this.collisionDamage = 10;
        this.isDead = false;
        // this.alwaysRender = true;

        // Boss health
        this.maxHealth = 320;
        this.health = this.maxHealth;
        this.healthBar = new HealthBar(this);
        this.iframes = 0;
        this.flashframes = 0;
        this.ballTimeout = 0.1;
        this.ballOffset = 0;
        this.ballSpeedOffset = 0;
        this.attackCooldown = 0.6;

        //sound imports
        this.soundEffects = {};
        this.soundEffects.teleport = SOUND_MANAGER.getSound('teleport');
        this.soundEffects.dash = SOUND_MANAGER.getSound('dash');
        this.soundEffects.wave = SOUND_MANAGER.getSound('wave');
        this.soundEffects.balls = SOUND_MANAGER.getSound('balls');

        this.animations = [];
        this.spriteOffset = {
            x: 0,
            y: 0,
        };
        this.loadAnimation();
        this.updateBB();

        this.sigmaHead = new SigmaHead(game, null, null, true);
        this.game.addEntityAtIndex(this.sigmaHead, this.entityArrayPos);
        this.game.addEntityAtIndex(this.sigmaHead.beam, this.entityArrayPos);
        this.wave = new Wave(game, null, null);
        this.game.addEntityAtIndex(this.wave, this.entityArrayPos);
        this.topWave = new Wave(game, null, null);
        this.bottomWave = new Wave(game, null, null);
        this.game.addEntityAtIndex(this.topWave, this.entityArrayPos);
        this.game.addEntityAtIndex(this.bottomWave, this.entityArrayPos);
        this.wave2StartTime = 0.9;
    }

    loadAnimation() {
        for (var i = 0; i < 10; i++) {
            this.animations.push([]);
            for (var k = 0; k < 2; k++) {
                // two directions
                this.animations[i].push([]);
            }
        }

        // Spawning in
        this.animations[this.states.spawnIn][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-spawnIn-180x117.png'),
            0,
            0,
            180,
            117,
            18,
            0.2,
            0,
            false,
            false
        );

        // Wings off
        this.animations[this.states.wingsOff][1] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/sigma/sigma-wingsOff-106x102.png'
            ),
            0,
            0,
            106,
            102,
            10,
            0.09,
            0,
            false,
            false
        );

        // Idle
        this.animations[this.states.idle][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-dash-97x100.png'),
            873,
            0,
            97,
            100,
            1,
            0,
            0,
            false,
            false
        );
        this.animations[this.states.idle][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-dash-97x100.png'),
            0,
            0,
            97,
            100,
            1,
            0,
            0,
            false,
            false
        );

        // Teleport away
        // face right
        this.animations[this.states.teleportOut][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-teleport-55x100.png'),
            385,
            0,
            55,
            100,
            7,
            0.09,
            0,
            true,
            false
        );
        // face left
        this.animations[this.states.teleportOut][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-teleport-55x100.png'),
            0,
            0,
            55,
            100,
            7,
            0.09,
            0,
            false,
            false
        );

        // Teleport in
        // face right
        this.animations[this.states.teleportIn][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-teleport-55x100.png'),
            385,
            0,
            55,
            100,
            7,
            0.09,
            0,
            false,
            false
        );
        // face left
        this.animations[this.states.teleportIn][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-teleport-55x100.png'),
            0,
            0,
            55,
            100,
            7,
            0.09,
            0,
            true,
            false
        );

        // Dash
        // face right
        this.animations[this.states.dash][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-dash-97x100.png'),
            485,
            0,
            97,
            100,
            5,
            0.03,
            0,
            true,
            false
        );
        // face left
        this.animations[this.states.dash][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-dash-97x100.png'),
            0,
            0,
            97,
            100,
            5,
            0.03,
            0,
            false,
            false
        );

        // Kamehameha - attack1
        // face right
        this.animations[this.states.attack1][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-attack1-81x100.png'),
            243,
            0,
            81,
            100,
            2,
            0.1,
            0,
            false,
            false
        );
        // face left
        this.animations[this.states.attack1][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-attack1-81x100.png'),
            81,
            0,
            81,
            100,
            2,
            0.1,
            0,
            true,
            false
        );

        // Energy wave - attack2
        // face right
        this.animations[this.states.attack2][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-attack2-117x124.png'),
            468,
            0,
            117,
            124,
            4,
            0.09,
            0,
            true,
            false
        );
        // face left
        this.animations[this.states.attack2][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-attack2-117x124.png'),
            0,
            0,
            117,
            124,
            4,
            0.09,
            0,
            false,
            false
        );

        // Balls attack - attack3
        // face right
        this.animations[this.states.attack3][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-attack3-70x101.png'),
            140,
            0,
            70,
            101,
            2,
            0.12,
            0,
            true,
            true
        );
        // face left
        this.animations[this.states.attack3][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-attack3-70x101.png'),
            0,
            0,
            70,
            101,
            2,
            0.12,
            0,
            false,
            true
        );

        // dead
        // face right
        this.animations[this.states.dead][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-death-119x113.png'),
            4998,
            0,
            119,
            113,
            42,
            0.06,
            0,
            true,
            false
        );
        // face left
        this.animations[this.states.dead][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/sigma/sigma-death-119x113.png'),
            0,
            0,
            119,
            113,
            42,
            0.06,
            0,
            false,
            false
        );
    }

    // TODO
    die() {
        this.game.camera.finalTime = this.game.camera.getFormattedTime();
        this.game.camera.isLevel = false;
        this.game.camera.currentState = 3;
        this.game.camera.setMenuMode(this.game);
        this.removeFromWorld = true;
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.state === this.states.dash) {
            this.BB = new BoundingBox(
                this.x,
                this.y + 37 * this.scale,
                51 * this.scale,
                50 * this.scale
            );
        } else {
            this.BB = new BoundingBox(
                this.x,
                this.y,
                51 * this.scale,
                87 * this.scale
            );
        }
    }

    setOffset() {
        switch (this.state) {
            case this.states.spawnIn:
                this.spriteOffset.x = -114;
                this.spriteOffset.y = -30;
                break;
            case this.states.wingsOff:
                this.spriteOffset.x = -63;
                this.spriteOffset.y = -3;
                break;
            case this.states.idle:
                this.spriteOffset.x = this.facing === 0 ? -84 : -7;
                this.spriteOffset.y = 1;
                break;
            case this.states.dash:
                this.spriteOffset.x = this.facing === 0 ? -90 : 0;
                this.spriteOffset.y = 1;
                break;
            case this.states.attack1:
                this.spriteOffset.x = this.facing === 0 ? -8 : -51;
                this.spriteOffset.y = 0;
                break;
            case this.states.attack2:
                this.spriteOffset.x = this.facing === 0 ? 0 : -130;
                this.spriteOffset.y = -40;
                break;
            case this.states.dead:
                this.spriteOffset.x = this.facing === 0 ? -69 : -64;
                this.spriteOffset.y = -35;
                break;
            default:
                this.spriteOffset.x = 0;
                this.spriteOffset.y = 0;
                break;
        }
    }

    update() {
        const TICK = this.game.clockTick;

        if (this.iframes >= 0) {
            this.flashframes = (this.flashframes + 60 * TICK) % 10;
        } else {
            this.flashframes = 0;
        }

        if (this.health <= 0) this.isDead = true;

        this.iframes -= 1 * this.game.clockTick;

        if (this.isDead) {
            this.state = this.states.dead;
            this.isHostile = false;
            this.isPog = false;
            this.collisionDamage = 0;
            this.sigmaHead.die();
            this.wave.die();
            this.topWave.die();
            this.bottomWave.die();
            this.setOffset();

            if (this.animations[this.states.dead][this.facing].isDone())
                this.die();
        } else {
            // ACTIONS
            if (this.isIntro) {
                if (getDistance(this.introObject, this.game.player) <= 300) {
                    this.game.player.immobilized = true;
                    this.game.player.meetBoss = true;
                    this.state = this.states.spawnIn;
                    this.velocity.y += 60 * TICK;
                    this.y += this.velocity.y * TICK * this.scale;
                    if (
                        this.animations[
                            this.states.spawnIn
                        ][1].currentFrame() === 13
                    ) {
                        this.velocity.y = 100;
                    }
                    if (this.animations[this.states.spawnIn][1].isDone()) {
                        this.state = this.states.wingsOff;
                    }
                    if (this.animations[this.states.wingsOff][1].isDone()) {
                        this.isIntro = false;

                        // after intro is done
                        this.state = this.states.idle;
                        this.game.player.checkpointX = 148 * BLOCK_DIMENSION;
                        this.game.player.checkpointY = -161 * BLOCK_DIMENSION;

                        this.game.player.immobilized = false;
                        this.game.player.meetBoss = false;
                    }
                } else {
                    this.game.player.immobilized = false;
                    this.game.player.meetBoss = false;
                    this.animations[this.states.spawnIn][1].elapsedTime = 0;
                }
            }

            // start attack patterns
            if (this.state === this.states.idle) {
                this.attackCooldown -= this.game.clockTick;
                this.attackCooldown = Math.max(this.attackCooldown, 0);
                this.attackManager();
            }

            // teleport
            if (
                this.state === this.states.teleportIn ||
                this.state === this.states.teleportOut
            ) {
                if (this.performTeleport !== null) {
                    this.teleport(this.performTeleport);
                }
            }

            // dash
            if (this.state === this.states.dash) {
                this.dashAttack(this.dashEndAction);
                this.soundEffects.dash.play();
            }

            // kamehameha - attack1
            if (this.state === this.states.attack1) {
                this.kamehameha(this.laserEndAction);
            }

            // energy wave - attack2
            if (this.state === this.states.attack2) {
                this.wave2StartTime -= this.game.clockTick;
                this.wave2StartTime = Math.max(this.wave2StartTime, 0);
                this.energyWave();
                if (
                    this.animations[this.states.attack2][
                        this.facing
                    ].isDone() &&
                    this.wave2StartTime === 0
                ) {
                    this.state = this.states.idle;
                    this.animations[this.states.attack2][
                        this.facing
                    ].elapsedTime = 0;
                    this.wave2StartTime = 0.9;

                    // do something after wave attack
                    this.state = this.waveEndAction;
                }
            }

            // balls - attack3
            if (this.state === this.states.attack3) {
                if (this.game.player.x <= this.x) this.facing = 1;
                else this.facing = 0;
                this.spawnBalls(this.ballsEndAction);
            }
            // END ACTION

            if (!this.isIntro) {
                // Update velocity
                if (this.velocity.y >= 200) this.velocity.y = 200;
                if (this.velocity.y <= -200) this.velocity.y = -200;

                // Update position
                this.y += this.velocity.y * TICK * this.scale;
            }

            // Collision
            this.game.entities.forEach((entity) => {
                // Collide with player attacks
                // if (entity.attackBB && this.BB.collide(entity.attackBB)) {
                //     // Trigger teleport for testing
                //     this.state = this.states.teleportOut;
                // }

                if (entity.BB && this.BB.collide(entity.BB)) {
                    // Going down - check bottom collision
                    if (this.velocity.y > 0) {
                        if (
                            (entity instanceof Ground ||
                                entity instanceof BossDoor) &&
                            this.lastBB.bottom <= entity.BB.top
                        ) {
                            this.y = entity.BB.top - this.BB.height;
                            this.velocity.y = 0;
                            this.updateBB();
                        }
                    }
                    // Going up - check top collision
                    if (this.velocity.y < 0) {
                        if (
                            (entity instanceof Ground ||
                                entity instanceof BossDoor) &&
                            this.lastBB.top >= entity.BB.bottom
                        ) {
                            this.velocity.y = 0;
                        }
                    }
                    // Side collisions
                    if (
                        (entity instanceof Ground ||
                            entity instanceof BossDoor) &&
                        this.BB.collide(entity.leftBB)
                    ) {
                        this.x = entity.BB.left - this.BB.width;
                        // this.facing = 0;
                        if (this.velocity.x > 0) this.velocity.x = 0;
                        if (this.state === this.states.dash) {
                            // this.state = this.states.idle;
                            this.facing = 1;
                            // Do something after dash here
                            this.state = this.dashEndAction;
                        }
                    } else if (
                        (entity instanceof Ground ||
                            entity instanceof BossDoor) &&
                        this.BB.collide(entity.rightBB)
                    ) {
                        this.x = entity.BB.right;
                        // this.facing = 1;
                        if (this.velocity.x < 0) this.velocity.x = 0;
                        if (this.state === this.states.dash) {
                            // this.state = this.states.idle;
                            this.facing = 0;
                            // Do something after dash here
                            this.state = this.dashEndAction;
                        }
                    }
                }
            });

            // Update facing
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;

            this.updateBB();
        }
        this.setOffset();
    }

    attackManager() {
        if (this.pattern === null) {
            let patternNum = 3;
            if (this.health <= 212) patternNum = 4;
            this.pattern = randomInt(patternNum);
        }

        if (this.attackCooldown === 0) {
            let side = randomInt(2);
            switch (this.pattern) {
                case 0:
                    this.state = this.states.teleportOut;
                    this.performTeleport = {
                        ...this.teleportPoints[side],
                    };
                    this.performTeleport.action = this.states.dash;
                    this.dashEndAction = this.states.idle;
                    break;
                case 1:
                    this.state = this.states.teleportOut;
                    this.performTeleport = {
                        ...this.teleportPoints[this.teleportTo.mid],
                    };
                    this.performTeleport.action = this.states.attack3;
                    this.ballsEndAction = this.states.idle;
                    break;
                case 2:
                    this.state = this.states.teleportOut;
                    this.performTeleport = {
                        ...this.teleportPoints[side + 2],
                    };
                    this.performTeleport.action = this.states.attack2;
                    this.waveEndAction = this.states.idle;
                    break;
                case 3:
                    this.state = this.states.teleportOut;
                    this.performTeleport = {
                        ...this.teleportPoints[side],
                    };
                    this.performTeleport.action = this.states.attack1;
                    this.laserEndAction = this.states.idle;
                    break;
            }
            this.attackCooldown = 0.6;
            this.pattern = null;
        }
    }

    teleport({ x, y, type, action }) {
        // When teleporting, should not:
        // - deal damage/ take damage
        // - pogo
        this.isHostile = false;
        this.isPog = false;

        // set state to teleport out
        if (this.animations[this.states.teleportOut][this.facing].isDone()) {
            this.x = x;
            this.y = y;
            // play teleport animation, when done set to new position
            // state is now teleport in
            this.state = this.states.teleportIn;
            this.soundEffects.teleport.play();
        }
        if (this.animations[this.states.teleportIn][this.facing].isDone()) {
            this.state = this.states.idle;
            this.animations[this.states.teleportOut][
                this.facing
            ].elapsedTime = 0;
            this.animations[this.states.teleportIn][
                this.facing
            ].elapsedTime = 0;

            // teleport done, set these back to true
            this.isHostile = true;
            this.isPog = true;
            if (type !== 'mid') this.facing = type === 'right' ? 1 : 0;

            // Do something after teleport here
            this.state = action;
        }
    }

    dashAttack(action) {
        // Dash until hit a wall
        this.velocity.x = this.facing === 0 ? 400 : -400;
        this.x += this.velocity.x * this.game.clockTick * this.scale;
        this.dashEndAction = action;
    }

    kamehameha(action) {
        if (this.sigmaHead.beamEnd > 0) {
            this.sigmaHead.isHidden = false;
            this.sigmaHead.spawnIn = true;
            this.sigmaHead.facing = this.facing;
            if (this.facing === 1)
                this.sigmaHead.x = this.x - this.sigmaHead.BB.width;
            else this.sigmaHead.x = this.x + this.BB.width;

            if (this.sigmaHead.state !== this.sigmaHead.states.attack)
                this.sigmaHead.y = this.y - this.BB.height;
        } else {
            this.sigmaHead.spawnIn = false;
            this.sigmaHead.spawnOut = true;
            this.sigmaHead.isHostile = false;
            this.sigmaHead.isPog = false;
            this.sigmaHead.collisionDamage = 0;

            // do something after laser
            this.state = action;

            // Reset Kamehameha
            this.sigmaHead = new SigmaHead(this.game, null, null, true);
            this.game.addEntityAtIndex(this.sigmaHead, this.entityArrayPos);
            this.game.addEntityAtIndex(
                this.sigmaHead.beam,
                this.entityArrayPos
            );
        }
    }

    energyWave() {
        let xOffset = this.facing === 0 ? 10 : -30;
        if (!this.wave.started) {
            this.soundEffects.wave.play();
            this.wave.start(this.x + xOffset, this.y - 60, this.facing);
        }
        if (this.wave2StartTime === 0) {
            this.soundEffects.wave.play();
            if (!this.topWave.started && !this.bottomWave.started) {
                this.bottomWave.start(
                    this.x + xOffset,
                    this.y + 65,
                    this.facing
                );
                this.topWave.start(
                    this.x + xOffset,
                    this.bottomWave.y - 450,
                    this.facing
                );
            }
        }
    }

    spawnBalls(action) {
        this.ballTimeout -= this.game.clockTick;
        this.ballTimeout = Math.max(this.ballTimeout, 0);
        let ballSpeed = 300;
        // increase offset
        this.ballOffset += this.game.clockTick * 90;
        this.ballOffset = Math.min(this.ballOffset, this.BB.height);

        this.ballSpeedOffset += this.game.clockTick * 180;
        this.ballSpeedOffset = Math.min(this.ballSpeedOffset, ballSpeed * 2);

        if (this.ballTimeout === 0) {
            this.soundEffects.balls.play();
            // top left
            this.game.addEntityAtIndex(
                new SigmaBall(
                    this.game,
                    this.x + this.ballOffset,
                    this.y,
                    -ballSpeed + this.ballSpeedOffset,
                    -ballSpeed
                ),
                this.entityArrayPos + 1
            );
            // top right
            this.game.addEntityAtIndex(
                new SigmaBall(
                    this.game,
                    this.x + this.BB.width,
                    this.y + this.ballOffset,
                    ballSpeed,
                    -ballSpeed + this.ballSpeedOffset
                ),
                this.entityArrayPos + 1
            );
            // bottom left
            this.game.addEntityAtIndex(
                new SigmaBall(
                    this.game,
                    this.x,
                    this.y + this.BB.height - this.ballOffset,
                    -ballSpeed,
                    ballSpeed - this.ballSpeedOffset
                ),
                this.entityArrayPos + 1
            );
            // bottom right
            this.game.addEntityAtIndex(
                new SigmaBall(
                    this.game,
                    this.x + this.BB.width - this.ballOffset,
                    this.y + this.BB.height,
                    ballSpeed - this.ballSpeedOffset,
                    ballSpeed
                ),
                this.entityArrayPos + 1
            );
            // reset timeout
            this.ballTimeout = 0.1;
        }

        // stop attack and reset
        if (this.ballSpeedOffset === ballSpeed * 2) {
            this.ballTimeout = 0.1;
            this.ballOffset = 0;
            this.ballSpeedOffset = 0;
            this.state = action;
        }
    }

    draw(ctx) {
        // damage blink
        if (this.iframes >= 0) {
            ctx.filter = ` brightness(${this.flashframes})`;
        }

        if (getDistance(this, this.game.player) < 1200) {
            this.animations[this.state][this.facing].drawFrame(
                this.game.clockTick,
                ctx,
                this.x - this.game.camera.x + this.spriteOffset.x,
                this.y - this.game.camera.y + this.spriteOffset.y,
                this.scale
            );
            if (this.iframes >= 0) {
                ctx.filter = 'none';
            }
            this.healthBar.drawBossHealthBar(ctx);
        }

        if (params.debug) {
            ctx.strokeStyle = 'Orange';
            ctx.strokeRect(
                this.BB.x - this.game.camera.x,
                this.BB.y - this.game.camera.y,
                this.BB.width,
                this.BB.height
            );

            ctx.font = '20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.fillText(
                this.x / 64 + ', ' + this.y / 64,
                this.x - this.game.camera.x + 40, // camera sidescrolling
                this.y - this.game.camera.y - 20
            );
        }
    }
}

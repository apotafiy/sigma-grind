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
            { x: (x + 2) * 64, y: (y - 2.5) * 64, type: 'right' },
            { x: (x - 12) * 64, y: (y - 2.5) * 64, type: 'left' },
        ];

        this.facing = 1;
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 400;

        this.isIntro = true;
        this.isPog = true;
        this.isHostile = true;
        this.collisionDamage = 10;
        this.isDead = false;

        // Boss health
        this.maxHealth = 320;
        this.health = this.maxHealth;
        this.healthBar = new HealthBar(this);
        this.iframes = 0;
        this.flashframes = 0;

        //sound imports
        this.soundEffects = {};
        // this.soundEffects.attack = SOUND_MANAGER.getSound('dogboss_roar');
        // this.soundEffects.launch_attack = SOUND_MANAGER.getSound(
        //     'dogboss_launch_projectile'
        // );
        // this.soundEffects.walk = SOUND_MANAGER.getSound('dogboss_walk');

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
    }

    loadAnimation() {
        for (var i = 0; i < 9; i++) {
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
    }

    // TODO
    die() {}

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(
            this.x,
            this.y,
            51 * this.scale,
            87 * this.scale
        );
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

        if (this.health <= 0) this.die();

        this.iframes -= 1 * this.game.clockTick;

        if (this.isDead) {
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

                        // KAMEHAMEHA after intro is done
                        // for testing only, remove when done
                        // this.state = this.states.attack1;

                        this.game.player.immobilized = false;
                        this.game.player.meetBoss = false;
                    }
                } else {
                    this.game.player.immobilized = false;
                    this.game.player.meetBoss = false;
                    this.animations[this.states.spawnIn][1].elapsedTime = 0;
                }
            }

            // teleport
            if (
                this.state === this.states.teleportIn ||
                this.state === this.states.teleportOut
            ) {
                this.teleport(this.teleportPoints[randomInt(2)]);
            }

            // dash
            if (this.state === this.states.dash) {
                this.dashAttack();
            }

            // kamehameha - attack1
            if (this.state === this.states.attack1) {
                this.kamehameha();
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
                if (entity.attackBB && this.BB.collide(entity.attackBB)) {
                    // Trigger teleport for testing
                    this.state = this.states.teleportOut;
                }

                if (entity.BB && this.BB.collide(entity.BB)) {
                    // Going down - check bottom collision
                    if (this.velocity.y > 0) {
                        if (
                            entity instanceof Ground &&
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
                            entity instanceof Ground &&
                            this.lastBB.top >= entity.BB.bottom
                        ) {
                            this.velocity.y = 0;
                        }
                    }
                    // Side collisions
                    if (
                        entity instanceof Ground &&
                        this.BB.collide(entity.leftBB)
                    ) {
                        this.x = entity.BB.left - this.BB.width;
                        // this.facing = 0;
                        if (this.velocity.x > 0) this.velocity.x = 0;
                        if (this.state === this.states.dash) {
                            this.state = this.states.idle;
                            this.facing = 1;
                        }
                    } else if (
                        entity instanceof Ground &&
                        this.BB.collide(entity.rightBB)
                    ) {
                        this.x = entity.BB.right;
                        // this.facing = 1;
                        if (this.velocity.x < 0) this.velocity.x = 0;
                        if (this.state === this.states.dash) {
                            this.state = this.states.idle;
                            this.facing = 0;
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

    teleport({ x, y, type }) {
        // When teleporting, should not:
        // - deal damage/ take damage
        // - pogo
        this.isHostile = false;
        this.isPog = false;

        // set state to teleport out
        // console.log(this.state + ' ' + this.facing);
        if (this.animations[this.states.teleportOut][this.facing].isDone()) {
            this.x = x;
            this.y = y;
            // play teleport animation, when done set to new position
            // state is now teleport in
            this.state = this.states.teleportIn;
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
            this.facing = type === 'right' ? 1 : 0;

            // Kamehameha after teleport, delete later
            this.state = this.states.attack1;
        }
    }

    dashAttack() {
        // Dash until hit a wall
        this.velocity.x = this.facing === 0 ? 400 : -400;
        this.x += this.velocity.x * this.game.clockTick * this.scale;
    }

    kamehameha() {
        // console.log(this.sigmaHead.beamEnd);
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
            // this.entityArrayPos -= 1;
            this.state = this.states.idle;

            // Reset Kamehameha
            this.sigmaHead = new SigmaHead(this.game, null, null, true);
            this.game.addEntityAtIndex(this.sigmaHead, this.entityArrayPos);
            this.game.addEntityAtIndex(
                this.sigmaHead.beam,
                this.entityArrayPos
            );

            // this.sigmaHead.beam = new Beam(
            //     this.game,
            //     null,
            //     null,
            //     this.sigmaHead
            // );
            // this.game.addEntityAtIndex(
            //     this.sigmaHead.beam,
            //     this.entityArrayPos + 1
            // );
        }
    }

    draw(ctx) {
        // console.log(getDistance(this, this.game.player));

        // damage blink
        if (this.iframes >= 0) {
            ctx.filter = ` brightness(${this.flashframes})`;
        }

        if (this.health <= 0) {
            // make scale = 0 so he disappear for now
            this.scale = 0;
        }

        // console.log(this.state + ' ' + this.facing);
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

        // ctx.lineWidth = 2;
        // ctx.strokeStyle = '#000000';
        // ctx.strokeRect(
        //     this.x - this.game.camera.x + 60,
        //     this.y - this.game.camera.y - 40,
        //     200,
        //     30
        // );

        // ctx.lineWidth = 2;
        // ctx.strokeStyle = '#00FF00';
        // ctx.fillStyle = '#00FF00';
        // ctx.fillRect(
        //     this.x - this.game.camera.x + 60,
        //     this.y - this.game.camera.y - 40,
        //     (this.health / this.maxHealth) * 200,
        //     30
        // );

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

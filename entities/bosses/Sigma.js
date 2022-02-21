class Sigma {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.scale = 2;
        // this.game = game;

        this.state = 0;
        this.states = {
            spawnIn: 0,
            wingsOff: 1,
            idle: 2,
        };
        this.x = x * 64;
        this.y = y * 64;

        this.facing = 0;
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

        this.animations = [[], []];
        this.spriteOffset = {
            x: 0,
            y: 0,
        };
        this.loadAnimation();
        this.updateBB();
    }

    loadAnimation() {
        // Spawning in
        this.animations[this.states.spawnIn][0] = new Animator(
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
        this.animations[this.states.wingsOff][0] = new Animator(
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
    }

    // TODO
    die() {}

    updateBB() {
        this.lastBB = this.BB;
        const yOffSet = 0; // Make sprite goes below the ground slightly not the bounding box itself
        this.BB = new BoundingBox(
            this.x,
            this.y,
            51 * this.scale,
            93 * this.scale - yOffSet
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
                break;
            default:
                this.spriteOffset.x = 0;
                this.spriteOffset.y = 0;
                break;
        }
    }

    update() {
        const TICK = this.game.clockTick;
        if (this.isDead) {
        } else {
            // Actions
            if (this.isIntro) {
                // console.log(getDistance(this, this.game.player));
                if (getDistance(this, this.game.player) <= 600) {
                    this.game.player.immobilized = true;
                    this.game.player.meetBoss = true;
                    this.game.player.state = this.game.player.states.idle;
                    this.game.player.velocity.x = 0;
                    this.game.player.velocity.y = 0;
                    this.game.player.updateBB();

                    this.state = this.states.spawnIn;
                    this.velocity.y += 60 * TICK;
                    this.y += this.velocity.y * TICK * this.scale;
                    if (
                        this.animations[
                            this.states.spawnIn
                        ][0].currentFrame() === 13
                    ) {
                        this.velocity.y = 100;
                    }
                    if (this.animations[this.states.spawnIn][0].isDone()) {
                        this.state = this.states.wingsOff;
                    }
                    if (this.animations[this.states.wingsOff][0].isDone()) {
                        this.isIntro = false;
                        // after intro is done
                        // set state to wings off for now
                        this.state = this.states.wingsOff;
                        this.facing = 0;
                        this.game.player.immobilized = false;
                        this.game.player.meetBoss = false;
                    }
                } else {
                    this.game.player.immobilized = false;
                    this.game.player.meetBoss = false;
                    this.animations[this.states.spawnIn][0].elapsedTime = 0;
                }
            }

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
                    console.log('ouch');
                    this.teleport(14, 0);
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
                        this.facing = 0;
                        if (this.velocity.x > 0) this.velocity.x = 0;
                    } else if (
                        entity instanceof Ground &&
                        this.BB.collide(entity.rightBB)
                    ) {
                        this.x = entity.BB.right;
                        this.facing = 1;
                        if (this.velocity.x < 0) this.velocity.x = 0;
                    }
                }
            });

            this.updateBB();
        }
        this.setOffset();
    }

    teleport(x, y) {
        // set state to teleport
        // play teleport animation, when done set to new position
        this.x = x * 64;
        this.y = y * 64;
    }

    draw(ctx) {
        //damage blink
        // if (this.iframes >= 0) {
        //     ctx.filter = ` brightness(${this.flashframes})`;
        // }

        // if (this.health <= 0) {
        //     ctx.filter = `brightness(100) hue-rotation(100deg)`;
        //     this.scale = this.deathTimer;
        // }

        // console.log(this.state + ' ' + this.facing);
        if (getDistance(this, this.game.player) < 800) {
            this.animations[this.state][this.facing].drawFrame(
                this.game.clockTick,
                ctx,
                this.x - this.game.camera.x + this.spriteOffset.x,
                this.y - this.game.camera.y + this.spriteOffset.y,
                this.scale
            );
        }

        if (this.health <= 0) ctx.filter = `none`;
        if (this.iframes >= 0) {
            ctx.filter = 'none';
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

        this.healthBar.drawBossHealthBar(ctx);

        if (params.debug) {
            ctx.strokeStyle = 'Orange';
            ctx.strokeRect(
                this.BB.x - this.game.camera.x,
                this.BB.y - this.game.camera.y,
                this.BB.width,
                this.BB.height
            );
        }
    }
}

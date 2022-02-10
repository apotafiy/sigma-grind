class Player {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game.player = this;
        this.animationTick = 0;

        // Direction/Movements
        this.facing = 0; // 0 = right, 1 = left
        this.velocity = { x: 0, y: 0 };
        this.isInAir = true;
        this.airDashed = false;
        this.fallAcc = 400;

        // Attacks
        this.attackSpeed = 0.025;
        this.comboState = 0; // for adding combo attack later
        this.attackCooldown = 0;
        this.attacking = false;
        this.attackBB = new BoundingBox(0, 0, 0, 0);

        // Gives the player a health bar
        this.currentHitpoints = 100;
        this.maxHitpoints = 100;
        this.percentHealth = this.currentHitpoints / this.maxHitpoints;
        this.healthBar = new HealthBar(this);

        this.currentIFrameTimer = 0;
        this.maxIFrameTimer = 60; // 60 ticks * 1 second/60 ticks = 1 second

        /* States:
        0 - idle
        1 - run
        2 - dash
        3 - jump
        4 - falling
        5 - wall hang
        6 - Attack part 1
        7 - attack part 2
        8 - attack part 3
        9 - death
        ...
        */
        this.state = 0;
        this.states = {
            idle: 0,
            run: 1,
            dash: 2,
            jump: 3,
            fall: 4,
            wallHang: 5,
            attack1: 6,
            attack2: 7,
            attack3: 8,
            death: 9,
        };
        this.dead = false;

        // Size and bounding box
        this.currentSize = { width: 40, height: 50 };
        this.spriteOffset = { xOffset: 0, yOffset: 0 };
        this.updateBB();

        this.animations = [];
        this.idleSprite = ASSET_MANAGER.getAsset(
            './sprites/player/player-idle-43x48.png'
        );
        this.runSprite = ASSET_MANAGER.getAsset(
            './sprites/player/player-run-51x49.png'
        );
        this.jumpSprite = ASSET_MANAGER.getAsset(
            './sprites/player/player-jump-47x80.png'
        );
        this.wallhangSprite = ASSET_MANAGER.getAsset(
            './sprites/player/player-wallhang-36x65.png'
        );
        this.dashSprite = ASSET_MANAGER.getAsset(
            './sprites/player/player-dash-97x52.png'
        );

        this.attackRight = ASSET_MANAGER.getAsset(
            './sprites/player/zero_attack_right_one_92_64_2.png'
        );
        this.attackRightTwo = ASSET_MANAGER.getAsset(
            './sprites/player/zero_attack_right_two.png'
        );
        this.attackRightThree = ASSET_MANAGER.getAsset(
            './sprites/player/zero_attack_right_three_114x64-Sheet.png'
        );

        this.death = ASSET_MANAGER.getAsset(
            './sprites/player/player-death-60x62.png'
        );

        this.loadAnimations();

        // Dat GUI stuff
        this.gui = new dat.GUI();
        this.playerFolder = this.gui.addFolder('Player values');
        this.testValues = {
            attackSpeed: this.attackSpeed,
        };
        this.playerFolder
            .add(this.testValues, 'attackSpeed')
            .min(0.005)
            .max(0.5)
            .step(0.005)
            .onChange(val => {
                this.attackSpeed = val;
                this.loadAnimations();
            })
            .name('Attack Speed');
    }

    loadAnimations() {
        for (var i = 0; i < 10; i++) {
            // six states
            this.animations.push([]);
            for (var k = 0; k < 2; k++) {
                // two directions
                this.animations[i].push([]);
            }
        }

        // Idle - State 0
        // Face right = 0
        this.animations[0][0] = new Animator(
            this.idleSprite,
            0,
            0,
            43,
            48,
            5,
            0.18,
            0,
            false,
            true
        );
        // Face left = 1
        this.animations[0][1] = new Animator(
            this.idleSprite,
            215,
            0,
            43,
            48,
            5,
            0.18,
            0,
            true,
            true
        );

        // Run - State 1
        // Face right = 0
        this.animations[1][0] = new Animator(
            this.runSprite,
            95,
            0,
            51,
            49,
            14,
            0.05,
            0,
            false,
            true
        );
        // Face left = 1
        this.animations[1][1] = new Animator(
            this.runSprite,
            823,
            0,
            51,
            49,
            14,
            0.05,
            0,
            true,
            true
        );

        // Dash - State 2
        // Face right = 0
        this.animations[2][0] = new Animator(
            this.dashSprite,
            0,
            0,
            97,
            52,
            11,
            0.05,
            0,
            false,
            true
        );
        // Face left = 1
        this.animations[2][1] = new Animator(
            this.dashSprite,
            1067,
            0,
            97,
            52,
            11,
            0.05,
            0,
            true,
            true
        );

        // Jump - State 3
        // Face right = 0
        this.animations[3][0] = new Animator(
            this.jumpSprite,
            47,
            0,
            47,
            80,
            15,
            0.07,
            0,
            false,
            true
        );
        // Face left = 1
        this.animations[3][1] = new Animator(
            this.jumpSprite,
            752,
            0,
            47,
            80,
            15,
            0.07,
            0,
            true,
            true
        );

        // Fall - State 4 - frames 10,11,12
        // Face right = 0
        this.animations[4][0] = new Animator(
            this.jumpSprite,
            423,
            0,
            47,
            80,
            3,
            0.07,
            0,
            false,
            true
        );
        // Face left = 1
        this.animations[4][1] = new Animator(
            this.jumpSprite,
            940,
            0,
            47,
            80,
            3,
            0.07,
            0,
            true,
            true
        );

        // Wall hang - State 5
        // Face right = 0
        this.animations[5][0] = new Animator(
            this.wallhangSprite,
            0,
            0,
            45,
            65,
            2,
            0.12,
            0,
            false,
            true
        );
        // Face left = 1
        this.animations[5][1] = new Animator(
            this.wallhangSprite,
            90,
            0,
            45,
            65,
            2,
            0.12,
            0,
            true,
            true
        );

        // Attack1
        // Face right = slash 1
        this.animations[6][0] = new Animator(
            this.attackRight,
            0,
            0,
            92,
            64,
            12,
            this.attackSpeed,
            2,
            false,
            false
        );
        // Face left = slash 1
        this.animations[6][1] = new Animator(
            this.attackRight,
            1090,
            0,
            92,
            64,
            12,
            this.attackSpeed,
            2,
            true,
            false
        );

        // Face right slash two
        this.animations[7][0] = new Animator(
            this.attackRightTwo,
            0,
            0,
            114,
            64,
            11,
            this.attackSpeed,
            1,
            true,
            false
        );

        // Face right slash 3
        this.animations[8][0] = new Animator(
            this.attackRightThree,
            0,
            0,
            112,
            74,
            12,
            this.attackSpeed,
            2,
            false,
            false
        );

        this.animations[9][0] = new Animator(
            this.death,
            0,
            0,
            60,
            62,
            10,
            0.1,
            0,
            false,
            false
        );
    }

    updateBB() {
        this.lastBB = this.BB;

        // Get the right sprite offset for the current state
        switch (this.state) {
            case this.states.idle:
                this.spriteOffset.xOffset = this.facing === 0 ? 0 : -6;
                this.spriteOffset.yOffset = 0;
                break;
            case this.states.run:
                this.spriteOffset.xOffset = this.facing === 0 ? -15 : -6;
                this.spriteOffset.yOffset = 0;
                break;
            case this.states.dash:
                if (this.velocity.x === 0)
                    this.spriteOffset.xOffset = this.facing === 0 ? 0 : -6;
                else this.spriteOffset.xOffset = this.facing === 0 ? -102 : -10;
                this.spriteOffset.yOffset = 0;
                break;
            case this.states.jump:
                this.spriteOffset.xOffset = this.facing === 0 ? -10 : -3;
                this.spriteOffset.yOffset = -50;
                break;
            case this.states.fall:
                this.spriteOffset.xOffset = this.facing === 0 ? -10 : -3;
                this.spriteOffset.yOffset = -42;
                break;
            case this.states.wallHang:
                this.spriteOffset.xOffset = this.facing === 0 ? -10 : 0;
                this.spriteOffset.yOffset = -20;
                break;
            case this.states.attack1:
                this.spriteOffset.xOffset = -10;
                this.spriteOffset.yOffset = 0;
                break;
        }

        let widthOffset = 0;
        let heightOffset = 10; // Make player sprite goes below the ground slightly not the bounding box itself
        // Offsetting the bounding box like this might make things look weird later when it comes to implementing pogo

        this.BB = new BoundingBox(
            this.x,
            this.y,
            (this.currentSize.width - widthOffset) * 2,
            (this.currentSize.height - heightOffset) * 2
        );
    }

    // TODO
    die() {
        // debugger;
        this.removeFromWorld = true;

        // this.velocity.x = 0;
        // this.velocity.y = 0;
        // this.fallAcc = 0;
        // this.state = this.states.death;

        this.dead = true;
    }

    updateAttackBB() {
        //adjust the BB into the correct direction
        let facing = 0;
        let xoffset = 0;
        if (this.facing == 0) {
            facing = 1;
            xoffset = 80;
        } else {
            facing = -1;
            xoffset = -80;
        }
        if (this.attacking) {
            this.attackBB = new BoundingBox(
                this.x + xoffset,
                this.y - 20,
                80,
                120
            );
        } else {
            this.attackBB = new BoundingBox(0, 0, 0, 0);
        }
    }

    handleDashEnding(RUN_FALL, ACC_RUN, TICK) {
        this.fallAcc = RUN_FALL;
        if (this.facing === 0) {
            this.velocity.x += ACC_RUN * TICK;
            this.velocity.y += this.fallAcc * TICK;
        } else if (this.facing === 1) {
            this.velocity.x -= ACC_RUN * TICK;
            this.velocity.y -= this.fallAcc * TICK;
        }
        this.game.keys.KeyK = false;
    }

    update() {
        const TICK = this.game.clockTick;

        const MIN_RUN = 10;
        const MAX_RUN = 120;

        const MAX_DASH = 300;

        const ACC_RUN = 500;

        const DEC_REL = 600;
        const DEC_SKID = 500;

        const STOP_FALL = 1500;
        const STOP_FALL_A = 400;
        const RUN_FALL = 2025;
        const RUN_FALL_A = 500;
        const MAX_FALL = 270;

        //testing
        if (this.game.keys.KeyJ) this.animationTick = 0;
        if (this.game.keys.KeyK) this.animationTick = 1;
        if (this.game.keys.KeyL) this.animationTick = 2;
        //adjust the attack cooldown
        this.attackCooldown--;

        if (this.dead) {
            // Do death stuff
        } else {
            // Dashing
            if (
                this.game.keys.KeyK &&
                !this.game.keys.Space &&
                !this.attacking
            ) {
                if (this.isInAir) this.airDashed = true;
                if (this.state !== this.states.wallHang) {
                    if (this.game.keys.KeyA && !this.game.keys.KeyD) {
                        this.facing === 1;
                        this.velocity.x = -MAX_DASH;
                    } else if (this.game.keys.KeyD && !this.game.keys.KeyA) {
                        this.facing === 0;
                        this.velocity.x = MAX_DASH;
                    } else {
                        this.velocity.x =
                            this.facing === 0 ? MAX_DASH : -MAX_DASH;
                    }
                    this.velocity.y = 0;
                    this.fallAcc = 0;
                    this.state = this.states.dash;
                    if (this.animations[2][this.facing].elapsedTime >= 0.5)
                        this.handleDashEnding(RUN_FALL, ACC_RUN, TICK);
                }
            } else if (this.game.keys.KeyK && this.game.keys.Space) {
                if (this.isInAir) this.airDashed = true;
                this.handleDashEnding(RUN_FALL, ACC_RUN, TICK);
            } else {
                this.animations[2][this.facing].elapsedTime = 0;
                this.fallAcc = STOP_FALL;
            }
            // End Dashing

            if (
                !this.attacking &&
                this.state !== this.states.jump &&
                this.state !== this.states.fall &&
                this.state !== this.states.wallHang
            ) {
                // not jumping
                // ground physics
                if (Math.abs(this.velocity.x) < MIN_RUN) {
                    // slower than a walk
                    // starting, stopping or turning around
                    this.velocity.x = 0;
                    this.state = this.states.idle;
                    if (this.game.keys.KeyA) {
                        this.velocity.x -= MIN_RUN;
                    }
                    if (this.game.keys.KeyD) {
                        this.velocity.x += MIN_RUN;
                    }
                } else if (Math.abs(this.velocity.x) >= MIN_RUN) {
                    // faster than a walk
                    // accelerating or decelerating
                    if (this.facing === 0) {
                        if (this.game.keys.KeyD && !this.game.keys.KeyA) {
                            this.velocity.x += ACC_RUN * TICK;
                        } else if (
                            this.game.keys.KeyA &&
                            !this.game.keys.KeyD
                        ) {
                            this.velocity.x -= DEC_SKID * TICK;
                        } else {
                            this.velocity.x -= DEC_REL * TICK;
                        }
                    }
                    if (this.facing === 1) {
                        if (this.game.keys.KeyA && !this.game.keys.KeyD) {
                            this.velocity.x -= ACC_RUN * TICK;
                        } else if (
                            this.game.keys.KeyD &&
                            !this.game.keys.KeyA
                        ) {
                            this.velocity.x += DEC_SKID * TICK;
                        } else {
                            this.velocity.x += DEC_REL * TICK;
                        }
                    }
                }

                this.velocity.y += this.fallAcc * TICK;

                // Jump
                if (
                    !this.attacking &&
                    this.game.keys.Space &&
                    !this.game.keys.KeyK &&
                    !this.game.keys.KeyJ &&
                    !this.isInAir
                ) {
                    if (Math.abs(this.velocity.x) < 16) {
                        // Jump height while idle
                        this.velocity.y = -240;
                        this.fallAcc = STOP_FALL;
                    } else {
                        // Jump height while there's side way momentum
                        this.velocity.y = -300;
                        this.fallAcc = RUN_FALL;
                    }

                    // Set state to jump (3)
                    if (!this.attacking) this.state = this.states.jump;
                    // Set the jump animation to start at the beginning
                    this.animations[this.state][this.facing].elapsedTime = 0;
                }
            } else {
                // air physics
                // vertical physics
                if (this.velocity.y <= 0 && this.game.keys.Space) {
                    this.isInAir = true;
                    // holding space while jumping jumps higher
                    if (this.fallAcc === STOP_FALL)
                        this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
                    if (this.fallAcc === RUN_FALL)
                        this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
                } else if (
                    !this.attacking &&
                    this.velocity.y > 0 &&
                    !this.game.keys.Space
                ) {
                    this.state = this.states.fall;
                }
                // this.isInAir = true;

                // horizontal physics
                if (this.game.keys.KeyD && !this.game.keys.KeyA) {
                    this.velocity.x += ACC_RUN * TICK;
                } else if (this.game.keys.KeyA && !this.game.keys.KeyD) {
                    this.velocity.x -= ACC_RUN * TICK;
                } else {
                    // do nothing
                }
            }

            // Faling
            if (this.velocity.y > 0 && !this.attacking) {
                this.state = this.states.fall;
                this.isInAir = true;
            }
        }

        this.velocity.y += this.fallAcc * TICK;

        // Update velocity
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        if (this.velocity.x >= MAX_DASH) this.velocity.x = MAX_DASH;
        if (this.velocity.x <= -MAX_DASH) this.velocity.x = -MAX_DASH;
        if (this.velocity.x >= MAX_RUN && !this.game.keys.KeyK)
            this.velocity.x = MAX_RUN;
        if (this.velocity.x <= -MAX_RUN && !this.game.keys.KeyK)
            this.velocity.x = -MAX_RUN;

        // update position
        // scale = 3
        //handle attacking
        if (
            this.game.keys.KeyJ &&
            this.state !== this.states.wallHang &&
            this.attackCooldown <= 0
        ) {
            //set the player to attacking state
            this.attackCooldown = 10;
            if (!this.animations[6][this.facing].isDone()) {
                this.state = this.states.attack1;
            }

            this.updateBB();
            if (!this.attacking) {
                this.attacking = true;
            } else {
                if (this.state == this.states.attack1) {
                }
            }
        }
        this.updateAttackBB(); //TODO potentially costly
        //stop when attacking
        if (
            this.attacking &&
            ((this.state == this.states.attack1 &&
                this.velocity.y < this.fallAcc &&
                this.velocity.y >= 0) ||
                this.state == this.states.dash)
        ) {
            this.velocity.x = 0;
        }

        this.x += this.velocity.x * TICK * 3;
        this.y += this.velocity.y * TICK * 3;
        this.updateBB();

        // Fall off map = dead
        // Assuming block width is 64
        if (this.y > 64 * 16 || this.currentHitpoints <= 0) this.die();

        // collision
        let that = this;

        if (that.currentIFrameTimer > 0) {
            that.currentIFrameTimer -= 1;
            console.log(that.currentIFrameTimer);
        }

        // console.log(that.currentIFrameTimer);

        this.game.entities.forEach(function (entity) {
            //check for the enemy colliding with sword
            // || entity instanceof Drill
            if (entity.BB && that.attackBB.collide(entity.BB)) {
                if (
                    entity &&
                    entity instanceof Mettaur &&
                    entity.duckTimer <= 0
                ) {
                    console.log('Kill Mettaur');
                    //if it has die method it should die
                    entity.die();
                }
                if (entity && entity instanceof Drill) {
                    console.log('kILL dRILL');
                    //if it has die method it should die
                    entity.die();
                }
            }

            // Collision with player's box
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (
                    entity &&
                    entity.isHostile &&
                    that.currentIFrameTimer === 0
                ) {
                    that.currentHitpoints -= entity.collisionDamage;
                    that.currentIFrameTimer = that.maxIFrameTimer;
                    console.log('Took ' + entity.collisionDamage + ' damage');
                    console.log('Current HP: ' + that.currentHitpoints);
                }
                if (that.velocity.y > 0) {
                    // falling
                    if (
                        entity instanceof Ground && // landing
                        that.lastBB.bottom <= entity.BB.top
                    ) {
                        that.y = entity.BB.top - that.BB.height; //set to top of bounding box of ground
                        that.velocity.y = 0;
                        if (
                            that.state === that.states.jump ||
                            that.state === that.states.fall
                        )
                            that.state = that.states.idle; // set state to idle

                        that.isInAir = false;
                        that.airDashed = false;

                        // Reset number of air dashes to 0 when touch the ground
                        that.updateBB();
                    }
                }
                if (that.velocity.y <= 0) {
                    // jumping
                    // hit ceiling...
                    if (
                        // entity instanceof Ground &&
                        // that.lastBB.top >= entity.BB.bottom
                        entity instanceof Ground &&
                        that.BB.collide(entity.bottomBB)
                    ) {
                        that.velocity.y = 0;
                    }
                }

                // Side collisions
                if (
                    entity instanceof Ground &&
                    entity.type &&
                    that.BB.collide(entity.BB)
                ) {
                    if (that.BB.collide(entity.leftBB)) {
                        // Right side collision
                        that.x = entity.BB.left - that.BB.width;
                        that.facing = 0;
                        if (that.velocity.x > 0) that.velocity.x = 0;
                    }
                    if (that.BB.collide(entity.rightBB)) {
                        // Left side collision
                        that.x = entity.BB.right;
                        that.facing = 1;
                        if (that.velocity.x < 0) that.velocity.x = 0;
                    }
                    // wall hanging
                    if (
                        !that.BB.collide(entity.bottomBB) &&
                        !that.BB.collide(entity.topBB)
                    ) {
                        if (that.velocity.y > 0 && !that.game.keys.Space) {
                            // falling and not holding jump
                            // Set state to wall hang
                            that.state = that.states.wallHang;
                            that.velocity.y = 1;
                            that.isInAir = false;
                            that.airDashed = false;
                            // Reset number of air dashes to 0 when wall hang
                        } else if (
                            that.velocity.y > 0 &&
                            that.game.keys.Space
                        ) {
                            // falling then hit jump, bounce from wall
                            if (that.facing === 1) {
                                that.velocity.x = 100;
                            } else {
                                that.velocity.x = -100;
                            }
                            that.velocity.y = -240;
                            that.fallAcc = STOP_FALL;
                            that.isInAir = true;
                            // Reset jump animation to the beginning
                            that.state = that.states.jump;
                            that.animations[3][0].elapsedTime = 0;
                            that.animations[3][1].elapsedTime = 0;
                        } else if (that.velocity.y === 0) {
                            if (that.game.keys.KeyK) {
                                // Prevent player idle at wall when dashing into wall
                                // that.state = that.states.wallHang;
                                that.handleDashEnding(RUN_FALL, ACC_RUN, TICK);
                            }
                            that.state = that.states.idle;
                        }
                    } else {
                        if (
                            that.BB.collide(entity.topBB) ||
                            that.BB.collide(entity.bottomBB)
                        ) {
                            if (that.game.keys.Space) {
                                // Do nothing lol
                                // this will prevent player stuck at jump loop
                            } else {
                                that.velocity.x = 0;
                                that.velocity.y += that.fallAcc * TICK;
                                that.game.keys.KeyK = false;
                            }
                        } else {
                            that.state = that.states.wallHang;
                            that.handleDashEnding(RUN_FALL, ACC_RUN, TICK);
                        }
                    }
                    that.updateBB();
                }
            }
        });

        // update state
        if (
            !this.attacking &&
            this.state !== this.states.attack1 &&
            this.state !== this.states.attack2 &&
            this.state !== this.state.attack3 &&
            this.state !== this.states.jump &&
            this.state !== this.states.fall &&
            this.state !== this.states.wallHang
        ) {
            if (
                Math.abs(this.velocity.x) > MAX_RUN ||
                Math.abs(this.velocity.x) === MAX_DASH
            ) {
                this.state = this.states.dash;
                this.updateBB();
            } else if (Math.abs(this.velocity.x) >= MIN_RUN) {
                this.state = this.states.run;
                this.updateBB();
            } else if (!this.attacking) {
                this.state = this.states.idle;
            }
        } else {
            if (
                this.state === this.states.jump ||
                this.state === this.states.fall
            )
                this.isInAir = true;
        }

        // update direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;
        if (this.state == this.states.wallHang) {
        }

        // Display values for debugging
        document.getElementById('attacking').innerHTML =
            'YVelocity: ' + this.velocity.y + ' ' + this.attacking;
        document.getElementById('state').innerHTML = 'State: ' + this.state;
    }

    draw(ctx) {
        // -------------------------- Health Bar --------------------------
        // Health bar settings
        // let healthBarWidth = this.BB.width;
        // let healthBarHeight = 10;
        // let healthBarOffset = 20;
        // ctx.lineWidth = 2;
        // let healthBarCorrection = ctx.lineWidth - 1;

        // // Health bar outline
        // ctx.strokeStyle = 'Black';
        // ctx.strokeRect(
        //     this.BB.x - this.game.camera.x - healthBarCorrection,
        //     this.BB.y -
        //         this.game.camera.y -
        //         healthBarOffset -
        //         healthBarCorrection,
        //     healthBarWidth + ctx.lineWidth,
        //     healthBarHeight + ctx.lineWidth
        // );

        // // Health bar fill
        // ctx.fillStyle =
        //     this.percentHealth < 0.33
        //         ? 'Red'
        //         : this.percentHealth < 0.66
        //         ? 'Yellow'
        //         : 'Green';
        // ctx.fillRect(
        //     this.BB.x - this.game.camera.x,
        //     this.BB.y - this.game.camera.y - healthBarOffset,
        //     healthBarWidth * this.percentHealth,
        //     healthBarHeight
        // );

        // Draws a health bar that follows the entity

        // let healthBarWidth = this.BB.width;
        // let healthBarHeight = 10;
        // let healthBarOffset = 20;
        // ctx.lineWidth = 2;
        // let healthBarCorrection = ctx.lineWidth - 1;

        // // Health bar colors and conditional hp bar colors
        // ctx.strokeStyle = 'Black';
        // ctx.fillStyle =
        //     this.percentHealth < 0.33
        //         ? 'Red'
        //         : this.percentHealth < 0.66
        //         ? 'Yellow'
        //         : 'Green';

        // // Conditional if you want the hp bar to only appear when <100% hp
        // // if (this.entity.hitpoints < this.entity.maxhitpoints) {
        // ctx.strokeRect(
        //     this.entity.BB.x - this.entity.game.camera.x - healthBarCorrection,
        //     this.entity.BB.y -
        //         this.entity.game.camera.y -
        //         healthBarOffset -
        //         healthBarCorrection,
        //     healthBarWidth + ctx.lineWidth,
        //     healthBarHeight + ctx.lineWidth
        // );
        // ctx.fillRect(
        //     this.entity.BB.x - this.entity.game.camera.x,
        //     this.entity.BB.y - this.entity.game.camera.y - healthBarOffset,
        //     healthBarWidth * this.percentHealth,
        //     healthBarHeight
        // );

        //actual animation code
        // this.animations[this.state][this.facing].drawFrame(
        //     this.game.clockTick,
        //     ctx,
        //     this.x - this.game.camera.x + this.spriteOffset.xOffset, // camera sidescrolling
        //     this.y - this.game.camera.y + this.spriteOffset.yOffset,
        //     2
        // );

        if (
            this.state === this.states.attack1 ||
            this.state === this.states.attack2 ||
            this.state === this.states.attack3
        ) {
            let tempXOffset = 0;
            let tempYOffset = 0;
            if (this.facing == 0) {
                tempXOffset = -10;
                tempYOffset = -30;
            } else {
                tempXOffset = -80;
                tempYOffset = -30;
            }
            //attacking update to this.facing
            this.animations[this.state][this.facing].drawFrame(
                this.game.clockTick,
                ctx,
                this.x -
                    this.game.camera.x +
                    this.spriteOffset.xOffset +
                    tempXOffset, // camera sidescrolling
                this.y -
                    this.game.camera.y +
                    this.spriteOffset.yOffset +
                    tempYOffset,
                2
            );
            //update to this.facing
            if (this.animations[this.state][this.facing].isDone()) {
                console.log('finished');
                this.attacking = false;
                this.comboState = (this.comboState + 1) % 3;
                this.animations[this.state][this.facing].elapsedTime = 0;
                //TODO possibly remove this
            }
            // console.log("attackl anim");
        } else {
            //all other animations
            this.animations[this.state][this.facing].drawFrame(
                this.game.clockTick,
                ctx,
                this.x - this.game.camera.x + this.spriteOffset.xOffset, // camera sidescrolling
                this.y - this.game.camera.y + this.spriteOffset.yOffset,
                2
            );
            //obviously not attacking
            this.attacking = false;
            // console.log("normal anim");
        }

        // Death animation
        // this.animations[9][0].drawFrame(
        //     this.game.clockTick,
        //     ctx,
        //     this.x - this.game.camera.x + this.spriteOffset.xOffset,
        //     this.y - this.game.camera.y + this.spriteOffset.yOffset,
        //     2
        // );

        // ------------------------ Health Bar ---------------------------------------

        // Draws a health bar that follows the entity

        // let healthBarWidth = this.BB.width;
        // let healthBarHeight = 10;
        // let healthBarOffset = 20;
        // ctx.lineWidth = 2;
        // let healthBarCorrection = ctx.lineWidth - 1;

        // // Health bar colors and conditional hp bar colors
        // ctx.strokeStyle = 'Black';
        // ctx.fillStyle =
        //     this.percentHealth < 0.33
        //         ? 'Red'
        //         : this.percentHealth < 0.66
        //         ? 'Yellow'
        //         : 'Green';

        // // Conditional if you want the hp bar to only appear when <100% hp
        // // if (this.entity.hitpoints < this.entity.maxhitpoints) {
        // ctx.strokeRect(
        //     this.x - this.game.camera.x - healthBarCorrection,
        //     this.y - this.game.camera.y - healthBarOffset - healthBarCorrection,
        //     healthBarWidth + ctx.lineWidth,
        //     healthBarHeight + ctx.lineWidth
        // );
        // ctx.fillRect(
        //     this.x - this.game.camera.x,
        //     this.y - this.game.camera.y - healthBarOffset,
        //     healthBarWidth * this.percentHealth,
        //     healthBarHeight
        // );

        if (params.debug) {
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(
                this.BB.x - this.game.camera.x,
                this.BB.y - this.game.camera.y,
                this.BB.width,
                this.BB.height
            );
            ctx.strokeStyle = 'Orange';
            ctx.strokeRect(
                this.attackBB.x - this.game.camera.x,
                this.attackBB.y - this.game.camera.y,
                this.attackBB.width,
                this.attackBB.height
            );
        }
        // Draws the health bar
        this.healthBar.drawHealthBarFollow(ctx);
    }
}

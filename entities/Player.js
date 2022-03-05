// BLOCK DIMENSION FOR THE GAME WORLD
let BLOCK_DIMENSION = 64;

class Player {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.flashframes = 0;

        this.x = x * BLOCK_DIMENSION;
        this.y = y * BLOCK_DIMENSION;
        this.game.player = this;
        this.animationTick = 0;

        // Direction/Movements
        this.facing = 0; // 0 = right, 1 = left
        this.velocity = { x: 0, y: 0 };
        this.isInAir = true;
        this.airDashed = false;
        this.fallAcc = 400;
        this.meetBoss = false;

        // Attacks
        this.attackSpeed = 0.025;
        this.comboState = 0; // for adding combo attack later
        this.attackCooldown = 0;
        this.attacking = false;
        this.attackBB = new BoundingBox(0, 0, 0, 0);
        this.isPogo = false;
        this.pogoTimer = 0;

        // PLAYER HEALTH AND IFRAME SYSTEM
        this.normalModeHP = 150;
        this.hardcoreModeHP = 50;
        this.maxHealth = params.hardcore
            ? this.hardcoreModeHP
            : this.normalModeHP;
        this.health = this.maxHealth;
        this.currentIFrameTimer = 0;
        // NOTE: 60 TICKS PER SECOND
        this.maxIFrameTimer = 60;

        // PLAYER HEALTH BAR AND HEALTH DRAWING
        this.healthBar = new HealthBar(this);

        // PLAYER LIFE SYSTEM
        this.maxLivesLeft = 2;
        this.livesLeft = this.maxLivesLeft;

        // PLAYER CHECKPOINT SYSTEM
        this.checkpointX = this.x;
        this.checkpointY = this.y;

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
        9 - pogo 
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
            pogo: 9,
            immobilized: 10,
            dead: 11,
        };
        this.dead = false;
        this.immobilized = false;

        //player sound imports
        this.soundEffects = {};
        this.soundEffects.attack = SOUND_MANAGER.getSound('player_attack');
        // this.soundEffects.jump_voice = new Audio(
        //     '../sounds/player/jump_voice.wav'
        // );
        this.soundEffects.jump_voice = SOUND_MANAGER.getSound('player_jump');
        this.soundEffects.run = SOUND_MANAGER.getSound('player_walk');
        this.soundEffects.dash = SOUND_MANAGER.getSound('player_dash');
        this.soundEffects.grunt1 = SOUND_MANAGER.getSound('player_grunt_1');
        this.soundEffects.grunt2 = SOUND_MANAGER.getSound('player_grunt_2');
        this.soundEffects.grunt3 = SOUND_MANAGER.getSound('player_grunt_2');
        this.soundEffects.grunt4 = SOUND_MANAGER.getSound('player_grunt_4');
        this.soundEffects.land = SOUND_MANAGER.getSound('player_land');

        // Size and bounding box
        this.currentSize = { width: 40, height: 50 };
        this.spriteOffset = { xOffset: 0, yOffset: 0 };
        this.updateBB();

        this.animations = [];
        this.loadAnimations();
        this.constants = {
            MIN_RUN: 10,
            MAX_RUN: 120,
            MAX_DASH: 300,
            ACC_RUN: 500,
            DEC_REL: 600,
            DEC_SKID: 500,
            STOP_FALL: 1500,
            STOP_FALL_A: 400,
            RUN_FALL: 2025,
            RUN_FALL_A: 500,
            MAX_FALL: 270,
            STOP_JUMP: -240,
            RUN_JUMP: -300,
            WALL_JUMP: 600,
            POGO_JUMP: -200,
        };
        PlayerDatGUI(game, this);
    }

    loadAnimations() {
        for (var i = 0; i < 12; i++) {
            this.animations.push([]);
            for (var k = 0; k < 2; k++) {
                // two directions
                this.animations[i].push([]);
            }
        }

        // Idle - State 0
        // Face right = 0
        this.animations[0][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/player/player-idle-43x48.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-idle-43x48.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-run-51x49.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-run-51x49.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-dash-97x52.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-dash-97x52.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-jump-47x80.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-jump-47x80.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-jump-47x80.png'),
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
            ASSET_MANAGER.getAsset('./sprites/player/player-jump-47x80.png'),
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
            ASSET_MANAGER.getAsset(
                './sprites/player/player-wallhang-36x65.png'
            ),
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
            ASSET_MANAGER.getAsset(
                './sprites/player/player-wallhang-36x65.png'
            ),
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
            ASSET_MANAGER.getAsset(
                './sprites/player/zero_attack_right_one_92_64_2.png'
            ),
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
            ASSET_MANAGER.getAsset(
                './sprites/player/zero_attack_right_one_92_64_2.png'
            ),
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

        // Face right air attack two
        this.animations[7][0] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/player/player-fall-attack-102x80.png'
            ),
            0,
            0,
            102,
            80,
            9,
            this.attackSpeed + 0.01,
            0,
            false,
            false
        );

        // Face left air attack two
        this.animations[7][1] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/player/player-fall-attack-102x80.png'
            ),
            918,
            0,
            102,
            80,
            9,
            this.attackSpeed + 0.01,
            0,
            true,
            false
        );

        // Face right slash 3
        this.animations[8][0] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/player/zero_attack_right_three_114x64-Sheet.png'
            ),
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

        // Pogo - state 9
        // Face right - 0
        this.animations[9][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/player/player-pogo-65x102.png'),
            130,
            0,
            65,
            102,
            2,
            this.attackSpeed + 0.06,
            0,
            false,
            true
        );
        // Face left - 1
        this.animations[9][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/player/player-pogo-65x102.png'),
            910,
            0,
            65,
            102,
            2,
            this.attackSpeed + 0.06,
            0,
            true,
            true
        );

        // Immobilized - state 10
        // Face right - 0
        this.animations[10][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/player/taken_damage_48x56.png'),
            0,
            0,
            48,
            56,
            4,
            0.09,
            0,
            false,
            false
        );
        // Face left - 1
        this.animations[10][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/player/taken_damage_48x56.png'),
            192,
            0,
            48,
            56,
            4,
            0.09,
            0,
            true,
            false
        );

        // Death - state 11
        // Face right - 0
        this.animations[11][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/player/player-death-60x62.png'),
            0,
            0,
            60,
            62,
            10,
            0.09,
            0,
            false,
            false
        );
        // Face left - 1
        this.animations[11][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/player/player-death-60x62.png'),
            600,
            0,
            60,
            62,
            10,
            0.09,
            0,
            true,
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
            case this.states.attack2:
            case this.states.attack3:
                this.spriteOffset.xOffset = this.facing === 0 ? -10 : -80;
                this.spriteOffset.yOffset = this.facing === 0 ? -30 : -30;
                break;

            case this.states.pogo:
                this.spriteOffset.xOffset = this.facing === 0 ? -30 : -20;
                this.spriteOffset.yOffset = -45;
                break;
            case this.states.immobilized:
                this.spriteOffset.xOffset = this.facing === 0 ? 2 : -18;
                this.spriteOffset.yOffset = -3;
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

    updateAttackBB() {
        //adjust the BB into the correct direction
        if (this.state !== this.states.wallHang) {
            let xoffset = this.facing === 0 ? 80 : -80;
            if (this.attacking && this.state === this.states.pogo) {
                this.attackBB = new BoundingBox(this.x, this.y + 52, 80, 99);
            } else if (this.attacking && this.state !== this.states.pogo) {
                this.attackBB = new BoundingBox(
                    this.x + xoffset,
                    this.y - 20,
                    80,
                    120
                );
            } else {
                this.attackBB = new BoundingBox(0, 0, 0, 0);
            }
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
        /**
         * flash while invincible
         */
        if (this.currentIFrameTimer > 0) {
            this.flashframes = (this.flashframes + 1) % 20;
        } else {
            this.flashframes = 0;
        }

        const TICK = this.game.clockTick;

        if (this.pogoTimer > 0) {
            this.pogoTimer -= TICK;
        } else {
            this.isPogo = false;
        }

        //testing
        if (this.game.keys.KeyJ) this.animationTick = 0;
        if (this.game.keys.KeyK) this.animationTick = 1;
        if (this.game.keys.KeyL) this.animationTick = 2;

        //adjust the attack cooldown
        this.attackCooldown--;
        //play walk sound
        // if(this.state == 1){
        //     this.soundEffects.run.play()
        // }
        // debugger
        if (this.immobilized) {
            if (this.meetBoss) {
                this.state = this.states.idle;
                this.velocity.x = 0;
                this.velocity.y += this.constants.RUN_FALL * TICK;
                this.handlePosition();
                this.handleCollision();
            } else {
                this.state = this.states.immobilized;
                this.updateBB();
                if (this.animations[this.state][this.facing].isDone()) {
                    this.immobilized = false;
                    this.animations[this.states.immobilized][0].elapsedTime = 0;
                    this.animations[this.states.immobilized][1].elapsedTime = 0;
                }
            }
        } else {
            // PHYSICS
            if (
                !this.attacking &&
                this.state !== this.states.jump &&
                this.state !== this.states.fall &&
                this.state !== this.states.attack2 && //falling attack state
                this.state !== this.states.wallHang
            ) {
                // not jumping
                // ground physics
                if (Math.abs(this.velocity.x) < this.constants.MIN_RUN) {
                    // slower than a walk
                    // starting, stopping or turning around
                    this.velocity.x = 0;
                    this.state = this.states.idle;
                    if (this.game.keys.KeyA) {
                        this.velocity.x -= this.constants.MIN_RUN;
                    }
                    if (this.game.keys.KeyD) {
                        this.velocity.x += this.constants.MIN_RUN;
                    }
                } else if (
                    Math.abs(this.velocity.x) >= this.constants.MIN_RUN
                ) {
                    // faster than a walk
                    // accelerating or decelerating
                    if (this.facing === 0) {
                        if (this.game.keys.KeyD && !this.game.keys.KeyA) {
                            this.velocity.x += this.constants.ACC_RUN * TICK;
                        } else if (
                            this.game.keys.KeyA &&
                            !this.game.keys.KeyD
                        ) {
                            this.velocity.x -= this.constants.DEC_SKID * TICK;
                        } else {
                            this.velocity.x -= this.constants.DEC_REL * TICK;
                        }
                    }
                    if (this.facing === 1) {
                        if (this.game.keys.KeyA && !this.game.keys.KeyD) {
                            this.velocity.x -= this.constants.ACC_RUN * TICK;
                        } else if (
                            this.game.keys.KeyD &&
                            !this.game.keys.KeyA
                        ) {
                            this.velocity.x += this.constants.DEC_SKID * TICK;
                        } else {
                            this.velocity.x += this.constants.DEC_REL * TICK;
                        }
                    }
                }

                this.velocity.y += this.fallAcc * TICK;

                // Jump
                if (
                    this.game.keys.Space &&
                    !this.game.keys.KeyK &&
                    !this.game.keys.KeyJ &&
                    !this.isInAir
                ) {
                    this.soundEffects.jump_voice.play();
                    if (Math.abs(this.velocity.x) < 16) {
                        // Jump height while idle
                        this.velocity.y = this.constants.STOP_JUMP;
                        this.fallAcc = this.constants.STOP_FALL;
                    } else {
                        // Jump height while there's side way momentum
                        this.velocity.y = this.constants.RUN_JUMP;
                        this.fallAcc = this.constants.RUN_FALL;
                    }

                    // Set state to jump if not attack (3)
                    // set to attack2 if it is
                    if (!this.attacking) this.state = this.states.jump;
                    else this.state = this.states.attack2;
                    // Set the jump animation to start at the beginning
                    this.animations[this.state][this.facing].elapsedTime = 0;
                }
            } else {
                // air physics
                // vertical physics
                if (
                    this.velocity.y < 0 &&
                    (this.game.keys.Space || this.isPogo)
                ) {
                    // holding space while jumping jumps higher
                    if (this.fallAcc === this.constants.STOP_FALL)
                        this.velocity.y -=
                            (this.constants.STOP_FALL -
                                this.constants.STOP_FALL_A) *
                            TICK;
                    if (this.fallAcc === this.constants.RUN_FALL)
                        this.velocity.y -=
                            (this.constants.RUN_FALL -
                                this.constants.RUN_FALL_A) *
                            TICK;
                    this.isInAir = true; // moved into block
                } else if (
                    !this.attacking &&
                    this.velocity.y > 0 &&
                    !this.game.keys.Space
                ) {
                    this.state = this.states.fall;
                    // console.log('set to fall');
                    this.isInAir = true; // moved into the block
                }

                // horizontal physics
                if (this.game.keys.KeyD && !this.game.keys.KeyA) {
                    this.velocity.x += this.constants.ACC_RUN * TICK;
                } else if (this.game.keys.KeyA && !this.game.keys.KeyD) {
                    this.velocity.x -= this.constants.ACC_RUN * TICK;
                } else {
                    // do nothing
                }
            }
            // END PHYSICS

            // ACTIONS GOES BELOW HERE

            // Dashing
            if (this.game.keys.KeyK && !this.attacking) {
                if (this.isPogo) this.isPogo = false;
                else if (this.isInAir) this.airDashed = true;
                if (this.state !== this.states.wallHang) {
                    //play dash sound effect
                    this.soundEffects.dash.play();
                    if (this.game.keys.KeyA && !this.game.keys.KeyD) {
                        this.facing === 1;
                        this.velocity.x = -this.constants.MAX_DASH;
                    } else if (this.game.keys.KeyD && !this.game.keys.KeyA) {
                        this.facing === 0;
                        this.velocity.x = this.constants.MAX_DASH;
                    } else {
                        this.velocity.x =
                            this.facing === 0
                                ? this.constants.MAX_DASH
                                : -this.constants.MAX_DASH;
                    }
                    this.velocity.y = 0;
                    this.fallAcc = 0;
                    this.state = this.states.dash;
                    if (this.animations[2][this.facing].elapsedTime >= 0.5)
                        this.handleDashEnding(
                            this.constants.RUN_FALL,
                            this.constants.ACC_RUN,
                            TICK
                        );
                }
            } else {
                this.animations[2][this.facing].elapsedTime = 0;
                this.fallAcc = this.constants.STOP_FALL;
                //stop the dash sound if needed
                // this.soundEffects.dash.pause();
                // this.soundEffects.dash.load();
                if (this.velocity.y > 0 && this.state !== this.states.wallHang)
                    this.state = this.states.fall;
            }
            // End Dashing

            // Pogo
            if (
                this.game.keys.KeyS &&
                this.game.keys.KeyJ &&
                this.isInAir &&
                !this.game.keys.KeyK &&
                this.pogoTimer <= 0
            ) {
                this.state = this.states.pogo;
                this.attacking = true;
                this.isPogo = true;
                this.updateAttackBB();
            }
            // End Pogo

            //handle attacking
            if (this.game.keys.KeyJ && this.game.keys.KeyK) {
                // Do nothing
            } else if (
                this.game.keys.KeyJ &&
                this.state !== this.states.wallHang &&
                this.attackCooldown <= 0 &&
                !this.game.keys.KeyS
            ) {
                // debugger;
                //play the attack sound
                this.soundEffects.attack.play();
                //set the player to attacking state
                this.attackCooldown = 10;
                // debugger;
                if (this.isInAir) {
                    this.state = this.states.attack2;
                    if (!this.animations[7][this.facing].isDone()) {
                        this.state = this.states.attack2;
                    }
                } else {
                    this.state = this.states.attack1;
                    if (!this.animations[6][this.facing].isDone()) {
                        this.state = this.states.attack1;
                    }
                }
                this.updateBB();
                if (!this.attacking) {
                    this.attacking = true;
                }
            }
            this.updateAttackBB(); //TODO potentially costly
            //stop when attacking

            // END ACTIONS

            this.velocity.y += this.fallAcc * TICK;

            this.handleVelocity();

            if (this.game.keys.ArrowUp) {
                // console.log('pressed');
                this.velocity.y -= 80;
            }

            this.handlePosition();

            // Fall off map = dead
            // Assuming block width is 64
            if (this.y > 64 * 16 || this.health <= 0) this.dead = true;

            if (this.currentIFrameTimer > 0) {
                this.currentIFrameTimer -= 1;
                // console.log(this.currentIFrameTimer);
            }
            // console.log(this.currentIFrameTimer);

            this.handleCollision();

            // update state
            if (
                !this.attacking &&
                this.state !== this.states.jump &&
                this.state !== this.states.fall &&
                this.state !== this.states.wallHang &&
                !this.isPogo
            ) {
                if (
                    Math.abs(this.velocity.x) > this.constants.MAX_RUN ||
                    Math.abs(this.velocity.x) === this.constants.MAX_DASH
                ) {
                    this.state = this.states.dash;
                } else if (
                    Math.abs(this.velocity.x) >= this.constants.MIN_RUN
                ) {
                    this.state = this.states.run;
                } else if (!this.attacking) {
                    this.state = this.states.idle;
                }
            }
            // Falling or jumping
            else if (
                (this.velocity.y > 0 || this.velocity.y < 0) &&
                this.state !== this.states.wallHang
            ) {
                // Set state to either Air Attack, Jump, or Fall
                this.state = this.attacking
                    ? this.isPogo
                        ? this.states.pogo
                        : this.states.attack2
                    : this.velocity.y > 0
                    ? this.states.fall
                    : this.states.jump;
                this.isInAir = true;
            } else {
                // do nothing
            }

            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;
            if (this.state == this.states.wallHang) {
            }

            this.updateBB();
        }

        // -------------- DEATH AND LOSING CONDITION ----------------
        if (
            (this.livesLeft >= 0 && this.health <= 0) ||
            this.y > BLOCK_DIMENSION * 16
        ) {
            this.dead = true;
        }

        // Player dies
        if (this.dead) {
            this.state = this.states.dead; // Plays death animation
            // Once the death animation is finished
            if (this.animations[this.state][this.facing].isDone()) {
                // If he has more live(s) remaining, he will respawn
                if (this.livesLeft > 0) {
                    this.respawn();
                }
                // Otherwise, the player loses
                else {
                    this.lose();
                }
            }
        }
        // ----------------------------------------------------------
    }

    handleVelocity() {
        // UPDATE VELOCITY
        if (this.velocity.y >= this.constants.MAX_FALL)
            this.velocity.y = this.constants.MAX_FALL;
        if (this.velocity.y <= -this.constants.MAX_FALL)
            this.velocity.y = -this.constants.MAX_FALL;

        if (this.velocity.x >= this.constants.MAX_DASH)
            this.velocity.x = this.constants.MAX_DASH;
        if (this.velocity.x <= -this.constants.MAX_DASH)
            this.velocity.x = -this.constants.MAX_DASH;
        if (this.velocity.x >= this.constants.MAX_RUN && !this.game.keys.KeyK)
            this.velocity.x = this.constants.MAX_RUN;
        if (this.velocity.x <= -this.constants.MAX_RUN && !this.game.keys.KeyK)
            this.velocity.x = -this.constants.MAX_RUN;
        if (
            this.attacking &&
            ((this.state == this.states.attack1 &&
                this.velocity.y < this.fallAcc &&
                this.velocity.y >= 0) ||
                this.state == this.states.dash)
        ) {
            this.velocity.x = 0;
        }
    }

    handlePosition() {
        // UPDATE POSITION
        // scale = 3
        // this.x += this.velocity.x * this.game.clockTick * 3;
        // this.y += this.velocity.y * this.game.clockTick * 3;
        // this.updateBB();
    }

    handleCollision() {
        // collision
        this.game.entities.forEach((entity) => {
            //check for the enemy colliding with sword
            // || entity instanceof Drill
            if (entity.BB && this.attackBB.collide(entity.BB)) {
                if (
                    entity &&
                    entity instanceof Mettaur &&
                    entity.duckTimer <= 0
                ) {
                    // console.log('Kill Mettaur');
                    //if it has die method it should die
                    entity.die();
                }
                if (entity && entity instanceof Drill) {
                    // console.log('kILL dRILL');
                    //if it has die method it should die
                    entity.health -= 5;
                }
                if (entity && entity instanceof DogBoss) {
                    // console.log('kILL dRILL');
                    //if it has die method it should die
                    if (entity.iframes <= 0 && entity.currentState != 4) {
                        entity.health -= 5;
                        entity.iframes = 0.5;
                    }
                }
                if (entity && entity instanceof Eregion) {
                    // console.log('kILL dRILL');
                    //if it has die method it should die
                    if (entity.iframes <= 0 && entity.currentState != 4) {
                        entity.health -= 5;
                        entity.iframes = 0.5;
                    }
                }
                if (entity && entity instanceof Sigma) {
                    if (entity.iframes <= 0) {
                        entity.health -= 5;
                        entity.health = Math.max(entity.health, 0);
                        entity.iframes = 0.5;
                    }
                }
                if (entity.isPog && this.isPogo) {
                    this.animations[3][0].elapsedTime = 0;
                    this.animations[3][1].elapsedTime = 0;
                    this.velocity.y = this.constants.POGO_JUMP;
                    if (this.state !== this.states.jump)
                        this.state = this.states.jump;
                    this.attacking = false;
                    this.airDashed = false;
                    this.pogoTimer = 0.6;
                    if (entity instanceof SpikeBall) {
                        entity.pogo();
                    }
                }
            }
            // Collision with player's box
            if (entity.BB && this.BB.collide(entity.BB)) {
                //Damage the player
                if (
                    entity &&
                    entity.isHostile &&
                    this.currentIFrameTimer === 0
                ) {
                    this.health -= entity.collisionDamage;
                    this.health = Math.max(this.health, 0);
                    this.currentIFrameTimer = this.maxIFrameTimer;
                    this.immobilized = true;
                    // console.log('Took ' + entity.collisionDamage + ' damage');
                    // console.log('Current HP: ' + this.health);
                }
                if (this.velocity.y > 0) {
                    // falling
                    if (
                        (entity instanceof Ground || entity instanceof Spike) && // landing
                        this.lastBB.bottom <= entity.BB.top
                    ) {
                        this.y = entity.BB.top - this.BB.height; //set to top of bounding box of ground
                        this.velocity.y = 0;
                        if (
                            this.state === this.states.jump ||
                            this.state === this.states.fall ||
                            this.state === this.states.wallHang
                        )
                            this.state = this.states.idle; // set state to idle

                        ///if we were falling play the soundEffect
                        if (this.isInAir) this.soundEffects.land.play();
                        this.isInAir = false;
                        this.airDashed = false;
                        this.isPogo = false;

                        this.updateBB();
                    }
                }
                if (this.velocity.y < 0) {
                    // jumping
                    // hit ceiling...
                    if (
                        (entity instanceof Ground || entity instanceof Spike) &&
                        this.lastBB.top >= entity.BB.bottom &&
                        this.BB.collide(entity.bottomBB)
                        // this.BB.collide(entity.bottomBB)
                    ) {
                        this.velocity.y = 0;

                        // This one goes out to all the corner spammers
                        this.game.keys.Space = false;
                        this.game.keys.KeyJ = false;
                        this.game.keys.KeyK = false;
                        if (
                            this.state === this.states.jump ||
                            this.state === this.states.wallHang
                        ) {
                            this.y = entity.bottomBB.y + entity.bottomBB.height;
                        }
                    }
                }

                // Side collisions
                if (
                    (entity instanceof Ground ||
                        entity instanceof Spike ||
                        (entity instanceof BossDoor && entity.canCollide)) &&
                    this.BB.collide(entity.leftBB)
                ) {
                    // Right side collision
                    this.x = entity.BB.left - this.BB.width;
                    this.facing = 0;
                    if (this.velocity.x > 0) this.velocity.x = 0;
                } else if (
                    (entity instanceof Ground ||
                        entity instanceof Spike ||
                        (entity instanceof BossDoor && entity.canCollide)) &&
                    this.BB.collide(entity.rightBB)
                ) {
                    // Left side collision
                    this.x = entity.BB.right;
                    this.facing = 1;
                    if (this.velocity.x < 0) this.velocity.x = 0;
                }
                // END Side collisions

                // Wall hang collision
                if (
                    (entity instanceof Ground ||
                        (entity instanceof BossDoor && entity.canCollide)) &&
                    !this.BB.collide(entity.topBB) &&
                    !this.BB.collide(entity.bottomBB)
                ) {
                    // wall hanging
                    if (this.velocity.y > 0 && !this.game.keys.Space) {
                        // falling and not holding jump
                        // Set state to wall hang
                        this.state = this.states.wallHang;
                        this.velocity.y = 1;
                        this.isInAir = false;
                        this.airDashed = false;
                    } else if (this.velocity.y > 0 && this.game.keys.Space) {
                        // falling then hit jump, bounce from wall
                        //play wall jump soundEffect
                        this.getRandomGrunt().play();
                        this.velocity.x = this.facing === 1 ? 100 : -100;
                        this.velocity.y = -this.constants.WALL_JUMP;
                        this.fallAcc = this.constants.STOP_FALL;
                        this.isInAir = true;
                        this.airDashed = false;
                        this.state = this.states.jump;
                        // Reset jump animation to the beginning
                        this.animations[3][0].elapsedTime = 0;
                        this.animations[3][1].elapsedTime = 0;
                    } else if (this.velocity.y === 0) {
                        if (this.game.keys.KeyK) {
                            // Prevent player idle at wall when dashing into wall
                            this.state = this.states.wallHang;
                            this.handleDashEnding(
                                this.constants.RUN_FALL,
                                this.constants.ACC_RUN,
                                this.game.clockTick
                            );
                        }
                    }
                    this.updateAttackBB();
                } else if (
                    entity instanceof Ground &&
                    (this.BB.collide(entity.topBB) ||
                        this.BB.collide(entity.bottomBB))
                ) {
                    if (this.game.keys.KeyK) {
                        this.velocity.y += this.fallAcc * this.game.clockTick;
                        this.game.keys.KeyK = false;
                    }
                } else if (entity instanceof Spike && this.game.keys.KeyK) {
                    // Prevent player from wall hang at spikes
                    this.velocity.y += this.fallAcc * this.game.clockTick;
                    this.game.keys.KeyK = false;
                }
            }
        });
        // END COLLISION
    }

    draw(ctx) {
        //damage blink
        if (this.currentIFrameTimer > 0) {
            ctx.filter = ` brightness(${this.flashframes})`;
        }
        this.animations[this.state][this.facing].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + this.spriteOffset.xOffset, // camera sidescrolling
            this.y - this.game.camera.y + this.spriteOffset.yOffset,
            2
        );

        if (
            this.state === this.states.attack1 ||
            this.state === this.states.attack2 ||
            this.state === this.states.attack3
        ) {
            if (this.animations[this.state][this.facing].isDone()) {
                // console.log('finished');
                this.attacking = false;
                // this.comboState = (this.comboState + 1) % 3;
                this.animations[this.state][this.facing].elapsedTime = 0;
                //TODO possibly remove this
            }
            // console.log("attackl anim");
        } else {
            //obviously not attacking
            this.attacking = false;
            // console.log("normal anim");
        }
        if (this.currentIFrameTimer >= 0) {
            ctx.filter = 'none';
        }
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

            ctx.font = '20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.fillText(
                Math.floor(this.x / BLOCK_DIMENSION) +
                    ', ' +
                    Math.floor(this.y / BLOCK_DIMENSION) +
                    ', ' +
                    this.health,
                this.x - this.game.camera.x + this.spriteOffset.xOffset + 40, // camera sidescrolling
                this.y - this.game.camera.y + this.spriteOffset.yOffset - 20
            );
        }

        // ----------- PLAYER HEALTH BAR ----------------------
        // Draws the health bar that follows the player
        // this.healthBar.drawHealthBarFollow(ctx);

        // Draws the health bar that is static at the top-left
        this.healthBar.drawPlayerHealthBar(ctx);

        // Draws the player lives
        this.healthBar.drawPlayerLives(
            ctx,
            this.game.clockTick,
            this.livesLeft
        );
        // ----------------------------------------------------
    }
    getRandomGrunt() {
        let theGrunt = this.getRandomInt(1, 5);
        switch (theGrunt) {
            case 1:
                return this.soundEffects.grunt1;
            case 2:
                return this.soundEffects.grunt1;
            case 3:
                return this.soundEffects.grunt3;
            case 4:
                return this.soundEffects.grunt4;
            default:
                return this.soundEffects.grunt1;
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // PLAYER RESPAWN
    respawn() {
        this.dead = false; // Player is alive
        // Respawns at the checkpoint and if there is no
        // checkpoint, he respawns at the spawn location
        this.x = this.checkpointX;
        this.y = this.checkpointY;
        //Update camera position
        this.game.camera.x = this.checkpointX;
        this.game.camera.y = this.checkpointY;
        this.health = this.maxHealth; // Replenish health
        this.livesLeft--; // Loses a life
    }

    // PLAYER LOSES
    lose() {
        this.game.camera.isLevel = false;
        this.game.camera.currentState = 2;
        this.game.camera.setMenuMode(this.game);
        this.removeFromWorld = true;
        // Reset death animation to the beginning
        this.animations[11][0].elapsedTime = 0;
        this.animations[11][1].elapsedTime = 0;
    }
}

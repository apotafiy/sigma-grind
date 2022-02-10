// GLOBAL VALUES FOR PLAYER
// CHANGE TO CONST ONCE FINALIZED
let MIN_RUN = 10;
let MAX_RUN = 120;
let MAX_DASH = 300;
let ACC_RUN = 500;
let DEC_REL = 600;
let DEC_SKID = 500;
let STOP_FALL = 1500;
let STOP_FALL_A = 400;
let RUN_FALL = 2025;
let RUN_FALL_A = 500;
let MAX_FALL = 270;
let STOP_JUMP = -240;
let RUN_JUMP = -300;
let WALL_JUMP = 100;
class Player {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x * 64;
        this.y = y * 64;
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
        this.isPogo = false;

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
        9 - pogo start
        10 - pogo/downward attack
        11 - pogo end
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
            pogoStart: 9,
            pogo: 10,
            pogoEnd: 11,
        };
        this.dead = false;

        //player sound imports
        this.soundEffects = {};
        this.soundEffects.attack = SOUND_MANAGER.getSound("player_attack")
        // this.soundEffects.jump_voice = new Audio(
        //     '../sounds/player/jump_voice.wav'
        // );
        this.soundEffects.jump_voice = SOUND_MANAGER.getSound("player_jump");
        this.soundEffects.run = SOUND_MANAGER.getSound("player_walk");
        this.soundEffects.dash =SOUND_MANAGER.getSound("player_dash");
        this.soundEffects.grunt1 = SOUND_MANAGER.getSound("player_grunt1");
        this.soundEffects.grunt2 = SOUND_MANAGER.getSound("player_grunt2");
        this.soundEffects.grunt3 =SOUND_MANAGER.getSound("player_grunt2");
        this.soundEffects.grunt4 = SOUND_MANAGER.getSound("player_grunt4");
        this.soundEffects.land  =SOUND_MANAGER.getSound("player_land");

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
            './sprites/player/player-fall-attack-102x80.png'
        );
        this.attackRightThree = ASSET_MANAGER.getAsset(
            './sprites/player/zero_attack_right_three_114x64-Sheet.png'
        );

        this.pogoSprite = ASSET_MANAGER.getAsset(
            './sprites/player/player-pogo-65x102.png'
        );

        this.loadAnimations();

        // Dat GUI stuff
        this.gui = new dat.GUI();
        this.playerFolder = this.gui.addFolder('Player values');
        this.testValues = {
            attackSpeed: this.attackSpeed,
            MIN_RUN: MIN_RUN,
            MAX_RUN: MAX_RUN,
            MAX_DASH: MAX_DASH,
            ACC_RUN: ACC_RUN,
            DEC_REL: DEC_REL,
            DEC_SKID: DEC_SKID,
            STOP_FALL: STOP_FALL,
            STOP_FALL_A: STOP_FALL_A,
            RUN_FALL: RUN_FALL,
            RUN_FALL_A: RUN_FALL_A,
            MAX_FALL: MAX_FALL,
            STOP_JUMP: STOP_JUMP,
            RUN_JUMP: RUN_JUMP,
            WALL_JUMP: WALL_JUMP,
        };
        this.playerFolder
            .add(this.testValues, 'attackSpeed')
            .min(0.005)
            .max(0.5)
            .step(0.005)
            .onChange((val) => {
                this.attackSpeed = val;
                this.loadAnimations();
            })
            .name('Attack Speed');
        this.playerFolder
            .add(this.testValues, 'MIN_RUN')
            .min(0)
            .max(50)
            .step(1)
            .onChange((val) => {
                MIN_RUN = val;
            })
            .name('MIN_RUN');
        this.playerFolder
            .add(this.testValues, 'MAX_RUN')
            .min(0)
            .max(300)
            .step(1)
            .onChange((val) => {
                MAX_RUN = val;
            })
            .name('MAX_RUN');
        this.playerFolder
            .add(this.testValues, 'MAX_DASH')
            .min(0)
            .max(1000)
            .step(1)
            .onChange((val) => {
                MAX_DASH = val;
            })
            .name('MAX_DASH');
        this.playerFolder
            .add(this.testValues, 'ACC_RUN')
            .min(0)
            .max(1000)
            .step(1)
            .onChange((val) => {
                ACC_RUN = val;
            })
            .name('ACC_RUN');
        this.playerFolder
            .add(this.testValues, 'DEC_REL')
            .min(0)
            .max(1000)
            .step(1)
            .onChange((val) => {
                DEC_REL = val;
            })
            .name('DEC_REL');
        this.playerFolder
            .add(this.testValues, 'DEC_SKID')
            .min(0)
            .max(1000)
            .step(1)
            .onChange((val) => {
                DEC_SKID = val;
            })
            .name('DEC_SKID');
        this.playerFolder
            .add(this.testValues, 'STOP_FALL')
            .min(0)
            .max(3000)
            .step(1)
            .onChange((val) => {
                STOP_FALL = val;
            })
            .name('STOP_FALL');
        this.playerFolder
            .add(this.testValues, 'STOP_FALL_A')
            .min(0)
            .max(1000)
            .step(1)
            .onChange((val) => {
                STOP_FALL_A = val;
            })
            .name('STOP_FALL_A');
        this.playerFolder
            .add(this.testValues, 'RUN_FALL')
            .min(0)
            .max(4000)
            .step(1)
            .onChange((val) => {
                RUN_FALL = val;
            })
            .name('RUN_FALL');
        this.playerFolder
            .add(this.testValues, 'RUN_FALL_A')
            .min(0)
            .max(1000)
            .step(1)
            .onChange((val) => {
                RUN_FALL_A = val;
            })
            .name('RUN_FALL_A');
        this.playerFolder
            .add(this.testValues, 'MAX_FALL')
            .min(0)
            .max(1000)
            .step(1)
            .onChange((val) => {
                MAX_FALL = val;
            })
            .name('MAX_FALL');
        this.playerFolder
            .add(this.testValues, 'STOP_JUMP')
            .min(-1000)
            .max(0)
            .step(1)
            .onChange((val) => {
                STOP_JUMP = val;
            })
            .name('STOP_JUMP');
        this.playerFolder
            .add(this.testValues, 'RUN_JUMP')
            .min(-1000)
            .max(0)
            .step(1)
            .onChange((val) => {
                RUN_JUMP = val;
            })
            .name('RUN_JUMP');
        this.playerFolder
            .add(this.testValues, 'WALL_JUMP')
            .min(0)
            .max(600)
            .step(1)
            .onChange((val) => {
                WALL_JUMP = val;
            })
            .name('WALL_JUMP');
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

        // Face right air attack two
        this.animations[7][0] = new Animator(
            this.attackRightTwo,
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
            this.attackRightTwo,
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

        // Pogo start - state 9
        // Face right - 0
        this.animations[9][0] = new Animator(
            this.pogoSprite,
            0,
            0,
            65,
            102,
            2,
            this.attackSpeed,
            0,
            false,
            false
        );
        // Face left - 1
        // Face right - 0
        this.animations[9][1] = new Animator(
            this.pogoSprite,
            1170,
            0,
            65,
            102,
            2,
            this.attackSpeed,
            0,
            true,
            false
        );

        // Pogo - state 10
        // Face right - 0
        this.animations[10][0] = new Animator(
            this.pogoSprite,
            130,
            0,
            65,
            102,
            2,
            this.attackSpeed,
            0,
            false,
            true
        );
        // Face left - 1
        // Face right - 0
        this.animations[10][1] = new Animator(
            this.pogoSprite,
            910,
            0,
            65,
            102,
            2,
            this.attackSpeed,
            0,
            true,
            true
        );

        // Pogo end - state 11
        // Face right - 0
        this.animations[11][0] = new Animator(
            this.pogoSprite,
            260,
            0,
            65,
            102,
            5,
            this.attackSpeed,
            0,
            false,
            false
        );
        // Face left - 1
        // Face right - 0
        this.animations[11][1] = new Animator(
            this.pogoSprite,
            585,
            0,
            65,
            102,
            5,
            this.attackSpeed,
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
        if (this.dead) {
            // Do death stuff
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
                    this.game.keys.Space &&
                    !this.game.keys.KeyK &&
                    !this.game.keys.KeyJ &&
                    !this.isInAir
                ) {
                    this.soundEffects.jump_voice.play();
                    if (Math.abs(this.velocity.x) < 16) {
                        // Jump height while idle
                        this.velocity.y = STOP_JUMP;
                        this.fallAcc = STOP_FALL;
                    } else {
                        // Jump height while there's side way momentum
                        this.velocity.y = RUN_JUMP;
                        this.fallAcc = RUN_FALL;
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
                if (this.velocity.y < 0 && this.game.keys.Space) {
                    // holding space while jumping jumps higher
                    if (this.fallAcc === STOP_FALL)
                        this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
                    if (this.fallAcc === RUN_FALL)
                        this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
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
                    this.velocity.x += ACC_RUN * TICK;
                } else if (this.game.keys.KeyA && !this.game.keys.KeyD) {
                    this.velocity.x -= ACC_RUN * TICK;
                } else {
                    // do nothing
                }
            }
            // END PHYSICS

            // ACTIONS GOES BELOW HERE

            // Dashing
            if (this.game.keys.KeyK && !this.attacking) {
                if (this.isInAir) this.airDashed = true;
                if (this.state !== this.states.wallHang) {
                    //play dash sound effect
                    this.soundEffects.dash.play();
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
            } else {
                this.animations[2][this.facing].elapsedTime = 0;
                this.fallAcc = STOP_FALL;
                //stop the dash sound if needed
                // this.soundEffects.dash.pause();
                // this.soundEffects.dash.load();
                if (this.velocity.y > 0 && this.state !== this.states.wallHang)
                    this.state = this.states.fall;
            }
            // End Dashing

            // Pogo
            if (this.game.keys.KeyS && this.game.keys.KeyJ && this.isInAir) {
                this.state = this.states.pogo;
                this.attacking = true;
                this.isPogo = true;
                // if (this.animations[9][this.facing].isDone())
                //     this.state = this.states.pogo;
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
        }

        this.velocity.y += this.fallAcc * TICK;

        // UPDATE VELOCITY
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        if (this.velocity.x >= MAX_DASH) this.velocity.x = MAX_DASH;
        if (this.velocity.x <= -MAX_DASH) this.velocity.x = -MAX_DASH;
        if (this.velocity.x >= MAX_RUN && !this.game.keys.KeyK)
            this.velocity.x = MAX_RUN;
        if (this.velocity.x <= -MAX_RUN && !this.game.keys.KeyK)
            this.velocity.x = -MAX_RUN;
        if (
            this.attacking &&
            ((this.state == this.states.attack1 &&
                this.velocity.y < this.fallAcc &&
                this.velocity.y >= 0) ||
                this.state == this.states.dash)
        ) {
            this.velocity.x = 0;
        }

        // UPDATE POSITION
        if (this.game.keys.ArrowUp) {
            console.log('pressed');
            this.velocity.y -= 80;
        }
        // scale = 3
        this.x += this.velocity.x * TICK * 3;
        this.y += this.velocity.y * TICK * 3;
        this.updateBB();

        // Fall off map = dead
        // Assuming block width is 64
        if (this.y > 64 * 16) this.die();

        // COLLISION
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
                    entity.die();
                }
                if (entity && entity instanceof DogBoss) {
                    // console.log('kILL dRILL');
                    //if it has die method it should die
                    if (entity.iframes <= 0) {
                        entity.health -= 5;
                        entity.iframes = 20;
                    }
                }
            }
            // Collision with player's box
            if (entity.BB && this.BB.collide(entity.BB)) {
                if (this.velocity.y > 0) {
                    // falling
                    if (
                        entity instanceof Ground && // landing
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
                        // entity instanceof Ground &&
                        // this.lastBB.top >= entity.BB.bottom
                        entity instanceof Ground &&
                        this.BB.collide(entity.bottomBB)
                    ) {
                        this.velocity.y = 0;
                    }
                }

                // Side collisions
                if (
                    entity instanceof Ground &&
                    entity.type &&
                    this.BB.collide(entity.leftBB)
                ) {
                    // Right side collision
                    this.x = entity.BB.left - this.BB.width;
                    this.facing = 0;
                    if (this.velocity.x > 0) this.velocity.x = 0;
                } else if (
                    entity instanceof Ground &&
                    entity.type &&
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
                    entity instanceof Ground &&
                    entity.type &&
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
                        this.velocity.x =
                            this.facing === 1 ? WALL_JUMP : -WALL_JUMP;
                        this.velocity.y = STOP_JUMP;
                        this.fallAcc = STOP_FALL;
                        this.isInAir = true;
                        this.state = this.states.jump;
                        // Reset jump animation to the beginning
                        this.animations[3][0].elapsedTime = 0;
                        this.animations[3][1].elapsedTime = 0;
                    } else if (this.velocity.y === 0) {
                        if (this.game.keys.KeyK) {
                            // Prevent player idle at wall when dashing into wall
                            this.state = this.states.wallHang;
                            this.handleDashEnding(RUN_FALL, ACC_RUN, TICK);
                        }
                    }
                } else if (
                    entity instanceof Ground &&
                    entity.type &&
                    (this.BB.collide(entity.topBB) ||
                        this.BB.collide(entity.bottomBB))
                ) {
                    if (this.game.keys.KeyK) {
                        this.velocity.y += this.fallAcc * TICK;
                        this.game.keys.KeyK = false;
                    }
                }
            }
        });
        // END COLLISION

        // update state
        if (
            !this.attacking &&
            this.state !== this.states.jump &&
            this.state !== this.states.fall &&
            this.state !== this.states.wallHang &&
            !this.isPogo
        ) {
            if (
                Math.abs(this.velocity.x) > MAX_RUN ||
                Math.abs(this.velocity.x) === MAX_DASH
            ) {
                this.state = this.states.dash;
            } else if (Math.abs(this.velocity.x) >= MIN_RUN) {
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

        // Display values for Debug mode
        if (params.debug) {
            document.getElementById('stateP').innerHTML =
                'State Player: ' + this.state;
            document.getElementById('velo').innerHTML =
                'x-velo ' +
                this.velocity.x +
                ' ' +
                'y-velo: ' +
                this.velocity.y;
        }
    }

    draw(ctx) {
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
                Math.floor(this.x / 64) + ', ' + Math.floor(this.y / 64),
                this.x - this.game.camera.x + this.spriteOffset.xOffset + 40, // camera sidescrolling
                this.y - this.game.camera.y + this.spriteOffset.yOffset - 20
            );
        }
    }
    getRandomGrunt() {
        let theGrunt = this.getRandomInt(1, 5);
        switch (theGrunt) {
            case 1:
                return this.soundEffects.grunt1;
            case 2:
                return this.soundEffects.grunt2;
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
}

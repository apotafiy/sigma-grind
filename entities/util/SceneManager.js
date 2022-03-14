class SceneManager {
    constructor(game, state) {
        this.currentState = state;
        this.isLevel = state != 0 && this.state != 1; //trigger when we are in a level
        this.hasInteracted = false;
        this.backgroundMusicVolume =
            document.getElementById('background-music');
        this.game = game;
        this.game.camera = this;
        this.animations = [null, null, null];
        this.canvasWidth = 1024;
        this.canvasHeight = 768;
        this.currentTitleCardScale = 0;
        this.enterBrightness = 0;
        this.menuIndex = 0;
        this.menuCooldown = 0;
        this.loadAnimation();
        this.soundEffects = {};
        this.soundEffects.select = SOUND_MANAGER.getSound('menu_select');
        this.soundEffects.cycle = SOUND_MANAGER.getSound('menu_cycle');
        this.soundEffects.menu_music = SOUND_MANAGER.getSound('menu_music');
        this.currentLevel = 0;
        this.totalLevels = 4; // needs to be 1 higher than actual count
        this.currentMS = 0;
        //allow the user to change the sound of all the stuff
        this.soundVolume = document.getElementById('volume');
        this.soundVolume.oninput = function () {
            SOUND_MANAGER.setAllVolume(this.value / 100);
        };
        SOUND_MANAGER.setAllVolume(this.soundVolume.value / 100);
        //only when on the menu
        if (this.currentState == 0) {
            SOUND_MANAGER.autoRepeat('menu_music');
            this.playSong(this.soundEffects.menu_music);
            this.backgroundMusicVolume.oninput = function () {
                SOUND_MANAGER.setVolume('menu_music', this.value / 100);
            };
            SOUND_MANAGER.setVolume(
                'menu_music',
                this.backgroundMusicVolume.value / 100
            );
        }

        this.msOffset = 0;

        this.xVelocity = 0;
        this.yVelocity = 0;
        this.acceleration = 2000;
        this.friction = 2;
        this.FRICTON_MULT = 10;
        this.FRICTON_Y = 2;
        this.FRICTON_X = 2;
        this.DISTANCE_MULT = 0.5;
        this.maxdist = 0;
        this.mindist = 999999;
        this.player_width = 45 / 2;
        this.shakeX = 0;
        this.shakeY = 0;
        this.interpolation = 3;
        this.background_songs = {};
        this.background_songs.intro = SOUND_MANAGER.getSound('background_1');

        SceneManagerDatGUI(game, this);
    }
    parseTime(time) {
        const times = time.split(':');
        let timeInMs = 0;
        //add minutes
        timeInMs += parseInt(times[1], 10) * 60000;
        timeInMs += parseInt(times[2], 10) * 1000;
        timeInMs += parseInt(times[3], 10);
        // console.log(times, timeInMs);
        this.currentMS += timeInMs;
    }
    setGameMode(game) {
        if (this.currentState != 0 && this.currentState != 1) {
            this.x = game.player.x - 1024 / 2;
            this.y = game.player.y - 768 / 2;

            SOUND_MANAGER.autoRepeat('background_1');
            this.playSong(this.background_songs.intro);
            this.backgroundMusicVolume.oninput = function () {
                SOUND_MANAGER.setVolume('background_1', this.value / 100);
            };
            SOUND_MANAGER.setVolume(
                'background_1',
                this.backgroundMusicVolume.value / 100
            );
            this.fullStartTime = Date.now();
            this.startTime = Math.floor(this.fullStartTime / 1000);
        }
    }
    getFormattedTime() {
        let now = Date.now() - this.msOffset;
        let timeDifference = now - this.fullStartTime;

        // If current time (in ms) ever goes negative, set it to 0
        if (timeDifference < 0) {
            this.fullStartTime = now + this.msOffset;
            this.msOffset = 0;
        }
        let m = 0;
        let s = 0;
        let ms = 0;
        //count min
        while (timeDifference >= 60000) {
            m++;
            timeDifference -= 60000;
        }
        //count second
        while (timeDifference >= 1000) {
            s++;
            timeDifference -= 1000;
        }
        //rest goes into MS
        ms = Math.floor(timeDifference / 10);
        m = this.checkTime(m);
        s = this.checkTime(s);
        ms = this.checkTime(ms);
        return `Time: ${m}:${s}:${ms}`;
    }

    parseOutTime() {
        let timeDifference = this.currentMS;

        let m = 0;
        let s = 0;
        let ms = 0;
        //count min
        while (timeDifference >= 60000) {
            m++;
            timeDifference -= 60000;
        }
        //count second
        while (timeDifference >= 1000) {
            s++;
            timeDifference -= 1000;
        }
        //rest goes into MS
        // console.log("MS Amount", timeDifference)
        ms = timeDifference;
        m = this.checkTime(m);
        s = this.checkTime(s);
        ms = this.checkTime(ms);
        return `${m}:${s}:${ms}`;
    }
    checkTime(i) {
        if (i < 10) {
            i = '0' + i;
        } // add zero in front of numbers < 10
        return i;
    }

    setMenuMode(game) {
        //we need to deload the full level and reset the properties to null
        this.x = null;
        this.y = null;
        this.startTime = null;
        gameEngine.clear_level = true;
    }
    loadAnimation() {
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/background.png'),
            0,
            0,
            1024,
            768,
            1,
            11,
            0,
            0,
            1
        );
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/press_enter.png'),
            0,
            0,
            486,
            111,
            1,
            11,
            0,
            0,
            1
        );
        this.animations[2] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/title_card.png'),
            0,
            0,
            804,
            199,
            1,
            11,
            0,
            0,
            1
        );
        this.animations[3] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/normal.png'),
            0,
            0,
            202,
            115,
            1,
            11,
            0,
            0,
            1
        );
        this.animations[4] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/hardcore.png'),
            0,
            0,
            202,
            115,
            1,
            11,
            0,
            0,
            1
        );
        this.animations[5] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/game_over.png'),
            0,
            0,
            437,
            410,
            1,
            11,
            0,
            0,
            1
        );
        this.animations[6] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/title_screen/mission_complete.png'
            ),
            0,
            0,
            503,
            321,
            1,
            11,
            0,
            0,
            1
        );

        this.animations[7] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/level_select.png'),
            0,
            0,
            300,
            71,
            1,
            11,
            0,
            0,
            1
        );

        this.animations[8] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/level_1.png'),
            0,
            0,
            300,
            71,
            1,
            11,
            0,
            0,
            1
        );

        this.animations[9] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/level_2.png'),
            0,
            0,
            300,
            71,
            1,
            11,
            0,
            0,
            1
        );

        this.animations[10] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/title_screen/level_3.png'),
            0,
            0,
            300,
            71,
            1,
            11,
            0,
            0,
            1
        );
    }
    shake(x, y) {
        this.shakeX += x;
        this.shakeY += y;
    }
    playSong(songid) {
        const autoPlayID = setInterval(() => {
            songid
                .play()
                .then(() => clearInterval(autoPlayID))
                .catch(console.error);
        }, 500);
    }
    update() {
        //we can move this all into a if blocked method late to stop it from taking up resources
        //TODO move this all into blocked off so only runs at States
        this.menuCooldown -= 1 * this.game.clockTick;
        this.enterBrightness += 1.5 * this.game.clockTick;
        if (this.enterBrightness >= 1) this.enterBrightness = 0;
        if (this.currentTitleCardScale < 1) {
            this.currentTitleCardScale += 1 * this.game.clockTick;
        }
        params.debug = document.getElementById('debug').checked;
        if (this.isLevel) {
            //set up midpoints for calculatoin
            let midpoint = 1024 / 2 - 44;
            let vertmidpoint = 768 / 2 - 44;

            // Using Lerp
            // Higher interpolation amount = less smoothing effect
            this.x = lerp(
                this.x + this.shakeX / 12, // Divide by 12 to lessen the amount of shake
                this.game.player.x - midpoint,
                this.interpolation * this.game.clockTick
            );
            this.y = lerp(
                this.y + this.shakeY / 12,
                this.game.player.y - vertmidpoint,
                this.interpolation * this.game.clockTick
            );
            //remove some of the shake for friction
            this.shakeX -=
                (this.FRICTON_MULT - this.FRICTON_X) *
                this.game.clockTick *
                (this.shakeX * 1);

            this.shakeY -=
                (this.FRICTON_MULT - this.FRICTON_Y) *
                this.game.clockTick *
                this.shakeY *
                1;
        }

        //load the main menu if that is where we are
        if (this.currentState === 0) {
            if (this.game.keys.Enter) {
                //move to second stage of the menu
                this.currentState = 1;
                this.menuIndex = 0;
                this.menuCooldown = 0.2;
                this.soundEffects.select.play();
            }
        }
        //handle the game mode selection
        if (this.currentState === 1) {
            if (this.game.keys.KeyW && this.menuCooldown <= 0) {
                //move up selection
                this.soundEffects.cycle.play();
                this.menuIndex -= 1;
                this.menuCooldown = 0.2;
                if (this.menuIndex < 0) this.menuIndex = 2;
            } else if (this.game.keys.KeyS && this.menuCooldown <= 0) {
                this.menuIndex = (this.menuIndex + 1) % 3;
                this.soundEffects.cycle.play();
                this.menuCooldown = 0.2;
            } else if (this.game.keys.Enter && this.menuCooldown <= 0) {
                //we want to start the level
                this.soundEffects.select.play();
                if (this.menuIndex != 2) {
                    this.currentState = -1;
                    this.isLevel = true;
                    if (this.menuIndex == 1) {
                        params.hardcore = true;
                    }
                    this.currentMS = 0;
                    //stop current background music and load the level
                    // this.soundEffects.menu_music.pause();
                    // loadLevelOne(this.game);
                    this.loadLevel();
                } else {
                    this.currentState = 5;
                    this.menuCooldown = 0.2;
                    this.menuIndex = 0;
                }
                // this.setGameMode(this.game);
            }
        }

        //handle Level selection
        if (this.currentState === 5) {
            if (this.game.keys.KeyW && this.menuCooldown <= 0) {
                //move up selection
                this.soundEffects.cycle.play();
                this.menuIndex -= 1;
                this.menuCooldown = 0.2;
                if (this.menuIndex < 0) this.menuIndex = 2;
                // console.log(this.menuIndex);
            } else if (this.game.keys.KeyS && this.menuCooldown <= 0) {
                this.menuIndex = (this.menuIndex + 1) % 3;
                this.soundEffects.cycle.play();
                this.menuCooldown = 0.2;
                // console.log(this.menuIndex);
            } else if (this.game.keys.Enter && this.menuCooldown <= 0) {
                //we want to start the level
                this.soundEffects.select.play();
                this.currentState = -1;
                this.isLevel = true;
                this.currentMS = 0;
                //make sure we update the correct level to be played
                if (this.menuIndex == 0) this.currentLevel = 0;
                if (this.menuIndex == 1) this.currentLevel = 1;
                if (this.menuIndex == 2) this.currentLevel = 2;
                this.loadLevel();
                // this.setGameMode(this.game);
            }
        }
        //handle game over
        if (this.currentState == 2) {
            if (this.game.keys.Enter && this.menuCooldown <= 0) {
                this.soundEffects.select.play();
                this.isLevel = false;
                this.currentState = 0;
                this.menuCooldown = 0.2;
                this.currentLevel = 0;
                this.currentMS = 0;
            }
        }

        //handle win over
        if (this.currentState == 3) {
            if (this.game.keys.Enter && this.menuCooldown <= 0) {
                this.soundEffects.select.play();
                this.isLevel = false;
                this.menuCooldown = 0.2;
                if (this.currentLevel == this.totalLevels) {
                    this.currentState = 0; // this needs to change based on what level we are in
                    this.currentLevel = 0;
                    this.soundEffects.menu_music.pause();
                } else {
                    // if (this.menuIndex == 1) {
                    //     params.hardcore = true;
                    // }
                    this.loadLevel();
                }
            }
        }
        // document.getElementById('state').innerHTML =
        //     'Entity Count: ' + this.game.entities.length;
    }

    loadLevel() {
        this.currentLevel++;
        switch (this.currentLevel) {
            case 1:
                loadLevelOne(this.game);
                // loadLevelTwo(this.game);
                // loadTestLevel(this.game);
                // sigmaArena(this.game);
                // loadPurpleMountain(this.game);
                break;
            case 2:
                loadLevelTwo(this.game);
                break;
            case 3:
                loadTestLevel(this.game);
                break;
        }
        //needs to happen each time
        this.soundEffects.select.play();
        this.currentState = -1;
        this.isLevel = true;

        //stop current background music and load the level
        this.soundEffects.menu_music.pause();
        this.setGameMode(this.game);
    }
    draw(ctx) {
        let that = this;
        if (
            params.debug &&
            !this.currentState == 0 &&
            !this.currentState == 1 &&
            !this.currentState == 4
        ) {
            ctx.strokeStyle = 'Blue';
            ctx.strokelin;
            ctx.strokeRect(
                1024 / 2 - that.player_width - 5,
                768 / 2 - 5,
                10,
                10
            );

            ctx.strokeRect(
                1024 / 2 - that.player_width,
                768 / 2,
                that.game.player.x - that.x - 1024 / 2 + 25 + 44,
                that.game.player.y - that.y - 768 / 2 + 44
            );
            ctx.stroke();
        }
        if (this.isLevel) {
            //draw in timer
            ctx.font = '25px "Zen Dots"';
            ctx.textAlign = 'left';
            ctx.fillStyle = 'White';
            ctx.strokeStyle = 'Light blue';
            ctx.lineWidth = 10;
            ctx.strokeText(
                this.getFormattedTime(),
                30, // offset on purpose
                50
            );
            ctx.fillText(this.getFormattedTime(), 30, 50);
            ctx.lineWidth = 1;
        }
        if (!this.isLevel && this.currentState == 0) {
            that.animations[0].drawFrame(that.game.clockTick, ctx, 0, 0, 1);
            ctx.filter = `brightness(${this.enterBrightness})`;
            that.animations[1].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2,
                (this.canvasHeight / 3) * 2,
                1
            );
            ctx.filter = 'none';

            that.animations[2].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth -
                    100 -
                    804 / 2 -
                    (804 / 2) * this.currentTitleCardScale,
                30,
                Math.abs(this.currentTitleCardScale)
            );
        }

        //difficulty selectors
        if (!this.isLevel && this.currentState == 1) {
            that.animations[0].drawFrame(that.game.clockTick, ctx, 0, 0, 1);
            that.animations[2].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth -
                    100 -
                    804 / 2 -
                    (804 / 2) * this.currentTitleCardScale,
                30,
                Math.abs(this.currentTitleCardScale)
            );
            if (this.menuIndex === 0)
                ctx.filter = `brightness(${this.enterBrightness})`;
            that.animations[3].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 202 / 2,
                this.canvasHeight / 2 + 80,
                1
            );
            ctx.filter = 'none';
            if (this.menuIndex === 1) {
                ctx.filter = `brightness(${this.enterBrightness})`;
            }
            that.animations[4].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 242 / 2,
                this.canvasHeight / 2 + 180,
                1.2
            );
            ctx.filter = 'none';
            if (this.menuIndex === 2) {
                ctx.filter = `brightness(${this.enterBrightness})`;
            }
            that.animations[7].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 300 / 2 - 20,
                this.canvasHeight / 2 + 310,
                1.0
            );
            ctx.filter = 'none';
        }
        //game over screen
        if (!this.isLevel && this.currentState == 2) {
            that.animations[0].drawFrame(that.game.clockTick, ctx, 0, 0, 1);
            that.animations[5].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 437 / 2,
                30,
                Math.abs(this.currentTitleCardScale)
            );
            ctx.filter = `brightness(${this.enterBrightness})`;
            that.animations[1].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 486 / 2,
                (this.canvasHeight / 3) * 2,
                1
            );
            ctx.filter = 'none';
        }

        //win screen
        if (!this.isLevel && this.currentState == 3) {
            that.animations[0].drawFrame(that.game.clockTick, ctx, 0, 0, 1);
            that.animations[6].drawFrame(
                that.game.clockTick,
                ctx,
                30,
                30,
                Math.abs(this.currentTitleCardScale)
            );
            //show player time
            //draw in timer
            ctx.font = '50px "Zen Dots"';
            ctx.textAlign = 'left';
            ctx.fillStyle = 'White';
            ctx.strokeStyle = 'Light blue';
            ctx.lineWidth = 10;
            ctx.strokeText(
                this.finalTime,
                400, // offset on purpose
                100
            );

            ctx.strokeText(
                'Total: ' + this.parseOutTime(this.currentMS),
                400, // offset on purpose
                200
            );
            ctx.fillText(this.finalTime, 400, 100);
            ctx.fillText(
                'Total: ' + this.parseOutTime(this.currentMS),
                400,
                200
            );
            ctx.lineWidth = 1;
            ctx.filter = `brightness(${this.enterBrightness})`;
            that.animations[1].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 486 / 2,
                (this.canvasHeight / 3) * 2,
                1
            );
            ctx.filter = 'none';
        }
        if (!this.isLevel && this.currentState == 5) {
            that.animations[0].drawFrame(that.game.clockTick, ctx, 0, 0, 1);
            that.animations[7].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 600 / 2,
                30,
                2
            );
            if (this.menuIndex === 0) {
                ctx.filter = `brightness(${this.enterBrightness})`;
            }
            that.animations[8].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 300 / 2 - 20,
                this.canvasHeight / 2 + 80,
                1
            );
            ctx.filter = 'none';
            if (this.menuIndex === 1) {
                ctx.filter = `brightness(${this.enterBrightness})`;
            }
            that.animations[9].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 300 / 2 - 20,
                this.canvasHeight / 2 + 180,
                1
            );
            ctx.filter = 'none';
            if (this.menuIndex === 2) {
                ctx.filter = `brightness(${this.enterBrightness})`;
            }
            that.animations[10].drawFrame(
                that.game.clockTick,
                ctx,
                this.canvasWidth / 2 - 300 / 2 - 20,
                this.canvasHeight / 2 + 280,
                1.0
            );
            ctx.filter = 'none';
        }
    }
}

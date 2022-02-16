class SceneManager {
  constructor(game, state) {
    this.currentState = state;
    this.isLevel = (state != 0 && this.state != 1); //trigger when we are in a level
    this.hasInteracted = false;
    this.backgroundMusicVolume = document.getElementById("background-music");
    this.game = game;
    this.game.camera = this;
    this.animations = [null,null,null];
    this.canvasWidth = 1024;
    this.canvasHeight = 768;
    this.currentTitleCardScale = 0;
    this.enterBrightness = 0;
    this.menuIndex = 0;
    this.menuCooldown = 0;
    this.loadAnimation();
    this.soundEffects = {};
    this.soundEffects.select = SOUND_MANAGER.getSound("menu_select");
    this.soundEffects.cycle = SOUND_MANAGER.getSound("menu_cycle");
    this.soundEffects.menu_music = SOUND_MANAGER.getSound("menu_music");
    //only when on the menu
    if(this.currentState == 0){
        SOUND_MANAGER.autoRepeat("menu_music");
        this.playSong(this.soundEffects.menu_music);
        this.backgroundMusicVolume.oninput = function () {
          SOUND_MANAGER.setVolume("menu_music", this.value / 100);
        };
        SOUND_MANAGER.setVolume(
          "menu_music",
          this.backgroundMusicVolume.value / 100
        );
    }
    //These are only needed when we are in the level
    if(this.currentState != 0 && this.currentState != 1){
        this.x = game.player.x - 1024 / 2;
        this.y = game.player.y - 768 / 2;
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
        this.interpolation = 0.06;
        this.background_songs = {};
        this.background_songs.intro = SOUND_MANAGER.getSound("background_1");
        SOUND_MANAGER.autoRepeat("background_1");
        this.playSong(this.background_songs.intro);
        this.backgroundMusicVolume.oninput = function () {
          SOUND_MANAGER.setVolume("background_1", this.value / 100);
        };
        SOUND_MANAGER.setVolume(
          "background_1",
          this.backgroundMusicVolume.value / 100
        );

          
    // Dat GUI stuff
    this.gui = new dat.GUI();
    this.cameraFolder = this.gui.addFolder("Camera values");
    this.testValues = {
      accel: this.acceleration,
      frixn: this.friction,
      frixnMult: this.FRICTON_MULT,
      frictionx: this.FRICTON_X,
      frictiony: this.FRICTON_Y,
      interpolation: this.interpolation,
    };
    this.cameraFolder
      .add(this.testValues, "accel")
      .min(0)
      .max(2000)
      .step(1)
      .onChange((val) => {
        this.acceleration = val;
      })
      .name("Acceleration");
    this.cameraFolder
      .add(this.testValues, "frixn")
      .min(0.0000001)
      .max(2)
      .step(0.00000001)
      .onChange((val) => {
        this.friction = val;
      })
      .name("Friction");
    this.cameraFolder
      .add(this.testValues, "frixnMult")
      .min(0)
      .max(10)
      .step(1)
      .onChange((val) => {
        this.FRICTON_MULT = val;
      })
      .name("FrictionMultiplier");
    this.cameraFolder
      .add(this.testValues, "frictionx")
      .min(0.000000001)
      .max(2)
      .step(0.000000001)
      .onChange((val) => {
        this.FRICTON_X = val;
      })
      .name("Friction X");
    this.cameraFolder
      .add(this.testValues, "frictiony")
      .min(0.000000001)
      .max(2)
      .step(0.000000001)
      .onChange((val) => {
        this.FRICTON_y = val;
      })
      .name("Friction Y");
    this.cameraFolder
      .add(this.testValues, "interpolation")
      .min(0)
      .max(1)
      .step(0.001)
      .onChange((val) => {
        this.interpolation = val;
      })
      .name("Interpolation");
    }
  
  }
  loadAnimation(){
    this.animations[0] = new Animator(
        ASSET_MANAGER.getAsset("./sprites/title_screen/background.png"),
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
        ASSET_MANAGER.getAsset("./sprites/title_screen/press_enter.png"),
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
        ASSET_MANAGER.getAsset("./sprites/title_screen/title_card.png"),
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
        ASSET_MANAGER.getAsset("./sprites/title_screen/normal.png"),
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
        ASSET_MANAGER.getAsset("./sprites/title_screen/hardcore.png"),
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
    this.menuCooldown -= 1* this.game.clockTick;
    this.enterBrightness += 1.5*this.game.clockTick;
    if(this.enterBrightness >= 1) this.enterBrightness = 0;
    if(this.currentTitleCardScale < 1) {
        this.currentTitleCardScale += 1 * this.game.clockTick;
    }
    params.debug = document.getElementById("debug").checked;
    if (this.isLevel) {
      //set up midpoints for calculatoin
      let midpoint = 1024 / 2 - 44;
      let vertmidpoint = 768 / 2 - 44;

      // Using Lerp
      // Higher interpolation amount = less smoothing effect
      this.x = lerp(
        this.x + this.shakeX / 12, // Divide by 12 to lessen the amount of shake
        this.game.player.x - midpoint,
        this.interpolation
      );
      this.y = lerp(
        this.y + this.shakeY / 12,
        this.game.player.y - vertmidpoint,
        this.interpolation
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
    if(this.currentState === 0 ){
        if(this.game.keys.Enter){
            //move to second stage of the menu
            this.currentState = 1;
            this.menuIndex = 0;
            this.menuCooldown = 0.2;
            this.soundEffects.select.play();
        }
    }
    //handle the game mode selection
    if(this.currentState === 1 ){
        if(this.game.keys.KeyW && this.menuCooldown <= 0){
            //move up selection
            this.soundEffects.cycle.play();
            this.menuIndex = (this.menuIndex + 1) % 2
            this.menuCooldown = 0.2;
        } else if(this.game.keys.KeyS && this.menuCooldown <= 0){
            this.menuIndex -=1;
            this.soundEffects.cycle.play();
            if(this.menuIndex < 0) this.menuIndex = 1;
            this.menuCooldown = 0.2;
        } else if(this.game.keys.Enter && this.menuCooldown <= 0){
            //we want to start the level
            this.soundEffects.select.play();
            this.currentState = 2;
            this.isLevel = true;
            if(this.menuIndex == 1){
                params.hardcore = true;
            }
            //stop current background music and load the level
            this.soundEffects.menu_music.pause();
            loadLevelOne(this.game);
            this.currentState = 2
        }
    }
  }

  draw(ctx) {
    let that = this;
    if (params.debug && !this.currentState == 0 && !this.currentState == 1) {
      ctx.strokeStyle = "Blue";
      ctx.strokelin;
      ctx.strokeRect(1024 / 2 - that.player_width - 5, 768 / 2 - 5, 10, 10);

      ctx.strokeRect(
        1024 / 2 - that.player_width,
        768 / 2,
        that.game.player.x - that.x - 1024 / 2 + 25 + 44,
        that.game.player.y - that.y - 768 / 2 + 44
      );
      ctx.stroke();
    }
    if(!this.isLevel && this.currentState == 0){
        that.animations[0].drawFrame(
            that.game.clockTick,
            ctx,
            0,
            0,
            1
        ); 
        ctx.filter = `brightness(${this.enterBrightness})`;
        that.animations[1].drawFrame(
            that.game.clockTick,
            ctx,
            this.canvasWidth/2,
            (this.canvasHeight/3) * 2,
            1
        ); 
        ctx.filter = "none";

        that.animations[2].drawFrame(
            that.game.clockTick,
            ctx,
            this.canvasWidth- 100 - 804/2 - (804/2 * this.currentTitleCardScale),
            30,
            Math.abs(this.currentTitleCardScale)
        ); 
    }

    //difficulty selectors
     if(!this.isLevel && this.currentState == 1){
        that.animations[0].drawFrame(
            that.game.clockTick,
            ctx,
            0,
            0,
            1
        ); 
        that.animations[2].drawFrame(
            that.game.clockTick,
            ctx,
            this.canvasWidth- 100 - 804/2 - (804/2 * this.currentTitleCardScale),
            30,
            Math.abs(this.currentTitleCardScale)
        ); 
        if(this.menuIndex  === 0)  ctx.filter = `brightness(${this.enterBrightness})`;
        that.animations[3].drawFrame(
            that.game.clockTick,
            ctx,
            this.canvasWidth/2 - 202/2,
            this.canvasHeight/2+100,
            1
        ); 
        ctx.filter = "none";
        if(this.menuIndex === 1) {
            ctx.filter = `brightness(${this.enterBrightness})`;
        }
        that.animations[4].drawFrame(
            that.game.clockTick,
            ctx,
            this.canvasWidth/2 - 242/2,
            this.canvasHeight/2+200,
            1.2
        ); 
        ctx.filter = "none";
    }
  }

  //find distance between two points
  /**
   *
   * @param {Camera x} x1
   * @param {Camera y} y1
   * @param {Player x} x2
   * @param {Player y} y2
   * @returns distance between the two
   */
  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    // return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}

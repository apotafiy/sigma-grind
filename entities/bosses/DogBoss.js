class DogBoss {
  /**
   * time per frame
   */
  /**
   * 0 = walking
   * 1 = laser drops attack
   * 2 = laser 8 direction
   */
  constructor(game, x, y, gravity) {
    this.scale = 3;
    this.entityArrayPos = game.entities.length;
    this.attacking = 0;
    this.game = game;
    this.currentState = 0;
    this.attackCooldown = 0;
    this.animations = [[], []];
    this.xVelocity = -2;
    this.yVelocity = 0;
    this.x = x * 64;
    this.y = y * 64;
    this.gravity = gravity;
    this.direction = 1;
    this.dirIndex = 1;
    this.iframes = 0;
    this.wallAttackDir = -1;
    if (this.xVelocity > 0) {
      this.direction = -1;
      this.dirIndex = 0;
    }
    this.flashframes = 0;
    this.maxHealth = 200;
    this.health = this.maxHealth;
    this.walkdelay = 0;
    //player sound imports
    this.soundEffects = {};
    this.soundEffects.attack = SOUND_MANAGER.getSound("dogboss_roar");
    this.soundEffects.launch_attack = SOUND_MANAGER.getSound("dogboss_launch_projectile");
    this.soundEffects.walk = SOUND_MANAGER.getSound("dogboss_walk");


    this.loadAnimation();
    //bounding box
    this.BB = new BoundingBox(
      this.x,
      this.y,
      130 * this.scale,
      96 * this.scale
    );
    this.lastBB = this.BB;

    //death handler
    this.isDead = false;
    this.deathtimer = 0;
  }
  loadAnimation() {
    //Direction, animation
    //0 = walk
    this.animations[1][0] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/dogboss/dogboss_walk_130x96.png"),
      0,
      0,
      130,
      96,
      8,
      0.12,
      0,
      0,
      1
    );

    this.animations[0][0] = new Animator(
      ASSET_MANAGER.getAsset("./sprites/dogboss/dogboss_walk_130x96.png"),
      1010,
      0,
      130,
      96,
      8,
      0.12,
      0,
      1,
      1
    );
    this.animations[0][1] = new Animator(
      ASSET_MANAGER.getAsset(
        "./sprites/dogboss/dogboss_front_facing_128x96.png"
      ),
      0,
      0,
      128,
      96,
      9,
      0.12,
      0,
      0,
      1
    );
    this.animations[1][1] = new Animator(
      ASSET_MANAGER.getAsset(
        "./sprites/dogboss/dogboss_front_facing_128x96.png"
      ),
      0,
      0,
      128,
      96,
      9,
      0.12,
      0,
      0,
      1
    );

    //use same animation for the 8 directoin attack animation
    this.animations[0][2] = new Animator(
      ASSET_MANAGER.getAsset(
        "./sprites/dogboss/dogboss_front_facing_128x96.png"
      ),
      0,
      0,
      128,
      96,
      9,
      0.12,
      0,
      0,
      1
    );
    this.animations[1][2] = new Animator(
      ASSET_MANAGER.getAsset(
        "./sprites/dogboss/dogboss_front_facing_128x96.png"
      ),
      0,
      0,
      128,
      96,
      9,
      0.12,
      0,
      0,
      1
    );
    //wall attack ( swap in better animation later on)
    //use same animation for the 8 directoin attack animation
    this.animations[0][3] = new Animator(
      ASSET_MANAGER.getAsset(
        "./sprites/dogboss/dogboss_front_facing_128x96.png"
      ),
      0,
      0,
      128,
      96,
      9,
      0.12,
      0,
      0,
      1
    );
    this.animations[1][3] = new Animator(
      ASSET_MANAGER.getAsset(
        "./sprites/dogboss/dogboss_front_facing_128x96.png"
      ),
      0,
      0,
      128,
      96,
      9,
      0.12,
      0,
      0,
      1
    );
  }
  die() {
    if (!this.isDead) {
      this.isDead = true;
      this.deathTimer = 20;
      this.xVelocity = 0;
    }
  }
  updateBB() {
    this.lastBB = this.BB;
    const yOffSet = 6; // Make sprite goes below the ground slightly not the bounding box itself
    this.BB = new BoundingBox(
      this.x,
      this.y,
      130 * this.scale,
      96 * this.scale - yOffSet
    );
  }
  update() {
    if(this.iframes >= 0){
      this.flashframes = (this.flashframes + 1) % 20;
    } else {
      this.flashframes = 0;
    }
    if (this.health <= 0) this.removeFromWorld = true;
    let that = this;
    this.attackCooldown--;
    this.iframes--; 
    //if we are just walking around
    // console.log(this.walkdelay);
    if (this.currentState == 0) {
      if(this.walkdelay <= 0 && getDistance(this,this.game.player) < 600){
        this.soundEffects.walk.play();
        this.walkdelay = 50;
      } else {
        this.walkdelay -=1;
      }
      //apply gravity to the enemy
      that.yVelocity += that.gravity;
      //move in the direction of the player
      if (Math.abs(this.x - this.game.player.x) > 30) {
        if (this.x < this.game.player.x) {
          that.direction = -1;
          that.dirIndex = 0;
        } else {
          that.direction = 1;
          that.dirIndex = 1;
        }
      }
      that.x += that.xVelocity * that.direction;
      that.y += that.yVelocity;
      //update out bounding box every frame
      that.updateBB();
      //check if we need to attack
      if (
        this.attackCooldown <= 0 &&
        Math.abs(this.x - this.game.player.x) < 200
      ) {
        this.attackCooldown = 500;
        this.attacking = 200;
        //play the attack sound
        this.soundEffects.attack.play();
        //choose random attacks to do
        this.currentState = this.getRandomInt(1, 4);
      }
    } else if (this.currentState == 1) {
      //stand and attack with side lasers
      if (this.attacking > 60 && this.attacking % 8 == 0) {
        this.soundEffects.launch_attack.play();
        //spwan the little things!
        this.game.addEntityAtIndex(
          new GroundProjectile(
            this.game,
            that.x + 40,
            that.y + 150,
            this.getRandomInt(4, 5),
            -5,
            -1,
            this.gravity
          ),
          this.entityArrayPos - 1
        );
        this.game.addEntityAtIndex(
          new GroundProjectile(
            this.game,
            that.x + 260,
            that.y + 150,
            this.getRandomInt(4, 5),
            -5,
            1,
            this.gravity
          ),
          this.entityArrayPos - 1
        );
        let shakex = this.getRandomInt(80, 120);
        let shakey = this.getRandomInt(80, 120);
        this.game.camera.shake(
          this.getRandomInt(-1, 1) * shakex,
          this.getRandomInt(-1, 1) * shakey
        );
      }
      // if (this.attacking > 0) {
      //   this.attacking--;
      // } else {
      //   this.currentState = 0;
      // }
    } else if (this.currentState == 2) {
      //up facing rain down attack
      if (this.attacking > 60 && this.attacking % 40 == 0) {
        this.soundEffects.launch_attack.play();
        for (let i = 0; i <= 6; i += 2) {
          this.game.addEntityAtIndex(
            new GroundProjectile(
              this.game,
              that.x + 130,
              that.y + 150,
              i,
              -8,
              1,
              this.gravity / 1.8
            ),
            this.entityArrayPos - 1
          );
          //make them live longer
          this.game.entities[this.entityArrayPos - 1].time = 200;
          this.game.addEntityAtIndex(
            new GroundProjectile(
              this.game,
              that.x + 130,
              that.y + 150,
              i,
              -8,
              -1,
              this.gravity / 1.8
            ),
            this.entityArrayPos - 1
          );
          //make them live longer
          this.game.entities[this.entityArrayPos - 1].time = 200;
        }
        let shakex = this.getRandomInt(80, 120);
        let shakey = this.getRandomInt(80, 120);
        this.game.camera.shake(
          this.getRandomInt(-1, 1) * shakex,
          this.getRandomInt(-1, 1) * shakey
        );
      }
    } 
    else if (this.currentState == 3) {
      //LEFT AND RIGHT WALL
      //choose the direction of the wall right at the start of phase
      if (this.attacking == 198) {
        if (this.getRandomInt(0, 2) == 1) {
          this.wallAttackDir = 1;
        } else {
          this.wallAttackDir = -1;
        }
      }
      if (this.attacking <= 100 && this.attacking % 30 == 0) {
        this.soundEffects.launch_attack.play();
        //we only want it to attack a few times with the wall
        for (let i = 0; i < 10; i++) {
          this.game.addEntityAtIndex(
            new GroundProjectile(
              this.game,
              that.x + 100,
              that.y + 150 - i * 64,
              4,
              0,
              this.wallAttackDir,
              0
            ),
            this.entityArrayPos - 1
          );
            //die on hitting a wall to avoid weird stuff
            this.game.entities[this.entityArrayPos - 1].dieOnCollide = true;
        }
      }
    }
    //decrement attacking state
    if (this.attacking > 0) {
      this.attacking--;
    } else {
      this.currentState = 0;
    }
    //collisions
    this.game.entities.forEach(function (entity) {
      if (entity.BB && that.BB.collide(entity.BB)) {
        //if falling check below
        if (that.yVelocity > 0) {
          if (entity instanceof Ground && that.lastBB.bottom <= entity.BB.top) {
            // ws above last tick
            that.y = entity.BB.top - that.BB.height; //set to top of bounding box of ground
            that.yVelocity = 0;
            that.updateBB();
          }
        } else if (that.direction == 1) {
          if (entity instanceof Ground && that.lastBB.left < entity.BB.right) {
            that.x = entity.BB.right;
            that.direction = -1;
            that.dirIndex = 0;
            that.updateBB();
          }
        } else if (that.direction == -1) {
          if (entity instanceof Ground && that.lastBB.right > entity.BB.left) {
            // is in the wall
            //subtract because origin is on left
            that.x = entity.BB.left - that.BB.width;
            that.direction = 1;
            that.dirIndex = 1;
            that.updateBB();
          }
        }
      }
    });

      // Display values for debugging
      document.getElementById('attacking').innerHTML =
      "Wall dir " + this.wallAttackDir; 
  document.getElementById('state').innerHTML = 'Entity Count: ' + this.game.entities.length;
  }

  draw(ctx) {
    let that = this;
    //damage blink
    if(this.iframes >= 0){
      ctx.filter = ` brightness(${this.flashframes})`;
    }
    that.animations[that.dirIndex][this.currentState].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x,
      that.y - that.game.camera.y, // + that.BB.height / 4,
      that.scale
    );
    if(this.iframes >= 0){
      ctx.filter = "none";
    }
    //draw health bar bove him

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(
      this.x - this.game.camera.x + 60,
      this.y - this.game.camera.y - 40,
      200,
      30
    );

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#00FF00";
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(
      this.x - this.game.camera.x + 60,
      this.y - this.game.camera.y - 40,
      (this.health / this.maxHealth) * 200,
      30
    );

    //signal wall attack
    if (this.currentState === 3) {
      //signal the attack
      ctx.font = '300px serif';
      if (this.attacking < 198 && this.attacking > 50) {
        //draw ! to that side
        // ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000"
        ctx.fillStyle = "#FF0000"
        //TODO fix x alignment
        ctx.fillText(
          "!",
          this.x - this.game.camera.x + 60 + 200 * this.wallAttackDir,
          this.y - this.game.camera.y +80 
        );
      }
    }
    if (params.debug) {
      ctx.strokeStyle = "Orange";
      ctx.strokeRect(
        that.BB.x - that.game.camera.x,
        that.BB.y - that.game.camera.y,
        that.BB.width,
        that.BB.height
      );
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}

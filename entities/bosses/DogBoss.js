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
    if (this.xVelocity > 0) {
      this.direction = -1;
      this.dirIndex = 0;
    }
    this.maxHealth = 400;
    this.health = this.maxHealth

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
    if(this.health <= 0) this.removeFromWorld = true;
    let that = this;
    this.attackCooldown--;
    this.iframes--;
    //if we are just walking around
    if (this.currentState == 0) {
      //apply gravity to the enemy
      that.yVelocity += that.gravity;
      //move in the direction of the player
     if(Math.abs(this.x - this.game.player.x) > 30){
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
        //choose random attacks to do
        this.currentState = this.getRandomInt(1,3);
      }
    } else if (this.currentState == 1) {
      //stand and attack with side la
      if (this.attacking > 60 && this.attacking % 8 == 0) {
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
          this.entityArrayPos-1
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
          this.entityArrayPos-1
        );
        let shakex = this.getRandomInt(80,120);
        let shakey = this.getRandomInt(80,120);
        this.game.camera.shake(this.getRandomInt(-1,1) * shakex,this.getRandomInt(-1,1 ) * shakey);
       
      }
      if (this.attacking > 0) {
        this.attacking--;       
      } else {
        this.currentState = 0;
      } 
      //8 direction attack! les go
    } else if(this.currentState == 2) {
        if (this.attacking > 60 && this.attacking %20 == 0) {
            // this.game.addEntityAtIndex(
            //   new GroundProjectile(
            //     this.game,
            //     that.x + 40,
            //     that.y + 150,
            //     6,
            //     0,
            //     -1,
            //     0
            //   ),
            //   this.entityArrayPos-1
            // );
            // this.game.addEntityAtIndex(
            //   new GroundProjectile(
            //     this.game,
            //     that.x + 260,
            //     that.y + 150,
            //     6,
            //     0,
            //     1,
            //     0
            //   ),
            //   this.entityArrayPos-1
            // );
            
            //up
            // this.game.addEntityAtIndex(
            //     new GroundProjectile(
            //       this.game,
            //       that.x + 40,
            //       that.y + 150,
            //       0,
            //       -4,
            //       -1,
            //       0
            //     ),
            //     this.entityArrayPos-1
            //   );
            //   this.game.addEntityAtIndex(
            //     new GroundProjectile(
            //       this.game,
            //       that.x + 260,
            //       that.y + 150,
            //       4,
            //       -4,
            //       1,
            //       0
            //     ),
            //     this.entityArrayPos-1
            //   );
               //LEFT RIGHT
            this.game.addEntityAtIndex(
                new GroundProjectile(
                  this.game,
                  that.x + 40,
                  that.y + 150,
                  4,
                  -4,
                  -1,
                  this.gravity /4
                ),
                this.entityArrayPos-1
              );
              this.game.addEntityAtIndex(
                new GroundProjectile(
                  this.game,
                  that.x + 260,
                  that.y + 150,
                  4,
                  -4,
                  1,
                  this.gravity /4 
                ),
                this.entityArrayPos-1
              );

           if(this.attacking % 80 == 0){
            //head down
            this.game.addEntityAtIndex(
                new GroundProjectile(
                  this.game,
                  that.x + 140,
                  that.y + 80,
                  0,
                  0,
                  -1,
                  this.gravity
                ),
                this.entityArrayPos-1
              );
           }
            let shakex = this.getRandomInt(80,120);
            let shakey = this.getRandomInt(80,120);
            this.game.camera.shake(this.getRandomInt(-1,1) * shakex,this.getRandomInt(-1,1 ) * shakey);
           
          }
          if (this.attacking > 0) {
            this.attacking--;       
          } else {
            this.currentState = 0;
          } 
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
  }

  draw(ctx) {
    let that = this;
    // console.log(that.currentState, that.yVelocity)
    that.animations[that.dirIndex][this.currentState].drawFrame(
      that.game.clockTick,
      ctx,
      that.x - that.game.camera.x,
      that.y - that.game.camera.y, // + that.BB.height / 4,
      that.scale
    );
      //draw health bar bove him
   
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00FF00"
      ctx.fillStyle = "#00FF00"
      ctx.strokeRect( this.x - this.game.camera.x +60,this.y - this.game.camera.y   - 40, (this.health / this.maxHealth) * 200,30);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000000"
      ctx.strokeRect( this.x - this.game.camera.x +60,this.y - this.game.camera.y   - 40, 200,30);
      // ctx.font = '20px sans-serif';
    //   ctx.textAlign = 'center';
    //   ctx.fillStyle = "black"
    //   ctx.fillText(
    //       this.health,
    //       this.x - this.game.camera.x +40, // camera sidescrolling
    //       this.y - this.game.camera.y   - 20);
  
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

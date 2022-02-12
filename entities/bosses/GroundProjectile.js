class GroundProjectile {
    /**
     * time per frame
     */
    
    constructor(game, x, y, xVel, yVel,direction, gravity, allowPogo) {
        this.scale = 2.5;
        this.time =  200;//this.getRandomInt(100,200);
        this.attacking = 0;
        this.game = game;
        this.currentState = 0;
        this.attackCooldown = 0;
        this.animations = [[], []];
        this.xVelocity = xVel;
        this.yVelocity = yVel;
        this.x = x ;
        this.y = y ;
        if(allowPogo) this.isPog = true;
        this.gravity = gravity;
        this.direction = direction;
        this.dieOnCollide = false;
        this.isHostile = true;
        this.collisionDamage = 10;

        this.loadAnimation();
        //bounding box
        this.BB = new BoundingBox(this.x, this.y, 37 * this.scale , 32 * this.scale);
        this.lastBB = this.BB;

        //death handler
        this.isDead = false;
        this.deathtimer = 0;
    }
    loadAnimation() {
        //Direction, animation
        //0 = walk
        this.animations[0][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/dogboss/dogboss_projectile_37x32.png'),
            0,
            0,
            37,
            32,
            12,
            0.08,
            0,
            0,
            1
        );

        this.animations[0][1] = new Animator(
          ASSET_MANAGER.getAsset('./sprites/dogboss/dogboss_projectile_37x32.png'),
          0,
          32,
          37,
          32,
          12,
          0.08,
          0,
          0,
          1
      );

    }
    die(){
        this.removeFromWorld = true;
    }
    updateBB() {
        this.lastBB = this.BB;
        const yOffSet = 6; // Make sprite goes below the ground slightly not the bounding box itself
        this.BB = new BoundingBox(this.x, this.y, 37 * this.scale, 32 * this.scale - yOffSet);
    }
    update() {
        let that = this;
        //vanish after 200 seconds
        this.time -= 1;
        if(this.time <= 0) this.die();
            //apply gravity to the enemy
            that.yVelocity += that.gravity;
            that.x += that.xVelocity * that.direction;
            that.y += that.yVelocity;
            //update out bounding box every frame
            that.updateBB();
            //check if we need to attack
            if(this.attackCooldown <= 0 && Math.abs(this.x - this.game.player.x) < 200){
                this.attackCooldown = 500;
                this.attacking = 200;
                this.currentState = 1;
            }
            //Collision
    //collisions
    this.game.entities.forEach(function (entity) {
        //start loop
        if (entity.BB && that.BB.collide(entity.BB)) {
          //start is colliding
          if (that.yVelocity < 0) {
            if (entity instanceof Ground && that.BB.collide(entity.bottomBB)) {
              // ws above last tick
              that.yVelocity = 0;
              that.updateBB();
            }
          }
  
          if (that.yVelocity > 0) {
            if (entity instanceof Ground && that.lastBB.bottom <= entity.BB.top) {
              // ws above last tick
              that.y = entity.BB.top - that.BB.height; //set to top of bounding box of ground
              that.yVelocity = 0;
              that.updateBB();
            }
          }
  
          if (that.direction == 1) {
            if (entity instanceof Ground && that.BB.collide(entity.rightBB)) {
              that.x = entity.BB.right + 2;
              // that.direction = -1;
              // that.dirIndex = 0;
              // that.updateBB();
            }
          }if (that.direction == -1) {
              if (
                entity instanceof Ground &&
               that.BB.collide(entity.rightBB)
              ) {
                // is in the wall
                //subtract because origin is on left
                that.x = entity.BB.left - that.BB.width;
                // that.direction = 1;
                // that.dirIndex = 1;
                // that.updateBB();
              }
            }
          //end loop
        }
      });

    }

    draw(ctx) {
        let that = this;
        if(!this.isPog){
          that.animations[0][1].drawFrame(
            that.game.clockTick,
            ctx,
            that.x - that.game.camera.x,
            that.y - that.game.camera.y,// + that.BB.height / 4,
            that.scale
        );
        } else {
        // console.log(that.currentState, that.yVelocity)
            that.animations[0][0].drawFrame(
                that.game.clockTick,
                ctx,
                that.x - that.game.camera.x,
                that.y - that.game.camera.y,// + that.BB.height / 4,
                that.scale
            );
        }
        if (params.debug) {
            ctx.strokeStyle = 'Purple';
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

class HomingBall {
    /**
     * time per frame
     */
    
    constructor(game, x, y,allowPogo) {
        this.scale = 2.5;
        this.time =  4;//this.getRandomInt(100,200);
        this.attacking = 0;
        this.game = game;
        this.currentState = 0;
        this.attackCooldown = 0;
        this.animations = [[], []];
        this.x = x * 64 ;
        this.y = y *64;
        if(allowPogo) this.isPog = true;
        this.dieOnCollide = false;
        this.isHostile = true;
        this.collisionDamage = 10;
        this.alwaysRender = true;
        this.loadAnimation();
        //bounding box
        this.BB = new BoundingBox(this.x, this.y, 37 * this.scale , 32 * this.scale);
        this.lastBB = this.BB;

        //death handler
        this.isDead = false;
        this.deathtimer = 0;

        //Set destination
        this.xGoal = this.game.player.x;
        this.yGoal = this.game.player.y;
        this.dist = (getDistance(this, this.game.player));
        this.xdif =(this.game.player.x - this.x ) / this.dist;
        this.ydif = (this.game.player.y - this.y ) / this.dist;
        //set the velocity
        this.xVelocity = (this.xdif)
        this.yVelocity = (this.ydif)
    }
    loadAnimation() {
        //Direction, animation
        //0 = walk
        this.animations[0]= new Animator(
            ASSET_MANAGER.getAsset('./sprites/eregion/yellow_ball_66x70.png'),
            0,
            0,
            66,
            70,
            8,
            0.1,
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
        this.BB = new BoundingBox(this.x, this.y, 66 * this.scale, 70 * this.scale - yOffSet);
    }
    update() {
        let that = this;
        //vanish after 200 seconds
        this.time -= 1 * this.game.clockTick;
        if(this.time <= 0) this.die();
        //apply gravity to the enemy
        that.x += that.xVelocity * 250 * this.game.clockTick;
        that.y += that.yVelocity * 250* this.game.clockTick;
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
    // that.game.entities.forEach(function (entity) {
    //     //start loop
    //     if (entity.BB && that.BB.collide(entity.BB)) {
    //         if(entity instanceof Ground) that.removeFromWorld = true;
    //       //end loop
    //     }
    //   });

    }

    draw(ctx) {
        let that = this;
          that.animations[0].drawFrame(
            that.game.clockTick,
            ctx,
            that.x - that.game.camera.x,
            that.y - that.game.camera.y,// + that.BB.height / 4,
            that.scale
        );
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

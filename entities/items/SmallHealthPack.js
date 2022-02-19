class SmallHealthPack {
    /**
     * time per frame
     */
    /**
     * 0 = walk left
     * 1 = walk right
     * 2 = jump
     * 3 = ?
     * 4 = get up
     * 5 = dead
     */
    constructor(game, x, y,) {
        this.bobTimer = 0;
        this.scale = 2;
        this.game = game;
        this.animations = [[], []];
        this.x = x * 64;
        this.y = y * 64;
        this.xOffset = 10;
        this.yOffSet = 42;
        // this.setOffset();
        this.loadAnimation();
        //bounding box
        this.BB = new BoundingBox(this.x + this.xOffset, this.y + this.yOffSet, 22 * this.scale - 10, 37 * this.scale - 15);
        this.lastBB = this.BB;
        this.soundEffects = {};
        this.soundEffects.heal = SOUND_MANAGER.getSound("heal_1");
        this.setOffset();
;

    }
    /**
     * 0 is spawn in
     * 1 is warp out
     * 2 is sitting
     */
    setOffset(){
        this.xOffset = 10;
        this.yOffSet = 30;
    }
    loadAnimation() {
        this.animations[0][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/items/health_pack_small_25x16.png'),
            0 ,
            0,
            25,
            16,
            4,
            0.1,
            0,
            0,
            1
        );


    }
    die(){
        this.soundEffects.heal.play();
        this.removeFromWorld = true;
    }
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + this.xOffset, this.y + this.yOffSet + Math.sin(this.bobTimer) * 10, 22 * this.scale , 37 * this.scale - 50);

    }
    update() {
        this.bobTimer += 10 * this.game.clockTick;
        console.log(Math.sin(this.bobTimer));
        // this.updateBB();
        let that = this;
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)){
                //if its the player give health
                if(entity instanceof Player){
                    entity.currentHitpoints = Math.min(entity.maxHitpoints, entity.currentHitpoints + 30);
                    that.die();
                }
            }
        }
        );
        this.updateBB();
    }

    draw(ctx) {
        let that = this;
        that.animations[0][0].drawFrame(
            that.game.clockTick,
            ctx,
            that.x - that.game.camera.x + that.xOffset,
            that.y - that.game.camera.y + that.yOffSet + Math.sin(this.bobTimer) * 10,
            this.scale
        );
        if (params.debug) {
            ctx.strokeStyle = 'Purple';
            ctx.strokeRect(
                that.BB.x - that.game.camera.x,
                that.BB.y - that.game.camera.y ,
                that.BB.width,
                that.BB.height
            );
        }
    }
}

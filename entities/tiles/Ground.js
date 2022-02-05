/**
 * Ground builder that allows you to work easily build large amounts of ground
 * game: game object
 * type: type of block(0,1....)
 * xstart: x coordinate start of chunk
 * ystart: y coordinate start of chunk
 * horizontal: how many blocks horizontally
 * vertical: how many blocks vertically
 * includeTop: Do you want to include the top grass layer?
 * leftEdge: do you want the top left to be an edge block?
 * rightEdge: do you want the top right to be an edge block?
 */
class Ground {
    constructor(
        game,
        type,
        xstart,
        ystart,
        horizontal,
        vertical,
        includeTop,
        leftEdge,
        rightEdge
    ) {
        this.game = game;
        this.animations = [];
        this.dontDrawGrass = [];
        for (let i = 0; i < horizontal; i++) {
            this.dontDrawGrass.push(false);
        }
        this.type = type;
        this.xstart = xstart * 64;
        this.ystart = ystart * 64;
        this.horizontal = horizontal;
        this.vertical = vertical;
        this.includeTop = includeTop || false;
        this.leftEdge = leftEdge || false;
        this.rightEdge = rightEdge || false;
        this.loadAnimation();
        //set up the bounding box
        this.BB = new BoundingBox(
            this.xstart,
            this.ystart + 5,
            64 * horizontal,
            64 * vertical
        );
        this.leftBB = new BoundingBox(
            this.xstart,
            this.ystart + 5,
            (64 * horizontal) / 2,
            64 * vertical - 15
        );
        this.rightBB = new BoundingBox(
            this.xstart + (64 * horizontal) / 2,
            this.ystart + 5,
            (64 * horizontal) / 2,
            64 * vertical - 15
        );

        // Need bottom bounding box to prevent
        // player teleportation when head hit top platform
        this.bottomBB = new BoundingBox(
            this.xstart + 10,
            this.ystart + 64 * vertical,
            64 * horizontal - 20,
            (64 * vertical) / 12 // Making it thinner
        );

        // Need this to fix player wall hanging
        // too high with his hand in the air
        // like he just dont care
        this.topBB = new BoundingBox(
            this.xstart,
            this.ystart - (64 * vertical) / 50 + 5, // Making it goes above the ground a bit
            64 * horizontal,
            (64 * vertical) / 50 // Making it thinner
        );
    }

    checkForGrass() {
        let that = this;
        //itterate through all the entities and check if they are above this bounding box and a wall
        //double check the < vs <=
        let index = 0;
        for (
            let i = that.xstart;
            i <= that.xstart + that.horizontal * 64;
            i += 64
        ) {
            this.game.entities.forEach(function (entity) {
                //if it is a ground entity that is no more than 32 pixels above it  or it is within a block
                if (
                   ( entity instanceof Ground || entity instanceof Spike) &&
                    entity.BB.bottom <= that.BB.top &&
                    (Math.abs(entity.BB.bottom - that.BB.top) <= 32 ||
                        (that.BB.top <= entity.BB.bottom &&
                            that.BB.bottom >= entity.BB.top))
                ) {
                    //here we know that we have found a ground block less than 32 above this one
                    //check to see if it is in the x space of this block
                    if (
                        entity.BB.left <= that.xstart + 64 * index &&
                        entity.BB.right > that.xstart + 64 * index
                    ) {
                        that.dontDrawGrass[index] = true;
                        // console.log("found1")
                        //no grass stop looking
                        // break;
                    }
                }
            });
            // that.drawGrass[index] = true;
            index++;
        }
        //  console.log(that.dontDrawGrass)
    }
    loadAnimation() {
        //shift over by the type of tile we want
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/ground/ground_tiles.png'),
            0 + this.type * 64,
            0,
            64,
            64,
            0,
            0,
            0,
            0,
            1
        );
        //general grass tile
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/ground/ground_tiles.png'),
            0 + this.type * 64 * 2,
            0,
            64,
            64,
            0,
            0,
            0,
            0,
            1
        );
        //left grass tile
        //shift over by the type of tile we want
        this.animations[2] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/ground/ground_tiles.png'),
            0 + this.type * 64 * 3,
            0,
            64,
            64,
            0,
            0,
            0,
            0,
            1
        );
        //right facing grass edge
        this.animations[3] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/ground/ground_tiles.png'),
            0 + this.type * 64 * 4,
            0,
            64,
            64,
            0,
            0,
            0,
            0,
            1
        );
    }
    update() {}

    // BB() {

    // }
    draw(ctx) {
        let that = this;
        // console.log(that.vertical);
        for (let i = 0; i < that.vertical; i++) {
            for (let j = 0; j < that.horizontal; j++) {
                if (i === 0 && that.includeTop && !that.dontDrawGrass[j]) {
                    if (j != 0 && j != that.horizontal - 1) {
                        that.animations[1].drawFrame(
                            that.game.clockTick,
                            ctx,
                            that.xstart + 64 * j - that.game.camera.x, //side scrolling
                            that.ystart + 64 * i - that.game.camera.y,
                            1
                        );
                    } else {
                        //draw the edge piece
                        if (j == 0) {
                            //check to see if we draw the edge or just ground
                            if (that.leftEdge) {
                                that.animations[2].drawFrame(
                                    that.game.clockTick,
                                    ctx,
                                    that.xstart + 64 * j - that.game.camera.x, //side scrolling
                                    that.ystart + 64 * i - that.game.camera.y,
                                    1
                                );
                            } else {
                                that.animations[1].drawFrame(
                                    that.game.clockTick,
                                    ctx,
                                    that.xstart + 64 * j - that.game.camera.x, //side scrolling
                                    that.ystart + 64 * i - that.game.camera.y,
                                    1
                                );
                            }
                        } else {
                            if (that.rightEdge) {
                                that.animations[3].drawFrame(
                                    that.game.clockTick,
                                    ctx,
                                    that.xstart + 64 * j - that.game.camera.x, //side scrolling
                                    that.ystart + 64 * i - that.game.camera.y,
                                    1
                                );
                            } else {
                                that.animations[1].drawFrame(
                                    that.game.clockTick,
                                    ctx,
                                    that.xstart + 64 * j - that.game.camera.x, //side scrolling
                                    that.ystart + 64 * i - that.game.camera.y,
                                    1
                                );
                            }
                        }
                    }
                } else {
                    that.animations[0].drawFrame(
                        that.game.clockTick,
                        ctx,
                        that.xstart + 64 * j - that.game.camera.x, //side scrolling
                        that.ystart + 64 * i - that.game.camera.y,
                        1
                    );
                }
            }
        }

        if (params.debug) {
            // //draw the bounding box for visual
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(
                that.BB.x - that.game.camera.x,
                that.BB.y - that.game.camera.y,
                that.BB.width,
                that.BB.height
            );
            // Draw left and right boxes
            ctx.strokeRect(
                that.leftBB.x - that.game.camera.x,
                that.leftBB.y - that.game.camera.y,
                that.leftBB.width,
                that.leftBB.height
            );
            ctx.strokeRect(
                that.rightBB.x - that.game.camera.x,
                that.rightBB.y - that.game.camera.y,
                that.rightBB.width,
                that.rightBB.height
            );
            // Draw bottom box
            ctx.strokeRect(
                that.bottomBB.x - that.game.camera.x,
                that.bottomBB.y - that.game.camera.y,
                that.bottomBB.width,
                that.bottomBB.height
            );
            // Draw top box
            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(
                that.topBB.x - that.game.camera.x,
                that.topBB.y - that.game.camera.y,
                that.topBB.width,
                that.topBB.height
            );
        }
        // ctx.stroke();
    }
}

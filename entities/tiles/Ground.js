/**
 * Ground builder that allows you to work easily build large amounts of ground
 * game: game object
 * type: type of block(0,1....)
 * xstart: x coordinate start of chunk
 * ystart: y coordinate start of chunk
 * horizontal: how many blocks horizontally
 * vertical: how many blocks vertically
 */
class Ground {
  constructor(game, type, xstart, ystart, horizontal, vertical) {
    this.game = game;
    this.animations = [];
    this.type = type;
    this.xstart = xstart;
    this.ystart = ystart;
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.loadAnimation();
    //set up the bounding box
    this.BB = new BoundingBox(
      this.xstart,
      this.ystart + 5,
      65 * horizontal,
      65 * vertical
    );
  }
  loadAnimation() {
    //shift over by the type of tile we want
    this.animations[0] = new Animator(
      ASSET_MANAGER.getAsset('./sprites/ground/ground-tile.png'),
      0 + this.type * 70,
      0,
      70,
      70,
      1,
      1
    );
  }
  update() {}

  BB() {}
  draw(ctx) {
    let that = this;
    // console.log(that.vertical);
    for (let i = 0; i < that.vertical; i++) {
      for (let j = 0; j < that.horizontal; j++) {
        that.animations[0].drawFrame(
          that.game.clockTick,
          ctx,
          that.xstart + 64 * j,
          that.ystart + 64 * i,
          1
        );
      }
    }
    //draw the bounding box for visual
    ctx.strokeStyle = 'Red';
    ctx.strokeRect(that.BB.x, that.BB.y, that.BB.width, that.BB.height);
  }
}

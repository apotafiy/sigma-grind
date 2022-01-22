class Animator {
  constructor(
    spritesheet,
    xStart,
    yStart,
    width,
    height,
    frameCount,
    frameDuration,
    framePadding,
    reverse,
    loop
  ) {
    Object.assign(this, {
      spritesheet,
      xStart,
      yStart,
      width,
      height,
      frameCount,
      frameDuration,
      framePadding,
      reverse,
      loop,
    });
    this.elapsedTime = 0;
    this.totalTime = frameCount * frameDuration;
  }
  //TODO ADD SCALE COMMENTS!
  /**
   *
   * @param {*} tick
   * @param {*} ctx
   * @param {*} x
   * @param {*} y
   * @param {*} scale  <-- THIS IS NEEDED!
   */
  drawFrame(tick, ctx, x, y, scale) {
    this.elapsedTime += tick;
    //add looping functionality
    if (this.isDone()) {
      if (this.loop) {
        this.elapsedTime -= this.totalTime;
      } else {
        //TODO This was changed to show the lat frame of the image rather than nothing and;
      }
    }
    let frame = this.currentFrame();
    if (this.reverse) frame = this.frameCount - frame - 1;
    //update to the last frame if it does not loop
    if(this.isDone()) {
      frame = this.frameCount-1;
      if (this.reverse) frame = 0;

    }
    ctx.drawImage(
      this.spritesheet,
      this.xStart + frame * (this.width + this.framePadding),
      this.yStart, //source from sheet
      this.width,
      this.height,
      x,
      y,
      this.width * scale,
      this.height * scale
    );
  }

  currentFrame() {
    return Math.floor(this.elapsedTime / this.frameDuration);
  }

  isDone() {
    return this.elapsedTime >= this.totalTime;
  }
}

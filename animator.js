class Animator {
  constructor(
    spritesheet,
    xStart,
    yStart,
    width,
    height,
    frameCount,
    frameDuration
  ) {
    Object.assign(this, {
      spritesheet,
      xStart,
      yStart,
      width,
      height,
      frameCount,
      frameDuration,
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
    if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
    const frame = this.currentFrame();

    ctx.drawImage(
      this.spritesheet,
      this.xStart + this.width * frame,
      this.yStart,
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

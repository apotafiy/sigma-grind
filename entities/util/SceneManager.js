class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;
    this.x = game.player.x - 1024 / 2;
    this.y = game.player.y - 768 / 2;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.acceleration = 1000;
    this.friction = 0.0000001;
    this.FRICTON_MULT = 1;
    this.FRICTON_Y = 0;
    this.FRICTON_X = 0.0000001;

    this.player_width = 45 / 2;

    // Dat GUI stuff
    this.gui = new dat.GUI();
    this.cameraFolder = this.gui.addFolder('Camera values');
    this.testValues = {
      xvelo: this.xVelocity,
      yvelo: this.yVelocity,
      accel: this.acceleration,
      frixn: this.friction,
      frixnMult: this.FRICTON_MULT,
      frictionx: this.FRICTON_X,
      frictiony: this.FRICTON_Y,
    };
    this.cameraFolder
      .add(this.testValues, 'xvelo')
      .min(-10)
      .max(10)
      .step(0.01)
      .onChange((val) => {
        this.xVelocity = val;
      })
      .name('X Velocity');
    this.cameraFolder
      .add(this.testValues, 'yvelo')
      .min(-10)
      .max(10)
      .step(0.01)
      .onChange((val) => {
        this.yVelocity = val;
      })
      .name('Y Velocity');
    this.cameraFolder
      .add(this.testValues, 'accel')
      .min(0)
      .max(2000)
      .step(1)
      .onChange((val) => {
        this.acceleration = val;
      })
      .name('Acceleration');
    this.cameraFolder
      .add(this.testValues, 'frixn')
      .min(0.0000001)
      .max(2)
      .step(0.00000001)
      .onChange((val) => {
        this.friction = val;
      })
      .name('Friction');
    this.cameraFolder
      .add(this.testValues, 'frixnMult')
      .min(0)
      .max(10)
      .step(1)
      .onChange((val) => {
        this.FRICTON_MULT = val;
      })
      .name('Friction Multiplier');
    this.cameraFolder
      .add(this.testValues, 'frictionx')
      .min(0.000000001)
      .max(2)
      .step(0.000000001)
      .onChange((val) => {
        this.FRICTON_X = val;
      })
      .name('Friction X');
    this.cameraFolder
      .add(this.testValues, 'frictiony')
      .min(0.000000001)
      .max(2)
      .step(0.000000001)
      .onChange((val) => {
        this.FRICTON_y = val;
      })
      .name('Friction Y');
  }

  update() {
    // Update debug value
    params.debug = document.getElementById('debug').checked;
    // console.log(this);
    //this is relying on canvas width
    let midpoint = 1024 / 2;
    let vertmidpoint = 768 / 2;
    // if(this.x < this.game.player.x - midpoint ){
    //     this.x = this.game.player.x - midpoint;
    // }
    // } else {this.x = this.game.player.x - midpoint};
    /**
     * this.x = this.game.player.x - midpoint;
     * this.y = this.game.player.y - midpoint;
     */
    let dist = this.distance(
      this.x - midpoint + this.player_width,
      this.y - vertmidpoint,
      this.game.player.x,
      this.game.player.y
    );
    let xdif =
      (this.game.player.x - this.x - midpoint + this.player_width) / dist;
    let ydif = (this.game.player.y - this.y - vertmidpoint) / dist;
    // console.log(Math.sqrt(xdif * xdif + ydif * ydif));
    //  console.log(xdif, ydif);
    //x y comp of normal vectorS
    this.xVelocity += (xdif * this.acceleration) / (dist * 0.5);
    this.yVelocity += (ydif * this.acceleration * 2) / (dist * 0.5);
    //friction
    this.xVelocity -=
      (this.FRICTON_MULT - this.FRICTON_X) *
      this.game.clockTick *
      (this.xVelocity * 1.75);
    this.yVelocity -=
      (this.FRICTON_MULT - this.FRICTON_Y) *
      this.game.clockTick *
      this.yVelocity;

    document.getElementById('xvel').innerHTML =
      ' Camera xVel ' + this.xVelocity;
    document.getElementById('yvel').innerHTML =
      'Camera yVel: ' + this.yVelocity;

    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  draw(ctx) {
    let that = this;
    ctx.strokeStyle = 'Blue';
    ctx.strokeRect(that.x, that.y, 10, 10);
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

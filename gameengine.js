// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
  constructor(options) {
    // What you will use to draw
    // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = null;

    //Offsert of when to stop drawing ground
    this.cullingOffset = 1024;
    // Everything that will be updated and drawn each frame
    this.entities = [];

    // Information on the input
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.keys = {
      // Movements
      KeyW: false,
      KeyA: false,
      KeyS: false,
      KeyD: false,
      //give height!
      ArrowUp: false,

      //Enter for selector
      Enter: false,

      // Jump
      Space: false,

      // Attack
      KeyJ: false,

      // Dash
      KeyK: false,

      // Special
      KeyL: false,

      KeyW: false,
    };

    // Options and the Details
    this.options = options || {
      debugging: false,
    };
  }

  init(ctx) {
    this.ctx = ctx;
    this.startInput();
    this.timer = new Timer();
    // FPS counter
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.id = "fpsCounter";
    this.stats.dom.style.marginLeft = "7em";
    this.gui = new dat.GUI();
    this.gui.hide();

    this.player = this.getPlayer();
  }

  start() {
    let then = Date.now();

    this.running = true;
    const gameLoop = () => {
      requestAnimFrame(gameLoop, this.ctx.canvas);

      let fpsInterval = 1000 / params.fps;
      let now = Date.now();
      let elapsed = now - then;
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        if (params.debug) {
          this.stats.begin();
          this.loop();
          this.stats.end();
        } else {
          this.loop();
        }
      }
    };
    gameLoop();
  }

  startInput() {
    const getXandY = (e) => ({
      x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
      y: e.clientY - this.ctx.canvas.getBoundingClientRect().top,
    });

    this.ctx.canvas.addEventListener("mousemove", (e) => {
      if (this.options.debugging) {
        console.log("MOUSE_MOVE", getXandY(e));
      }
      this.mouse = getXandY(e);
    });

    this.ctx.canvas.addEventListener("click", (e) => {
      if (this.options.debugging) {
        console.log("CLICK", getXandY(e));
      }
      this.click = getXandY(e);
    });

    this.ctx.canvas.addEventListener("wheel", (e) => {
      if (this.options.debugging) {
        console.log("WHEEL", getXandY(e), e.wheelDelta);
      }
      e.preventDefault(); // Prevent Scrolling
      this.wheel = e;
    });

    this.ctx.canvas.addEventListener("contextmenu", (e) => {
      if (this.options.debugging) {
        console.log("RIGHT_CLICK", getXandY(e));
      }
      e.preventDefault(); // Prevent Context Menu
      this.rightclick = getXandY(e);
    });

    this.ctx.canvas.addEventListener("keydown", (event) => {
      // Prevent Dashing continuously when holding down 'k' button
      if (event.code === "KeyK" && event.repeat) return;

      // Can only press dash once while in air
      if (
        this.camera.isLevel &&
        event.code === "KeyK" &&
        this.player.airDashed
      ) {
        this.keys[event.code] = false;
      } else {
        this.keys[event.code] = true;
      }
      //debug for level building
      //TODO REMOVE!
      if (event.code === "ArrowUp") {
        this.keys["ArrowsUp"] = true;
      } else {
        this.keys["ArrowUp"] = false;
      }

      if (event.code === "Enter") {
        this.keys["Enter"] = true;
      } else {
        this.keys["Enter"] = false;
      }

      // Prevent scrolling while using the canvas
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
          event.code
        ) > -1
      )
        event.preventDefault();
    });
    this.ctx.canvas.addEventListener(
      "keyup",
      (event) => (this.keys[event.code] = false)
    );
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  addEntityAtIndex(entity, index) {
    this.entities.splice(index, 0, entity);
  }
  /**
   * Remove everything besides the scene manager from the list
   */
  clear() {
    // Remove the player value sliders to prevent adding the same
    // sliders on respawn
    this.gui.removeFolder(this.player.playerFolder);

    let newEntities = [];
    for (const entity of this.entities) {
      if (entity instanceof SceneManager) {
        newEntities.push(entity);
      }
    }
    this.entities = newEntities;
  }
  draw() {
    // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Draw latest things first
    // for (let i = this.entities.length - 1; i >= 0; i--) {
    //   this.entities[i].draw(this.ctx, this);
    // }
    // Updated Draw Loop With Distance Draw Disabling
    for (let i = this.entities.length - 1; i >= 0; i--) {
        if (
            this.player &&
            (getDistance(this.entities[i], this.player) < 800 ||
                this.entities[i] instanceof Water ||
                this.entities[i] instanceof PurpleMountain ||
                this.entities[i] instanceof Lava ||
                this.entities[i] instanceof Spike ||
                this.entities[i] instanceof SceneManager ||
                this.entities[i].alwaysRender ||
                (this.entities[i] instanceof DogBoss &&
                    getDistance(this.entities[i], this.player) < 1200) ||
                (this.entities[i] instanceof Eregion &&
                    getDistance(this.entities[i], this.player) < 1500) ||
                (this.entities[i] instanceof Sigma &&
                    getDistance(this.entities[i], this.player) < 2000))
        ) {
            //if the player exists draw things close enough to the player
            this.entities[i].draw(this.ctx, this);
        } else if (!this.player) {
            //otherwise draw everything
            this.entities[i].draw(this.ctx, this);
        } else if (this.entities[i] instanceof Ground) {
            if (
                getDistance(this.entities[i], this.player) <
                Math.max(
                    this.entities[i].horizontal * 64,
                    this.entities[i].vertical * 64
                ) +
                    this.cullingOffset
            ) {
                this.entities[i].draw(this.ctx, this);
            }
        }
    }
  }

  update() {
    let updatedThisTic = 0;
    if (this.clear_level && this.clear_level == true) {
      //we know it is safe to clear everything Here
      this.clear();
      this.clear_level = false;
    }
    let entitiesCount = this.entities.length;
    for (let i = 0; i < entitiesCount; i++) {
      let entity = this.entities[i];
      if (!entity.removeFromWorld) {
        entity.update();
      }
    }
    for (let i = this.entities.length - 1; i >= 0; --i) {
      if (this.entities[i].removeFromWorld) {
        this.entities.splice(i, 1);
      }
    }

    if (params.debug) {
      if (!document.getElementById("fpsCounter"))
        document.body.appendChild(this.stats.dom);
      this.gui.show();
    } else if (!params.debug && document.getElementById("fpsCounter")) {
      document.getElementById("fpsCounter").remove();
    } else {
      this.gui.hide();
    }
  }

  getPlayer() {
    let player;
    const entities = this.entities;
    for (let i = 0; i < entities.length; i++) {
      if (entities[i] instanceof Player) {
        player = entities[i];
        break;
      }
    }
    return player;
  }

  loop() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
  }
}

// KV Le was here :)

// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    }

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    }

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    }

    startInput() {
        let that = this;

        // Handles movement for the player character
        let gameWindow = this.ctx.canvas;

        // Handles the key presses
        gameWindow.addEventListener(
            "keydown",
            event => {
                // console.log(event); // TODO: Remove later, for testing
                switch (event.code) {
                    case "KeyW":
                    case "ArrowUp":
                        console.log("Up: Pressed");
                        break;
                    case "KeyA":
                    case "ArrowLeft":
                        console.log("Left: Pressed");
                        break;
                    case "KeyS":
                    case "ArrowDown":
                        console.log("Down: Pressed");
                        break;
                    case "KeyD":
                    case "ArrowRight":
                        console.log("Right: Pressed");
                        break;
                }
            },
            false
        );

        // Handles the key releases
        gameWindow.addEventListener(
            "keyup",
            event => {
                // console.log(event); // TODO: Remove later, for testing
                switch (event.code) {
                    case "KeyW":
                    case "ArrowUp":
                        console.log("Up: Released");
                        break;
                    case "KeyA":
                    case "ArrowLeft":
                        console.log("Left: Released");
                        break;
                    case "KeyS":
                    case "ArrowDown":
                        console.log("Down: Released");
                        break;
                    case "KeyD":
                    case "ArrowRight":
                        console.log("Right: Released");
                        break;
                }
            },
            false
        );

        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top,
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        // TODO: Remove later
        // window.addEventListener(
        //     "keydown",
        //     event => (this.keys[event.key] = true)
        // );
        // window.addEventListener(
        //     "keyup",
        //     event => (this.keys[event.key] = false)
        // );
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    }

    update() {
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
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    }
}

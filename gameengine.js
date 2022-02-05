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
        this.keys = {
            // Movements
            KeyW: false,
            KeyA: false,
            KeyS: false,
            KeyD: false,
            //give height!
            ArrowUp:false,

            // Jump
            Space: false,

            // Attack
            KeyJ: false,

            // Dash
            KeyK: false,

            // Special
            KeyL: false,
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
        this.stats.dom.id = 'fpsCounter';
        this.stats.dom.style.marginLeft = '7em';

        this.player = this.getPlayer();
    }

    start() {
        this.running = true;
        const gameLoop = () => {
            if (params.debug) {
                this.stats.begin();
                this.loop();
                this.stats.end();
            } else {
                this.loop();
            }
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    }

    startInput() {
        const getXandY = (e) => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top,
        });

        this.ctx.canvas.addEventListener('mousemove', (e) => {
            if (this.options.debugging) {
                console.log('MOUSE_MOVE', getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener('click', (e) => {
            if (this.options.debugging) {
                console.log('CLICK', getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener('wheel', (e) => {
            if (this.options.debugging) {
                console.log('WHEEL', getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener('contextmenu', (e) => {
            if (this.options.debugging) {
                console.log('RIGHT_CLICK', getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener('keydown', (event) => {
            // Prevent Dashing continuously when holding down 'k' button
            if (event.code === 'KeyK' && event.repeat) return;

            // Can only press dash once while in air
            if (event.code === 'KeyK' && this.player.airDashed) {
                this.keys[event.code] = false;
            } else {
                this.keys[event.code] = true;
            }
                //debug for level building
                //TODO REMOVE!
            if (event.code === 'ArrowUp') {
                this.keys["ArrowsUp"] = true;
            } else {
                this.keys["ArrowUp"] = false;
            }

            // Prevent scrolling while using the canvas
            if (
                [
                    'Space',
                    'ArrowUp',
                    'ArrowDown',
                    'ArrowLeft',
                    'ArrowRight',
                ].indexOf(event.code) > -1
            )
                event.preventDefault();
        });
        this.ctx.canvas.addEventListener(
            'keyup',
            (event) => (this.keys[event.code] = false)
        );
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

        if (params.debug) {
            document.body.appendChild(this.stats.dom);
        } else if (!params.debug && document.getElementById('fpsCounter')) {
            document.getElementById('fpsCounter').remove();
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

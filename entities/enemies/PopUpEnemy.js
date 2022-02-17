class PopUpEnemy {
    /**
     *
     * @param {object} game
     * @param {num} x
     * @param {num} y
     * @param {boolean} isStable
     * @param {int} spriteVersion version 0 is horse and version 1 is electric spikes
     */
    constructor(game, x, y, isStable, spriteVersion) {
        let yOffSet;
        let xOffSet;
        this.game = game;
        this.animations = [];
        this.state = 0;

        if (spriteVersion == 0) {
            this.width = 28;
            this.height = 37;
            this.scale = 2.5;
            yOffSet = 48;
            xOffSet = 0;
            this.loadAnimationsV0();
        } else {
            this.width = 25;
            this.height = 64;
            this.scale = 1.5;
            yOffSet = 40;
            xOffSet = 10;
            this.loadAnimationsV1();
        }
        this.isStable = isStable;
        this.x = x * 64 + xOffSet;
        this.y = y * 64 + yOffSet;
        this.visionDistance = 200;

        this.isHostile = true;
        this.collisionDamage = 15;
    }

    loadAnimationsV0() {
        this.animations[0] = new Animator( // down idle
            ASSET_MANAGER.getAsset('./sprites/groundhorse.png'),
            0,
            1,
            28,
            37,
            1,
            0.5,
            0,
            false,
            false
        );
        this.animations[1] = new Animator( // jumps up
            ASSET_MANAGER.getAsset('./sprites/groundhorse.png'),
            0,
            1,
            28,
            37,
            7,
            0.1,
            0,
            false,
            false
        );
        this.animations[2] = new Animator( // up idle
            ASSET_MANAGER.getAsset('./sprites/groundhorse.png'),
            0,
            39,
            28,
            37,
            2,
            0.3,
            0,
            false,
            false
        );
        this.animations[3] = new Animator( // go back down
            ASSET_MANAGER.getAsset('./sprites/groundhorse.png'),
            0,
            77,
            28,
            37,
            5,
            0.2,
            0,
            false,
            false
        );
    }

    loadAnimationsV1() {
        this.animations[0] = new Animator( // down idle
            ASSET_MANAGER.getAsset('./sprites/sparky.png'),
            0,
            0,
            25,
            64,
            3,
            0.2,
            0,
            false,
            false
        );
        this.animations[1] = new Animator( // jumps up
            ASSET_MANAGER.getAsset('./sprites/sparky.png'),
            75,
            0,
            25,
            64,
            3,
            0.1,
            0,
            false,
            false
        );
        this.animations[2] = new Animator( // up idle
            ASSET_MANAGER.getAsset('./sprites/sparky.png'),
            150,
            0,
            25,
            64,
            6,
            0.1,
            0,
            false,
            false
        );
        this.animations[3] = new Animator( // go back down
            ASSET_MANAGER.getAsset('./sprites/sparky.png'),
            300,
            0,
            25,
            64,
            2,
            0.1,
            0,
            false,
            false
        );
    }

    update() {
        if (this.isStable) {
            this.state = 2;
        }
        let player = this.game.getPlayer();
        if (
            player &&
            (getDistance(player, this) < this.visionDistance ||
                this.state !== 0)
        ) {
            if (this.animations[this.state].isDone()) {
                this.animations[this.state].elapsedTime = 0;
                this.state = this.state + 1;
                if (this.state >= this.animations.length) {
                    this.state = 0;
                }
            }
        }

        if (this.state == 0) {
            this.BB = undefined;
        } else {
            this.BB = new BoundingBox(
                this.x,
                this.y,
                this.width * this.scale,
                this.height * this.scale
            );
        }
    }

    draw(ctx) {
        this.animations[this.state].drawFrame(
            this.game.clockTick,
            ctx,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.scale
        );
        if (params.debug) {
            ctx.strokeStyle = 'Red';
            if (this.BB) {
                ctx.strokeRect(
                    this.BB.x - this.game.camera.x,
                    this.BB.y - this.game.camera.y,
                    this.BB.width,
                    this.BB.height
                );
            }
        }
    }
}

class GroundHorse {
    constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.state = 0;
        this.animations = [];
        this.BB = new BoundingBox(this.x, this.y, 25 * 3, 35 * 3);
        this.boxHolder = this.BB;
        this.loadAnimations();
    }

    loadAnimations() {
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
            0,
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
            0,
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
            0,
            false
        );
    }

    update() {
        if (this.animations[this.state].isDone()) {
            this.animations[this.state].elapsedTime = 0;
            this.state = this.state + 1;
            if (this.state >= this.animations.length) {
                this.state = 0;
            }
        }
        if (this.state == 0) {
            this.BB = undefined;
        } else {
            this.BB = this.boxHolder;
        }
    }

    draw(ctx) {
        this.animations[this.state].drawFrame(
            this.game.clockTick,
            ctx,
            this.x + 0,
            this.y + 0,
            3
        );
        ctx.strokeStyle = 'Red';
        if (this.BB) {
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}

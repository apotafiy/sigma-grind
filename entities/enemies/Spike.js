class Spike {
    /**
     *
     * @param {object} game
     * @param {num} x
     * @param {num} y
     * @param {int} horizontal
     * @param {int} vertical
     * @param {int} orientation 0 = up, 1 = right, 2 = down, 3 = left
     */
    constructor(game, x, y, horizontal, vertical, orientation) {
        this.game = game;
        this.x = x * 64;
        this.y = y * 64;
        this.horizontal = horizontal;
        this.vertical = vertical;
        this.orientation = orientation * 320;
        this.scale = 0.2;
        this.isHostile = true;
        this.collisionDamage = 20;
        this.isPog = true;
        const offSet = 5;
        this.BB = new BoundingBox(
            this.x + offSet,
            this.y + offSet,
            64 * this.horizontal - offSet * 2,
            64 * this.vertical - offSet * 2
        );

        this.leftBB = new BoundingBox(
            this.BB.x,
            this.BB.y + offSet,
            this.BB.width / 2,
            this.BB.height - offSet * 2
        );
        this.rightBB = new BoundingBox(
            this.BB.x + this.BB.width / 2,
            this.BB.y + offSet,
            this.BB.width / 2,
            this.BB.height - offSet * 2
        );

        // Need bottom bounding box to prevent
        // player teleportation when head hit top platform
        this.bottomBB = new BoundingBox(
            this.BB.x + offSet * 2,
            this.BB.y + this.BB.height - offSet * 2,
            this.BB.width - offSet * 4,
            10 // Making it thinner
        );

        // Need this to fix player wall hanging
        // too high with his hand in the air
        // like he just dont care
        this.topBB = new BoundingBox(
            this.BB.x,
            this.BB.y - 10, // Making it goes above the ground a bit
            this.BB.width,
            10 // Making it thinner
        );

        this.animation = new Animator(
            ASSET_MANAGER.getAsset('./sprites/spike1.png'),
            0,
            0 + this.orientation,
            320,
            320,
            1,
            1,
            0,
            false,
            false
        );
    }

    update() {}

    draw(ctx) {
        for (let i = 0; i < this.vertical; i++) {
            for (let j = 0; j < this.horizontal; j++) {
                this.animation.drawFrame(
                    this.game.clockTick,
                    ctx,
                    this.x - this.game.camera.x + 64 * j,
                    this.y - this.game.camera.y + 64 * i,
                    this.scale
                );
            }
        }

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
            ctx.strokeStyle = 'Yellow';

            if (this.leftBB) {
                ctx.strokeRect(
                    this.leftBB.x - this.game.camera.x,
                    this.leftBB.y - this.game.camera.y,
                    this.leftBB.width,
                    this.leftBB.height
                );
            }

            ctx.strokeStyle = 'Blue';
            if (this.rightBB) {
                ctx.strokeRect(
                    this.rightBB.x - this.game.camera.x,
                    this.rightBB.y - this.game.camera.y,
                    this.rightBB.width,
                    this.rightBB.height
                );
            }
            ctx.strokeStyle = 'Green';
            // if (this.bottomBB) {
            //     ctx.strokeRect(
            //         this.bottomBB.x - this.game.camera.x,
            //         this.bottomBB.y - this.game.camera.y,
            //         this.bottomBB.width,
            //         this.bottomBB.height
            //     );
            // }

            ctx.strokeStyle = 'Pink';
            // if (this.topBB) {
            //     ctx.strokeRect(
            //         this.topBB.x - this.game.camera.x,
            //         this.topBB.y - this.game.camera.y,
            //         this.topBB.width,
            //         this.topBB.height
            //     );
            // }
        }
    }
}

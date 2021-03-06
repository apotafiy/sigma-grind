class PurpleMountain {
    constructor(game) {
        this.game = game;
        this.animations = [];
        this.xoffset = 0;
        this.scale = 5;
        this.loadAnimation();
    }
    loadAnimation() {
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/backgrounds/purplemountain/parallax-mountain-bg.png'
            ),
            0,
            0,
            600,
            600,
            1,
            1,
            0,
            0,
            1
        );
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/backgrounds/purplemountain/parallax-mountain-montain-far.png'
            ),
            0,
            0,
            600,
            600,
            1,
            1,
            0,
            0,
            1
        );
        this.animations[2] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/backgrounds/purplemountain/parallax-mountain-mountains.png'
            ),
            0,
            0,
            600,
            600,
            1,
            1,
            0,
            0,
            1
        );
        this.animations[3] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/backgrounds/purplemountain/parallax-mountain-trees.png'
            ),
            0,
            0,
            600,
            600,
            1,
            1,
            0,
            0,
            1
        );
        this.animations[4] = new Animator(
            ASSET_MANAGER.getAsset(
                './sprites/backgrounds/purplemountain/parallax-mountain-foreground-trees.png'
            ),
            0,
            0,
            600,
            600,
            1,
            1,
            0,
            0,
            1
        );
    }
    update() {
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Player) {
                that.xoffset = -that.game.camera.x * 0.02;
            }
        });
    }

    draw(ctx) {
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i].drawFrame(
                this.game.clockTick,
                ctx,
                -1 + this.xoffset * (Math.pow(i, 2) + 1) * 0.2,
                -1940 - this.game.camera.y,
                4
            );
        }
    }
}

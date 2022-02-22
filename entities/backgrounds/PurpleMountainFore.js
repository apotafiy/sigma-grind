class PurpleMountainFore {
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
                './sprites/backgrounds/purplemountain/parallax-mountain-foreground-trees-fore.png'
            ),
            0,
            0,
            4000,
            650,
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
                //set x offset based on where the player is located
                that.xoffset = -that.game.camera.x * 0.02;
            }
        });
    }

    draw(ctx) {
        let horizontalOffset = 1;
        let vertOffset = 0;
        let mult = 1;
        horizontalOffset = 57;
        vertOffset = 1850;
        mult = 1.8;

        this.animations[0].drawFrame(
            this.game.clockTick,
            ctx,
            -1 + this.xoffset * horizontalOffset,
            -1940 - this.game.camera.y - vertOffset,
            4 * mult
        );
    }
}

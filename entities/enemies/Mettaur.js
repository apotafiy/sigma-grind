class Mettaur {
    /**
     *  draw method params
     * start x position
     * start y position
     * sprite width
     * sprite height
     * frame count
     *
     * time per frame
     */
    /**
     * 0 = walk left
     * 1 = walk right
     * 2 = jump
     */
    constructor(game) {
        this.game = game;
        this.currentState = 0;
        this.animations = [];
        this.loadAnimation();
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),0, 0,32,36,8,0.1);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-jump.png"),0, 0,32,36,7,0.08);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-duck.png"),0, 0,32,36,6,0.5);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),0, 0,36,38,6,0.5);
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),0, 0,36,38,6,0.5);
    }
    loadAnimation() {
        this.animations[0] = new Animator(
            ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),
            0,
            0,
            32,
            36,
            8,
            0.1
        );
        this.animations[1] = new Animator(
            ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-jump.png"),
            0,
            0,
            32,
            36,
            7,
            0.08
        );
        this.animations[2] = new Animator(
            ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-duck.png"),
            0,
            0,
            32,
            36,
            6,
            0.5
        );
        this.animations[3] = new Animator(
            ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),
            0,
            0,
            36,
            38,
            6,
            0.5
        );
        this.animations[4] = new Animator(
            ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-fall.png"),
            0,
            0,
            36,
            38,
            6,
            0.5
        );
    }
    update() {
        //Temporary
        window.addEventListener(
            "keydown",
            function (event) {
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }
                //   console.log(event.key);
                switch (event.key) {
                    case "q":
                        this.currentState = 0;
                        // console.log("Q PRessed")
                        break;
                    case "w":
                        this.currentState = 1;
                        break;
                    case "e":
                        this.currentState = 2;
                        break;
                    case "w":
                        this.currentState = 3;
                        break;
                    default:
                        return; // Quit when this doesn't handle the key event.
                }

                // Cancel the default action to avoid it being handled twice
                event.preventDefault();
            },
            true
        );
    }

    draw(ctx) {
        // console.log(this.animator.currentFrame());
        console.log(this.currentState);
        this.animations[this.currentState].drawFrame(
            this.game.clockTick,
            ctx,
            0,
            0,
            3
        );
        // console.log(this.game.clockTick);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/mettaur/mettaur-walk.png"),0,0);
    }
}

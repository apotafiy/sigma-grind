class SceneManager {
    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
    }

    update() {
        //this is relying on canvas width
        let midpoint = 1024/2;
        // if(this.x < this.game.player.x - midpoint ){
        //     this.x = this.game.player.x - midpoint;
        // }
        // } else {this.x = this.game.player.x - midpoint};
        this.x = this.game.player.x - midpoint;
    }

    draw(ctx) {
        let that = this;
        ctx.strokeStyle = 'Blue';
        ctx.strokeRect(that.x, that.y, 10, 10);
    }
}
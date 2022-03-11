class TimeIndicator {
    constructor(game, x, y, milliseconds) {
        this.game = game;
        this.x = x * 64;
        this.y = y * 64;
        this.ms = milliseconds;
        this.lifespan = 1000;
        this.opacity = 1;
    }

    update() {
        if (this.lifespan <= 0) {
            const index = this.game.entities.indexOf(this);
            this.game.entities.splice(index, 1);
            return;
        }
        this.lifespan -= 1500 * this.game.clockTick;
        this.opacity = Math.max(0, this.lifespan / 1000);
    }

    draw(ctx) {
        const text = '-' + Math.floor(this.ms / 1000);
        ctx.font = '20px "Zen Dots"';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'Green';
        ctx.strokeStyle = 'Light blue';
        if (this.lifespan < 500) {
            ctx.filter = `opacity(${this.opacity})`;
        }
        ctx.lineWidth = 5;
        ctx.strokeText(
            text,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y - (1000 - this.lifespan) * 0.2
        );
        ctx.fillText(
            text,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y - (1000 - this.lifespan) * 0.2
        );
        ctx.lineWidth = 1;
        if (this.lifespan < 500) {
            ctx.filter = `opacity(1)`;
        }
    }
}

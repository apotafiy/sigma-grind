class TimeIndicator {
    constructor(game, x, y, milliseconds) {
        this.game = game;
        this.x = x * 64;
        this.y = y * 64;
        this.ms = milliseconds;
        this.lifespan = 1000;
        this.opacity = 1;
        this.fadeInflection = 200;
        this.rgb = { r: 17, g: 140, b: 79 };
    }

    update() {
        if (this.lifespan <= 0) {
            const index = this.game.entities.indexOf(this);
            this.game.entities.splice(index, 1);
            return;
        }
        this.lifespan -= 1500 * this.game.clockTick;
    }

    draw(ctx) {
        const text = '-' + Math.floor(this.ms / 1000);
        ctx.font = '20px "Zen Dots"';
        ctx.textAlign = 'left';
        const fill = ctx.fillStyle;
        const stroke = ctx.strokeStyle;
        let color = `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b}, 1)`;
        this.opacity = Math.max(0, this.lifespan / 1000);
        if (this.lifespan < this.fadeInflection) {
            color = `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b}, ${this.opacity})`;
        }
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
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
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
    }
}
//ligma balls

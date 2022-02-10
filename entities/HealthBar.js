class HealthBar {
    // Entity that has a health bar
    constructor(entity) {
        Object.assign(this, { entity });
    }

    update() {}

    // Draws a health bar that follows the entity
    drawHealthBarFollow(ctx) {
        // Health bar settings
        let healthBarWidth = this.entity.BB.width;
        let healthBarHeight = 10;
        let healthBarOffset = 20;
        ctx.lineWidth = 2;
        let healthBarCorrection = ctx.lineWidth - 1;

        // Health bar outline
        ctx.strokeStyle = 'Black';
        ctx.strokeRect(
            this.entity.BB.x - this.entity.game.camera.x - healthBarCorrection,
            this.entity.BB.y -
                this.entity.game.camera.y -
                healthBarOffset -
                healthBarCorrection,
            healthBarWidth + ctx.lineWidth,
            healthBarHeight + ctx.lineWidth
        );

        // Health bar fill
        let percentHealth =
            this.entity.currentHitpoints / this.entity.maxHitpoints;
        ctx.fillStyle =
            percentHealth < 0.33
                ? 'Red'
                : percentHealth < 0.66
                ? 'Yellow'
                : 'Green';
        ctx.fillRect(
            this.entity.BB.x - this.entity.game.camera.x,
            this.entity.BB.y - this.entity.game.camera.y - healthBarOffset,
            healthBarWidth * percentHealth,
            healthBarHeight
        );

        // Conditional if you want the hp bar to only appear when <100% hp
        // if (this.entity.hitpoints < this.entity.maxhitpoints) {

        // }
    }

    drawPlayerHealthBar(ctx) {
        let healthBarWidth = 10;
        // let healthBarHeight =
    }
}

class Score {}

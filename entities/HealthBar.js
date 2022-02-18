class HealthBar {
    // Entity that has a health bar
    constructor(entity) {
        Object.assign(this, { entity });

        this.healthBarSprite = ASSET_MANAGER.getAsset(
            './sprites/player/health-bars.png'
        );

        // Health colors
        this.green = '#18BD1A';
        this.yellow = 'Yellow';
        this.red = 'Red';

        // Player health bar
        this.playerHealthBar = new Animator(
            this.healthBarSprite,
            0,
            22,
            34,
            55,
            1,
            1,
            0,
            0,
            0
        );
        this.playerHealthBarX = 30;
        this.playerHealthBarY = 150;
        this.playerHPBarScale = 3;
        this.playerHealthX = 57;
        this.playerHealthY = 261;
        this.playerHealthWidth = 15;
        this.playerHealthHeight = -102;

        // Boss health bar
        this.bossHealthBar = new Animator(
            this.healthBarSprite,
            48,
            4,
            25,
            75,
            1,
            1,
            0,
            0,
            0
        );
        this.canvasWidth = 1024;
        this.bossHealthBarX = this.canvasWidth - 106;
        this.bossHealthBarY = 90;
        this.bossHPBarScale = 3;
        this.bossHealthX = 948;
        this.bossHealthY = 255;
        this.bossHealthWidth = 15;
        this.bossHealthHeight = -156;
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
        let percentHealth = this.entity.health / this.entity.maxHealth;
        ctx.fillStyle =
            percentHealth < 0.33
                ? this.red
                : percentHealth < 0.66
                ? this.yellow
                : this.green;
        ctx.fillRect(
            this.entity.BB.x - this.entity.game.camera.x,
            this.entity.BB.y - this.entity.game.camera.y - healthBarOffset,
            healthBarWidth * percentHealth,
            healthBarHeight
        );

        // Conditional if you want the hp bar to only appear when <100% hp
        // if (this.entity.hitpoints < this.entity.maxHealth) {

        // }
    }

    drawPlayerHealthBar(ctx) {
        // Draws the HP bar at the top left
        this.playerHealthBar.drawFrame(
            1,
            ctx,
            this.playerHealthBarX,
            this.playerHealthBarY,
            this.playerHPBarScale
        );

        // Logic for updating HP bar
        let percentHP = this.entity.health / this.entity.maxHealth;
        ctx.fillStyle =
            percentHP < 0.33
                ? this.red
                : percentHP < 0.66
                ? this.yellow
                : this.green;

        ctx.fillRect(
            this.playerHealthX,
            this.playerHealthY,
            this.playerHealthWidth,
            this.playerHealthHeight * percentHP
        );

        // Changes stroke style to black for the timer
        ctx.strokeStyle = 'Black';
    }

    drawBossHealthBar(ctx) {
        // Draws the HP bar at the top left
        this.bossHealthBar.drawFrame(
            1,
            ctx,
            this.bossHealthBarX,
            this.bossHealthBarY,
            this.bossHPBarScale
        );

        // Logic for updating HP bar
        let percentHP = this.entity.health / this.entity.maxHealth;
        ctx.fillStyle =
            percentHP < 0.33
                ? this.red
                : percentHP < 0.66
                ? this.yellow
                : this.green;

        ctx.fillRect(
            this.bossHealthX,
            this.bossHealthY,
            this.bossHealthWidth,
            this.bossHealthHeight * percentHP
        );

        // Changes stroke style to black for the timer
        ctx.strokeStyle = 'Black';
    }
}

class Score {}

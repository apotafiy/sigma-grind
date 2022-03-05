class HealthBar {
    // HEALTH BAR FOR ANY ENTITY
    constructor(entity) {
        Object.assign(this, { entity });

        this.healthBarSprite = ASSET_MANAGER.getAsset(
            './sprites/player/health-bars.png'
        );

        // HEALTH % COLORS
        this.green = '#18BD1A';
        this.yellow = 'Yellow';
        this.red = 'Red';

        // PLAYER HEALTH BAR
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

        // COORDINATES FOR PLAYER STATIC HEALTH BAR
        this.playerHealthBarX = 30;
        this.playerHealthBarY = 150;
        this.playerHPBarScale = 3;
        this.playerHealthX = 57;
        this.playerHealthY = 261;
        this.playerHealthWidth = 15;
        this.playerHealthHeight = -102;

        // COORDINATES FOR PLAYER LIVES
        this.playerLivesX = 102;
        this.playerLivesY = 279;
        this.playerLivesScale = 3;

        // BOSS HEALTH BAR
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

        // COORDINATES FOR BOSS STATIC HEALTH BAR
        this.canvasWidth = 1024;
        this.bossHealthBarX = this.canvasWidth - 106;
        this.bossHealthBarY = 90;
        this.bossHPBarScale = 3;
        this.bossHealthX = 948;
        this.bossHealthY = 255;
        this.bossHealthWidth = 15;
        this.bossHealthHeight = -156;
    }

    // DRAWS FOLLOWING HEALTH BAR
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
    }

    // DRAWS THE STATIC PLAYER HEALTH BAR
    drawPlayerHealthBar(ctx) {
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

        // Changes stroke style back to black for the timer
        ctx.strokeStyle = 'Black';
    }

    // DRAWS THE PLAYER'S LIVE(S)
    drawPlayerLives(ctx, clockTick, livesLeft) {
        let playerLives = new Animator(
            this.healthBarSprite,
            Math.max(livesLeft * 16, 0),
            89,
            16,
            7,
            1,
            1,
            0,
            0,
            0
        );
        playerLives.drawFrame(
            clockTick,
            ctx,
            this.playerLivesX,
            this.playerLivesY,
            this.playerLivesScale
        );
    }

    // DRAWS THE STATIC BOSS HEALTH BAR
    drawBossHealthBar(ctx) {
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

        // Changes stroke style back to black for the timer
        ctx.strokeStyle = 'Black';
    }
}

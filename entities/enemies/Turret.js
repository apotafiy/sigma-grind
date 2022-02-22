class Turret {
    /**
     *
     * @param {object} game
     * @param {int} x
     * @param {int} y
     * @param {int} orientation 0 = right, 1 = down, 2 = left, 3 = up
     */
    constructor(game, x, y, orientation) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }
    update() {}
    draw(ctx) {}
}

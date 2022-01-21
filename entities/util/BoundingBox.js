//bouding box that handles collision for the game
class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, {x, y, width, height});
        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    collide(other) {
        if(this.right > other.left && this.left < other.right && this.top < other.bottom && this.bottom > other.top) return true;
        return false;
    }
}
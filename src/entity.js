class Entity extends HTMLElement {
    constructor(sprite, x, y) {
        super();
        this.sprite = sprite;
        this.x = x;
        this.y = y;

        this.moveRate = 10;
        this.angle = 0;

        this.style.backgroundImage = `url('${sprite}')`;
        this.refreshPosition();
    }

    refreshPosition() {
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;
        this.style.transform = `rotate(${this.angle}rad)`;
    }

    move() { }
    primary() { }
    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }
}
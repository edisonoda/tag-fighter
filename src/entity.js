export class Entity extends HTMLElement {
    constructor(sprite, x, y) {
        super();
        this.sprite = sprite;
        this.x = x;
        this.y = y;

        this.moveRate = 250;
        this.angle = 0;
    }

    connectedCallback() {
        this.style.backgroundImage = `url('${this.sprite}')`;
        this.classList.add('entity');
        this.refreshPosition();
    }

    update(dt) {
        this.move(dt);
    }

    refreshPosition() {
        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;
        this.style.transform = `rotate(${this.angle}rad)`;
    }

    move(dt) { }
    primary() { }
    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }
}
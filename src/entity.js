export const DEFAULT_SIZE = 30; // In pixels
export const DEFAULT_HITBOX = .8;

export const DEFAULT_ACC = 30;
export const DEFAULT_FRICTION = 5;
export const DEFAULT_SPEED = 250;

export class Entity extends HTMLElement {
    static group = 'Entity';

    constructor(
        sprite,
        size = DEFAULT_SIZE,
        hitbox = DEFAULT_HITBOX,
        acc = DEFAULT_ACC,
        friction = DEFAULT_FRICTION,
        maxSpeed = DEFAULT_SPEED,
        x = 0,
        y = 0
    ) {
        super();
        this.sprite = sprite;
        this.size = size;
        this.hitbox = hitbox;
        this.x = x;
        this.y = y;

        this.acc = acc;
        this.friction = friction;
        this.maxSpeed = maxSpeed;
        this.speed = { x: 0, y: 0 };
    }

    connectedCallback() {
        this.style.backgroundImage = `url('${this.sprite}')`;
        this.style.height = `${this.size}px`;
        this.style.width = `${this.size}px`;
        this.classList.add('entity');

        this.refreshPosition();
    }

    update(dt) {
        this.move(dt);
    }

    refreshPosition() {
        if (this.x > document.body.clientWidth)
            this.x = 1;
        else if (this.x < 0)
            this.x = document.body.clientWidth - 1;

        if (this.y > document.body.clientHeight)
            this.y = 1;
        else if (this.y < 0)
            this.y = document.body.clientHeight - 1;

        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;
    }

    move(dt) {
        this.speed.x *= 1 / (1 + this.friction * dt);
        this.speed.y *= 1 / (1 + this.friction * dt);

        let currSpeed = Math.hypot(this.speed.x, this.speed.y);
        if (currSpeed > this.maxSpeed) {
            this.speed.x = (this.speed.x / currSpeed) * this.maxSpeed;
            this.speed.y = (this.speed.y / currSpeed) * this.maxSpeed;
        }

        this.x += this.speed.x;
        this.y += this.speed.y;
        
        this.refreshPosition();
    }

    collide(entity) { }
}
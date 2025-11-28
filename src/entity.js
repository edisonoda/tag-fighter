export const DEFAULT_SIZE = 30; // In pixels
export const DEFAULT_HITBOX = DEFAULT_SIZE * .8 / 2;

export const DEFAULT_ACC = 10;
export const DEFAULT_FRICTION = 3;

export class Entity extends HTMLElement {
    static category = '';
    static group = '';

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
    }

    setupSprite(sprite, size = DEFAULT_SIZE, hitbox = DEFAULT_HITBOX) {
        this.sprite = sprite;
        this.size = size;
        this.hitbox = hitbox;
    }

    setupMovement(acc = DEFAULT_ACC, friction = DEFAULT_FRICTION) {
        this.acc = acc;
        this.friction = friction;
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

        this.x += this.speed.x;
        this.y += this.speed.y;
        
        this.refreshPosition();
    }

    collide(entity) { }
}
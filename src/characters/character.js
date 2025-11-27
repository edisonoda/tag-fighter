import { Entity, DEFAULT_SIZE, DEFAULT_HITBOX, DEFAULT_ACC, DEFAULT_FRICTION, DEFAULT_SPEED } from "../entity.js";

export class Character extends Entity {
    constructor(
        sprite,
        size = DEFAULT_SIZE,
        hitbox = DEFAULT_HITBOX,
        acc = DEFAULT_ACC,
        friction = DEFAULT_FRICTION,
        maxSpeed = DEFAULT_SPEED,
        x = document.body.clientWidth / 2,
        y = document.body.clientHeight / 2
    ) {
        super(sprite, size, hitbox, acc, friction, maxSpeed, x, y);
        this.angle = 0;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    update(dt) {
        super.update(dt);
    }

    refreshPosition() {
        super.refreshPosition();
        this.style.transform = `rotate(${this.angle}rad)`;
    }
    
    collide(entity) { }
    primary() { }
    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }
}
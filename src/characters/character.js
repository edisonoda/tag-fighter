import { Entity } from "../entity.js";

export const DEFAULT_ACC = 30;
export const DEFAULT_FRICTION = 5;
export const DEFAULT_SPEED = 250;

export class Character extends Entity {
    constructor(
        sprite,
        acc = DEFAULT_ACC,
        friction = DEFAULT_FRICTION,
        maxSpeed = DEFAULT_SPEED,
        x = document.body.clientWidth / 2,
        y = document.body.clientHeight / 2
    ) {
        super(sprite, acc, friction, maxSpeed, x, y);
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
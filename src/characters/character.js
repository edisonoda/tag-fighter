import { Entity } from "../entity.js";

export const DEFAULT_ACC = 30;
export const DEFAULT_FRICTION = 5;
export const DEFAULT_SPEED = 250;

export class Character extends Entity {
    constructor(sprite, x, y, acc = DEFAULT_ACC, friction = DEFAULT_FRICTION, maxSpeed = DEFAULT_SPEED) {
        super(sprite, x, y, acc, friction, maxSpeed);
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
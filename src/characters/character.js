import { Entity } from "../entity.js";

export const DEFAULT_DAMAGED = 1;

export class Character extends Entity {
    static tag = '';

    constructor() {
        super();
        this.angle = 0;

        this.damaged = false;
        this.stunned = false;
        this.slowed = false;

        this.angleOffset = 0;
        this.damagedDuration = DEFAULT_DAMAGED;
    }

    setupPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    // connectedCallback() {
    //     super.connectedCallback();
    // }

    update(dt) {
        super.update(dt);
        this.rotate();
    }

    rotate() {
        this.angle = this.angleOffset + Math.atan2(this.speed.y, this.speed.x) + Math.PI / 2;
        this.refreshPosition();
    }

    refreshPosition() {
        super.refreshPosition();
        this.style.transform = `rotate(${this.angle}rad)`;
    }
    
    // move(dt) { }
    // collide(entity) { }
    // primary() { }
    // secondary() { }
    // reload() { }
    // dash() { }
    // leftUtil() { }
    // rightUtil() { }
    // special() { }
}
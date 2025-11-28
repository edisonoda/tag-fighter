import { Entity } from "../entity.js";

export const DEFAULT_LIFE = 5;
export const DEFAULT_MASS = 10;
export const DEFAULT_DAMAGED = 1;

export class Character extends Entity {
    static category = 'Character';
    static tag = '';

    constructor(life = DEFAULT_LIFE, mass = DEFAULT_MASS) {
        super();
        this.angle = 0;

        this.life = life;
        this.mass = mass;

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

    collide(entity) {
        if (entity.constructor.group === 'Projectile')
            return;

        let dx = entity.x - this.x;
        let dy = entity.y - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist === 0) return;

        let overlap = (this.hitbox + entity.hitbox) - dist;
        if (overlap <= 0) return;

        let nx = dx / dist;
        let ny = dy / dist;

        let push = overlap / 2;
        this.x -= nx * push;
        this.y -= ny * push;
        entity.x += nx * push;
        entity.y += ny * push;
    }

    // primary() { }
    // secondary() { }
    // reload() { }
    // dash() { }
    // leftUtil() { }
    // rightUtil() { }
    // special() { }

    pushBack(entity, force) {
        let dx = entity.x - this.x;
        let dy = entity.y - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist === 0) return;

        let nx = dx / dist;
        let ny = dy / dist;

        let overlap = (this.hitbox + entity.hitbox) - dist;
        if (overlap > 0) {
            this.x -= nx * overlap;
            this.y -= ny * overlap;
        }

        this.speed.x -= (force / this.mass) * nx;
        this.speed.y -= (force / this.mass) * ny;
    }
}
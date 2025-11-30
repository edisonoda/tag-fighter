import { Entity } from "../entity.js";
import { Game } from "../game.js";
import { Blinking } from '../effects/blinking.js';
import * as Constants from '../utils/constants.js';

export class Character extends Entity {
    static category = 'Character';
    static tag = '';

    constructor({
        sprite,
        size = Constants.SIZE,
        hitbox = Constants.HITBOX,
        acceleration = Constants.ACCELERATION,
        friction = Constants.FRICTION,
        life = Constants.LIFE,
        mass = Constants.MASS,
        blinkingDuration = Constants.FX_DURATION
    }) {
        super({ sprite, size, hitbox, acceleration, friction });
        this.angle = 0;

        this.life = life;
        this.mass = mass;

        this.damaged = false;
        this.stunned = false;
        this.slowed = false;

        this.angleOffset = 0;

        this.blinkEffect = new Blinking({ target: this, duration: blinkingDuration });
        this.effects.push(this.blinkEffect);
    }

    setupPosition(x, y) {
        this.x = x;
        this.y = y;
    }

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

    getHit(damage) {
        this.life -= damage;
        if (this.life <= 0) {
            this.die();
            return;
        }

        this.blinkEffect.activate();
    }

    die() {
        Game.removeEntity(this);
    }

    primary() { }
    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }

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
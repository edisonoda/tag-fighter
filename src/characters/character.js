import { Entity } from "../entity.js";
import { Game } from "../game.js";
import { Blinking } from '../effects/blinking.js';
import * as Constants from '../utils/constants.js';
import { Gun } from "../guns/gun.js";

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
        shootOffset = Constants.SHOOT_OFFSET,
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

        this.shootOffset = shootOffset;
        this.guns = {
            primary: { class: Gun, instance: null },
            secondary: { class: null, instance: null }
        };

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

    reload(gun) {
        Object.values(this.guns).forEach(g => {
            if (gun === g.instance)
                gun.reload();
        });
    }

    finishReload(gun) { }
    primary() { }
    secondary() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }

    changePrimary(gunClass) {
        this.guns.primary = {
            ...this.guns.primary,
            class: gunClass,
            instance: new gunClass({ owner: this })
        };
        this.changeCrosshair(gunClass.crosshair);
    }

    changeSecondary(gunClass) {
        this.guns.secondary = {
            ...this.guns.secondary,
            class: gunClass,
            instance: new gunClass({ owner: this })
        };
    }

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
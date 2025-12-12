import { Entity } from "../entity.js";
import { Stat } from "../stat.js";
import { Game } from "../game.js";
import { Gun } from "../guns/gun.js";
import { Blinking } from '../effects/blinking.js';
import * as Constants from '../utils/constants.js';

export class Character extends Entity {
    static category = 'Character';

    constructor({
        sprite,
        size = Constants.SIZE,
        hitbox = Constants.HITBOX,
        acceleration = Constants.ACCELERATION,
        friction = Constants.FRICTION,
        life = Constants.LIFE,
        mass = Constants.MASS,
        damage = Constants.ENEMY_DMG,
        gunDamage = 1,
        gunFireRate = 1,
        gunForce = 1,
        gunReloadTime = 1,
        gunAmmo = 1,
        projFriction = 1,
        projDuration = 1,
        projSize = 1,
        shootOffset = Constants.SHOOT_OFFSET,
        blinkingDuration = Constants.FX_DURATION,
        angleOffset = 0,
        x = 0, y = 0
    }) {
        super({ sprite, size, angleOffset, hitbox, acceleration, friction, x, y });

        this._life = new Stat(life);
        this._mass = new Stat(mass);
        this._damage = new Stat(damage);
        this._gunDamage = new Stat(gunDamage);
        this._gunFireRate = new Stat(gunFireRate);
        this._gunForce = new Stat(gunForce);
        this._gunReloadTime = new Stat(gunReloadTime);
        this._gunAmmo = new Stat(gunAmmo);
        this._projFriction = new Stat(projFriction);
        this._projDuration = new Stat(projDuration);
        this._projSize = new Stat(projSize);

        this.hp = this.life;

        this.damaged = false;
        this.stunned = false;
        this.slowed = false;

        this.shootOffset = shootOffset;
        this.guns = {
            one: { class: Gun, instance: null },
            two: { class: null, instance: null }
        };
        this.activeGun = 'one';

        this.blinkEffect = new Blinking({ target: this, duration: blinkingDuration });
        this.effects.push(this.blinkEffect);
    }

    get life() { return this._life.value; }
    get mass() { return this._mass.value; }
    get damage() { return this._damage.value; }
    get gunDamage() { return this._gunDamage.value; }
    get gunFireRate() { return this._gunFireRate.value; }
    get gunForce() { return this._gunForce.value; }
    get gunReloadTime() { return this._gunReloadTime.value; }
    get gunAmmo() { return this._gunAmmo.value; }
    get projFriction() { return this._projFriction.value; }
    get projDuration() { return this._projDuration.value; }
    get projSize() { return this._projSize.value; }

    update(dt) {
        super.update(dt);
        this.rotate();
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
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
            return;
        }

        this.blinkEffect.activate();
    }

    die() {
        Game.removeEntity(this);
    }

    reload(gun) { }
    finishReload(gun) { }
    primary() { }
    secondary() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }

    changeGun(gun, gunClass) {
        this.guns[gun] = {
            ...this.guns[gun],
            class: gunClass,
            instance: new gunClass({ owner: this })
        };

        if (gun == this.activeGun)
            this.changeCrosshair(gunClass.crosshair);
    }

    swapGun(gun = null) {
        if (gun)
            this.activeGun = gun;
        else
            this.activeGun = this.activeGun == 'one' ? 'two' : 'one';

        this.changeCrosshair(this.guns[this.activeGun].class.crosshair);
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
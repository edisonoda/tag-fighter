import { Entity } from "../entity.js";
import { Game } from "../game.js";
import { Stat } from "../stat.js";
import * as Constants from '../utils/constants.js';

export class Projectile extends Entity {
    static category = 'Projectile';
    static group = 'Projectile';

    constructor({
        sprite, gun, shooter, speed,
        size = Constants.PROJ_SIZE,
        hitbox = Constants.PROJ_HITBOX,
        acceleration = Constants.PROJ_ACCELERATION,
        friction = Constants.PROJ_FRICTION,
        duration = Constants.PROJ_DURATION,
        // impact = Constants.PROJ_IMPACT,
        damage = 1,
        x = 0,
        y = 0
    }) {
        super({ sprite, size, hitbox, acceleration, friction, x, y });
        
        this.gun = gun;
        this.shooter = shooter;
        this.speed.x = speed.x;
        this.speed.y = speed.y;

        this._duration = new Stat(duration);
        this._damage = new Stat(damage);
        // this.impact = impact;

        this.time = 0;
    }

    get size() { return this._size.value * this.gun?.projSize; }
    get friction() { return this._friction.value * this.gun?.projFriction; }
    get duration() { return this._duration.value * this.gun?.projDuration; }
    get damage() { return this._damage.value * this.gun?.damage; }

    update(dt) {
        super.update(dt);
        this.time += dt;

        if (this.time > this.duration)
            Game.removeEntity(this);
    }

    collide(entity) {
        return entity.constructor.group !== this.shooter.constructor.group;
    }
}
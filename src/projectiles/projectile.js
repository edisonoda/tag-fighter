import { Entity } from "../entity.js";
import { Game } from "../game.js";
import * as Constants from '../utils/constants.js';

export class Projectile extends Entity {
    static category = 'Projectile';
    static group = 'Projectile';
    static tag = '';

    constructor({
        sprite,
        size = Constants.PROJ_SIZE,
        hitbox = Constants.PROJ_HITBOX,
        acceleration = Constants.PROJ_ACC,
        friction = Constants.PROJ_FRICTION,
        time = Constants.PROJ_DURATION,
        impact = Constants.PROJ_IMPACT
    }) {
        super({ sprite, size, hitbox, acceleration, friction });

        this.shooter = null;
        this.time = time;
        this.impact = impact;
    }

    setupProjectile(shooter, speed) {
        this.shooter = shooter;
        this.speed.x = speed.x;
        this.speed.y = speed.y;
    }

    update(dt) {
        super.update(dt);
        this.time -= dt;

        if (this.time <= 0)
            Game.removeEntity(this);
    }

    collide(entity) {
        if (entity.constructor.group === this.shooter.group)
            return;
    }
}
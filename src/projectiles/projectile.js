import { Entity } from "../entity.js";
import { Game } from "../game.js";

export const DEFAULT_SIZE = 20; // In pixels
export const DEFAULT_HITBOX = .5;

export const DEFAULT_ACC = 0;
export const DEFAULT_FRICTION = 1;
export const DEFAULT_SPEED = 500;
export const DEFAULT_TIME = 3;

export class Projectile extends Entity {
    static group = 'Projectile';
    static tag = '';

    constructor(
        sprite,
        size = DEFAULT_SIZE,
        hitbox = DEFAULT_HITBOX,
        acc = DEFAULT_ACC,
        friction = DEFAULT_FRICTION,
        maxSpeed = DEFAULT_SPEED,
        time = DEFAULT_TIME
    ) {
        super(sprite, size, hitbox, acc, friction, maxSpeed);

        this.shooter = null;
        this.direction = 0;
        this.time = time;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    update(dt) {
        super.update(dt);
        this.time -= dt;

        if (this.time <= 0)
            Game.removeEntity(this);
    }

    move(dt) {
        super.move(dt);
    }

    collide(entity) {

    }
}
import { Entity } from "../entity.js";
import { Game } from "../game.js";

export const DEFAULT_SIZE = 20; // In pixels
export const DEFAULT_HITBOX = DEFAULT_SIZE * .5;

export const DEFAULT_ACC = 0;
export const DEFAULT_FRICTION = 1;
export const DEFAULT_TIME = 3;
export const DEFAULT_IMPACT = 10;

export class Projectile extends Entity {
    static category = 'Projectile';
    static group = 'Projectile';
    static tag = '';

    constructor(time = DEFAULT_TIME, impact = DEFAULT_IMPACT) {
        super();

        this.shooter = null;
        this.time = time;
        this.impact = impact;
    }
    
    setupSprite(sprite, size = DEFAULT_SIZE, hitbox = DEFAULT_HITBOX) {
        this.sprite = sprite;
        this.size = size;
        this.hitbox = hitbox;
    }

    setupMovement(acc = DEFAULT_ACC, friction = DEFAULT_FRICTION) {
        this.acc = acc;
        this.friction = friction;
        this.speed = { x: 0, y: 0 };
    }

    setupProjectile(shooter, speed, x, y) {
        this.shooter = shooter;

        this.speed.x = speed.x;
        this.speed.y = speed.y;
        this.x = x;
        this.y = y;
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
        if (entity.constructor.group === this.shooter.group)
            return;

        
    }
}
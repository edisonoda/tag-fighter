import { Game } from "../game.js";
import { Projectile } from "./projectile.js";

export class Shot extends Projectile {
    constructor({ gun, shooter, speed, x = 0, y = 0 }) {
        super({ sprite: 'assets/img/projectiles/shot.svg', gun, shooter, speed, x: x, y: y });
    }

    collide(entity) {
        if(!super.collide(entity))
            return;

        if (entity.constructor.category !== 'Character')
            return;

        entity.getHit(this.damage);
        Game.removeEntity(this);
    }
}

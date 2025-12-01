import { Game } from "../game.js";
import { Projectile } from "./projectile.js";

export class Shot extends Projectile {
    static tag = 'app-shot';

    constructor() {
        super({
            sprite: 'assets/img/projectiles/shot.svg',
        });
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

customElements.define(Shot.tag, Shot);
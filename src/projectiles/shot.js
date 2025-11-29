import { Projectile } from "./projectile.js";

export class Shot extends Projectile {
    static tag = 'app-shot';

    constructor() {
        super({
            sprite: 'assets/img/projectiles/shot.svg',
            size: 30,
            hitbox: 6
        });
    }
}

customElements.define(Shot.tag, Shot);
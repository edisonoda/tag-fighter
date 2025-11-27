import { Projectile } from "./projectile.js";

export class Shot extends Projectile {
    static tag = 'app-shot';

    constructor() {
        super('assets/img/projectiles/shot.svg');
    }
    
    connectedCallback() {
        super.connectedCallback();
    }

    update(dt) {
        super.update(dt);
    }

    move(dt) {
        super.move(dt);
    }

    collide(entity) {

    }
}

customElements.define(Shot.tag, Shot);
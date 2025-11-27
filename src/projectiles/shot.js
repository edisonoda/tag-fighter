import { Projectile } from "./projectile.js";

export class Shot extends Projectile {
    static group = 'Projectile';
    static tag = 'app-shot';

    constructor() {
        super('assets/img/projectiles/shot.svg', 30, .2);
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
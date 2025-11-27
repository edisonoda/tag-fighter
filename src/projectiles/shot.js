import { Projectile } from "./projectile.js";

export class Shot extends Projectile {
    static group = 'Projectile';
    static tag = 'app-shot';

    constructor() {
        super();
        this.setupSprite('assets/img/projectiles/shot.svg', 30, .2);
        this.setupMovement();
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
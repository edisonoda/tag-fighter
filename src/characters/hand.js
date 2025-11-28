import { Enemy } from "./enemy.js";

const DEFAULT_ANGLE = 22.5 * (Math.PI / 180);

export class Hand extends Enemy {
    static tag = 'app-hand';

    constructor() {
        super();

        this.setupSprite('assets/img/enemies/hand_closed.svg');
        this.setupMovement();
    }

    // update(dt) {
    //     super.update(dt);
    // }
    
    move(dt) {
        let dx = this.player.x - this.x;
        let dy = this.player.y - this.y;

        if (dx !== 0 || dy !== 0) {
            let direction = Math.hypot(dx, dy);
            this.speed.x += (dx / direction) * this.acc * dt;
            this.speed.y += (dy / direction) * this.acc * dt;
        }

        super.move(dt);
    }

    collide(entity) {
        super.collide(entity);
    }

    primary() { }
    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }
}

customElements.define(Hand.tag, Hand);
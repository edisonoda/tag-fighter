import { Enemy } from "./enemy.js";

// const DEFAULT_ANGLE = 22.5 * (Math.PI / 180);

export class Hand extends Enemy {
    static tag = 'app-hand';

    constructor() {
        super({ sprite: 'assets/img/enemies/hand_closed.svg' });
    }
    
    move(dt) {
        let dx = this.player.x - this.x;
        let dy = this.player.y - this.y;

        if (dx !== 0 || dy !== 0) {
            let direction = Math.hypot(dx, dy);
            this.speed.x += (dx / direction) * this.acceleration * dt;
            this.speed.y += (dy / direction) * this.acceleration * dt;
        }

        super.move(dt);
    }
}

customElements.define(Hand.tag, Hand);
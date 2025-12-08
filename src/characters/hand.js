import { Enemy } from "./enemy.js";

const ANGLE = 22.5 * (Math.PI / 180);

export class Hand extends Enemy {
    constructor({ x = 0, y = 0 }) {
        super({ sprite: 'assets/img/enemies/hand_closed.svg', x, y, angleOffset: ANGLE });
    }
    
    move(dt) {
        let dx = this.player?.x - this.x;
        let dy = this.player?.y - this.y;

        if (dx !== 0 || dy !== 0) {
            let direction = Math.hypot(dx, dy);
            this.speed.x += (dx / direction) * this.acceleration * dt;
            this.speed.y += (dy / direction) * this.acceleration * dt;
        }

        super.move(dt);
    }
}

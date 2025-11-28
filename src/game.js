import { Player } from "./characters/player.js";
// Temporary
import { Hand } from "./characters/hand.js";

export class Game {
    static main = document.getElementById('main');
    static player = document.createElement('app-player');
    static paused = false;
    static entities = [];

    static addEntity(entity, html = true) {
        if (!entity)
            return;

        this.entities.push(entity);

        if (html)
            this.main.append(entity);
    }

    static removeEntity(entity) {
        if (!entity) return;

        let index = this.entities.findIndex(e => e === entity);
        if (index !== -1) {
            this.main.removeChild(entity);
            this.entities.splice(index, 1);
        }
    }

    constructor() {
        Game.addEntity(Game.player);

        // Temporary
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * document.body.clientWidth;
            let y = Math.random() * document.body.clientHeight;

            let hand = document.createElement('app-hand');
            hand.setupPosition(x, y);

            Game.addEntity(hand);
        }

        // const hand = document.createElement('app-hand');
        // Game.entities.push(hand);
        // Game.main.append(hand);

        this.lastTime = performance.now();
        requestAnimationFrame(t => this.loop(t));
    }

    loop(timestamp) {
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        if (!Game.paused)
            this.update(dt);
        
        requestAnimationFrame(t => this.loop(t));
    }

    update(dt) {
        Game.entities.forEach(e => e.update(dt));

        for (let i = 0; i < Game.entities.length - 1; i++) {
            let e1 = Game.entities[i];

            for (let j = i + 1; j < Game.entities.length; j++) {
                let e2 = Game.entities[j];

                const dx = e1.x + e1.hitbox - (e2.x + e2.hitbox);
                const dy = e1.y + e1.hitbox - (e2.y + e2.hitbox);
                const distance = Math.hypot(dx, dy);
                
                if (distance < e1.hitbox + e2.hitbox) {
                    e1.collide(e2);
                    e2.collide(e1);
                }
            }
        }
    }
}

let game = null;
document.addEventListener("DOMContentLoaded", (ev) => {
    game = new Game();
});
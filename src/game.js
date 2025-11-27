import { Player } from "./characters/player.js";
// Temporary
import { Hand } from "./characters/hand.js";

export class Game {
    static main = document.getElementById('main');
    static player = document.createElement('app-player');
    static paused = false;
    static entities = [];

    static addEntity(entity) {
        if (entity)
            this.entities.push(entity);
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
        Game.entities.push(Game.player);
        Game.main.append(Game.player);

        // Temporary
        const hand = document.createElement('app-hand');
        Game.entities.push(hand);
        Game.main.append(hand);

        // for (let i = 0; i < 10; i++) {

        // }

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
    }
}

let game = null;
document.addEventListener("DOMContentLoaded", (ev) => {
    game = new Game();
});
import { Player } from "./player.js";

export class Game {
    static main = document.getElementById('main');
    static paused = false;

    constructor() {
        this.entities = [];

        this.player = document.createElement('app-player');
        this.entities.push(this.player);
        main.append(this.player);

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
        this.entities.forEach(e => e.update(dt));
    }
}

var game;
if (!game) game = new Game();
import { Player } from "./characters/player.js";
import { EventManager } from "./events/event_manager.js";
import * as Events from "./events/events.js";
// Temporary
import { Hand } from "./characters/hand.js";

export class Game {
    static canvas;
    static context;
    static player;
    static paused = false;
    static entities = [];

    static addEntity(entity) {
        if (!entity)
            return;

        this.entities.push(entity);
    }

    static removeEntity(entity) {
        if (!entity) return;

        let index = this.entities.findIndex(e => e === entity);
        if (index !== -1)
            this.entities.splice(index, 1);
    }

    constructor() {
        Game.canvas = document.getElementById('game');
        Game.context = Game.canvas.getContext("2d");
        Game.canvas.width  = Game.canvas.clientWidth;
        Game.canvas.height = Game.canvas.clientHeight;

        Game.player = new Player();
        Game.addEntity(Game.player);

        this.eventManager = EventManager.getInstance();

        // Temporary
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * Game.canvas.width;
            let y = Math.random() * Game.canvas.height;

            let hand = new Hand({ x, y });
            Game.addEntity(hand);
        }

        this.lastTime = performance.now();
        requestAnimationFrame(t => this.loop(t));
    }

    loop(timestamp) {
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        if (!Game.paused) {
            this.update(dt);
            this.render();
        }
        
        requestAnimationFrame(t => this.loop(t));
    }

    update(dt) {
        Game.entities.forEach(e => e.update(dt));
        this.handleCollisions();

        this.eventManager.notify(Events.UPDATED);
    }

    render() {
        Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.entities.forEach(e => e.draw(Game.context));
    }

    handleCollisions() {
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
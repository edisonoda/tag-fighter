import { Game } from "./game.js";
import * as Constants from './utils/constants.js';

export class Entity extends HTMLElement {
    static category = '';
    static group = '';
    static tag = '';

    static instantiate(x = 0, y = 0) {
        let obj = document.createElement(this.tag);
        obj.x = x;
        obj.y = y;

        Game.addEntity(obj);
        return obj;
    }

    constructor({
        sprite,
        size = Constants.SIZE,
        hitbox = Constants.HITBOX,
        acceleration = Constants.ACCELERATION,
        friction = Constants.FRICTION
    }) {
        super();
        this.x = 0;
        this.y = 0;

        this.sprite = sprite;
        this.size = size;
        this.hitbox = hitbox;
        this.acceleration = acceleration;
        this.friction = friction;
        this.speed = { x: 0, y: 0 };

        this.effects = [];
    }

    connectedCallback() {
        this.style.backgroundImage = `url('${this.sprite}')`;
        this.style.height = `${this.size}px`;
        this.style.width = `${this.size}px`;
        this.classList.add('entity');

        this.refreshPosition();
    }

    update(dt) {
        this.move(dt);
        this.effects.forEach(e => e.update(dt));
    }

    refreshPosition() {
        if (this.x > document.body.clientWidth)
            this.x = 1;
        else if (this.x < 0)
            this.x = document.body.clientWidth - 1;

        if (this.y > document.body.clientHeight)
            this.y = 1;
        else if (this.y < 0)
            this.y = document.body.clientHeight - 1;

        this.style.left = `${this.x}px`;
        this.style.top = `${this.y}px`;
    }

    move(dt) {
        this.speed.x *= 1 / (1 + this.friction * dt);
        this.speed.y *= 1 / (1 + this.friction * dt);

        this.x += this.speed.x;
        this.y += this.speed.y;
        
        this.refreshPosition();
    }

    collide(entity) { }
}
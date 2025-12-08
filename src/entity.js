import { Game } from "./game.js";
import { Stat } from "./stat.js";
import { ResourceManager } from "./resource_manager.js";
import * as Constants from './utils/constants.js';

export class Entity {
    static category = '';
    static group = '';

    constructor({
        sprite,
        size = Constants.SIZE,
        hitbox = Constants.HITBOX,
        acceleration = Constants.ACCELERATION,
        friction = Constants.FRICTION,
        angleOffset = 0,
        x = 0,
        y = 0,
    }) {
        this.resourceManager = ResourceManager.getInstance();

        this.x = x;
        this.y = y;
        this.speed = { x: 0, y: 0 };
        this.angleOffset = angleOffset;
        this.angle = 0;
        this.sprite = null;

        this._size = new Stat(size);
        this._acceleration = new Stat(acceleration);
        this._friction = new Stat(friction);
        this._hitbox = hitbox;
        
        this.effects = [];

        // this.classList.add('entity');

        if (sprite)
            this.resourceManager.load(sprite).then(img => this.sprite = img);
    }

    get size() { return this._size.value; }
    get hitbox() { return this._hitbox * this.size; }
    get acceleration() { return this._acceleration.value; }
    get friction() { return this._friction.value; }

    update(dt) {
        this.move(dt);
        this.effects.forEach(e => e.update(dt));
    }

    draw(context) {
        if (!this.sprite) return;

        if (this.x > context.canvas.width)
            this.x = 1;
        else if (this.x < 0)
            this.x = context.canvas.width - 1;

        if (this.y > context.canvas.height)
            this.y = 1;
        else if (this.y < 0)
            this.y = context.canvas.height - 1;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        this.effects.forEach(e => e.draw(context));

        context.drawImage(this.sprite, -this.size / 2, -this.size / 2, this.size, this.size);
        context.restore();
    }

    rotate() {
        this.angle = this.angleOffset + Math.atan2(this.speed.y, this.speed.x) + Math.PI / 2;
    }

    move(dt) {
        this.speed.x *= 1 / (1 + this.friction * dt);
        this.speed.y *= 1 / (1 + this.friction * dt);

        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    collide(entity) { }
}
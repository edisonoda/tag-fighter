import { Character } from './character.js';
import { Game } from "../game.js";
import * as Constants from '../utils/constants.js';

export class Enemy extends Character {
    static group = 'Enemy';

    constructor({
        sprite,
        size = Constants.SIZE,
        hitbox = Constants.HITBOX,
        acceleration = Constants.ACCELERATION,
        friction = Constants.FRICTION,
        life = Constants.LIFE,
        mass = Constants.MASS,
        damage = Constants.ENEMY_DMG
    }) {
        super({ sprite, size, hitbox, acceleration, friction, life, mass });

        this.damage = damage;
        this.player = Game.player;
    }

    refreshPosition() {
        super.refreshPosition();
        this.style.transform = `rotate(${this.angle}rad)`;
    }
    
    collide(entity) {
        super.collide(entity);

        if (entity === this.player)
            this.player.getHit(this.damage);
    }
}
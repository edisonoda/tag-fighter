import { Character } from './character.js';
import { Game } from "../game.js";

export const DEFAULT_DMG = 3;

export class Enemy extends Character {
    static group = 'Enemy';

    constructor(damage = DEFAULT_DMG) {
        super();

        this.damage = damage;
        this.player = Game.player;
    }

    refreshPosition() {
        super.refreshPosition();
        this.style.transform = `rotate(${this.angle}rad)`;
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
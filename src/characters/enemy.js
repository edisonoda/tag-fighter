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
        damage = Constants.ENEMY_DMG,
        gunDamage = 1,
        gunFireRate = 1,
        gunForce = 1,
        gunReloadTime = 1,
        gunAmmo = 1,
        projFriction = 1,
        projDuration = 1,
        projSize = 1,
        angleOffset = 0,
        shootOffset = Constants.SHOOT_OFFSET,
        blinkingDuration = Constants.FX_DURATION
    }) {
        super(arguments[0]);

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
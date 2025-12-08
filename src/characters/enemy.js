import { Character } from './character.js';
import { Game } from "../game.js";
import { EventManager } from '../events/event_manager.js';
import * as Constants from '../utils/constants.js';
import * as Events from '../events/events.js';

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
        blinkingDuration = Constants.FX_DURATION,
        x = 0, y = 0
    }) {
        super(arguments[0]);

        this.player = Game.player;
        this.eventManager = EventManager.getInstance();
    }
    
    collide(entity) {
        super.collide(entity);

        if (entity === this.player)
            this.player.getHit(this.damage);
    }

    getHit(damage) {
        super.getHit(damage);
        this.eventManager.notify(Events.ENEMY_HIT, { enemy: this, damage });
    }

    die() {
        super.die();
        this.eventManager.notify(Events.ENEMY_KILLED, { enemy: this });
    }
}
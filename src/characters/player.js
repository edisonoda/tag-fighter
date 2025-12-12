import { Character } from './character.js';
import { Gun } from '../guns/gun.js';
import { Game } from '../game.js';
import { EventManager } from '../events/event_manager.js';
import { Controls } from '../utils/controls.js';
import * as Constants from '../utils/constants.js';
import * as Events from '../events/events.js';

export class Player extends Character {
    static group = 'Player';

    constructor() {
        super({
            sprite: 'assets/img/player/default.svg',
            size: Constants.SIZE,
            hitbox: Constants.PLAYER_HITBOX,
            acceleration: Constants.PLAYER_ACCELERATION,
            friction: Constants.PLAYER_FRICTION,
            life: Constants.PLAYER_LIFE,
            blinkingDuration: Constants.INVULNERABLE_TIME,
            x: Game.canvas.width / 2,
            y: Game.canvas.height / 2
        });
        this.eventManager = EventManager.getInstance();

        this.mouseX = 0;
        this.mouseY = 0;

        this.pressedKeys = {};
        this.pressedMouse = {};

        this.hitOverlay = document.getElementById('hit-overlay');
        this.hitOverlay.addEventListener('transitionend', () => 
            this.hitOverlay.classList.remove('hit')
        );
        this.damaged = false;

        this.changeGun('one', Gun);
        this.changeGun('two', Gun);
        this.setupControls();
        this.id = 'player';
    }

    update(dt) {
        super.update(dt);

        if (this.pressedMouse['0'])
            this.primary();

        if (this.pressedMouse['2'])
            this.secondary();

        if (this.pressedKeys[Controls.RELOAD])
            this.reloadAll();

        if (this.pressedKeys[Controls.DASH])
            this.dash();

        if (this.pressedKeys[Controls.LEFT_UTIL])
            this.leftUtil();

        if (this.pressedKeys[Controls.RIGHT_UTIL])
            this.rightUtil();

        if (this.pressedKeys[Controls.SPECIAL])
            this.special();

        if (this.pressedKeys[Controls.SWAP_GUN])
            this.swapGun();

        if (this.pressedKeys[Controls.SWAP_GUN_1])
            this.swapGun('one');

        if (this.pressedKeys[Controls.SWAP_GUN_2])
            this.swapGun('two');
        
        if (!this.blinkEffect.active)
            this.damaged = false;
    }

    rotate() {
        let dx = this.mouseX - this.x;
        let dy = this.mouseY - this.y;

        this.angle = this.angleOffset + Math.atan2(dy, dx) + Math.PI / 2;
    }

    move(dt) {
        let dx = 0, dy = 0;

        if (this.pressedKeys[Controls.UP])       dy -= 1;
        if (this.pressedKeys[Controls.DOWN])     dy += 1;
        if (this.pressedKeys[Controls.LEFT])     dx -= 1;
        if (this.pressedKeys[Controls.RIGHT])    dx += 1;

        if (dx !== 0 || dy !== 0) {
            let direction = Math.hypot(dx, dy);
            this.speed.x += (dx / direction) * this.acceleration * dt;
            this.speed.y += (dy / direction) * this.acceleration * dt;
            this.eventManager.notify(Events.MOVED, { direction });
        }

        super.move(dt);
    }

    collide(entity) {
        switch (entity.constructor.group) {
            case 'Enemy':
                if (!this.damaged) {
                    this.pushBack(entity, Constants.KNOCK_FORCE);
                    this.eventManager.notify(Events.COLLIDED_ENEMY, { enemy: entity });
                }
                break;
            case 'Projectile':
                if (entity.shooter !== this) {
                    // TODO: collide with projectile
                    this.eventManager.notify(Events.COLLIDED_PROJ, { projectile: entity });
                }
            default: break;
        }

        // if (entity.constructor.group === 'Enemy' && !this.damaged) {
        //     Game.entities.forEach(e => {
        //         if (e.constructor.group === 'Enemy') {
        //             const dx = this.x - e.x;
        //             const dy = this.y - e.y;
        //             const distance = Math.hypot(dx, dy);
        //             let ratio = 1 - (distance / Constants.KNOCK_RADIUS);

        //             if (ratio < 0)
        //                 ratio = 0;

        //             e.pushBack(this, Constants.KNOCK_FORCE * ratio);
        //         }
        //     });
        // }
    }

    getHit(damage) {
        if (this.damaged)
            return;

        super.getHit(damage);

        this.hitOverlay.classList.add('hit');
        this.damaged = true;

        this.eventManager.notify(Events.DAMAGED, { damage });
    }
    
    die() {
        super.die();
        this.eventManager.notify(Events.DIED);
    }

    reloadAll() {
        Object.values(this.guns).forEach(g => g.instance?.reload());
    }

    finishReload(gun) {
        Object.values(this.guns).forEach(g => {
            if (g.instance === gun && g.reloadCircle)
                g.reloadCircle.style.visibility = 'hidden';
        });
        
        this.eventManager.notify(Events.RELOADED, { gun });
    }

    getShotDirection() {
        let dx = this.mouseX - this.x;
        let dy = this.mouseY - this.y;

        return this.angleOffset + Math.atan2(dy, dx);
    }

    primary() {
        let gun = this.guns[this.activeGun].instance;
        if (!gun) return;

        gun.shoot(this.getShotDirection());
        this.eventManager.notify(Events.PRIMARY);
    }

    secondary() {
        let gun = this.guns[this.activeGun].instance;
        if (!gun) return;

        gun.secondary(this.getShotDirection());
        this.eventManager.notify(Events.SECONDARY);
    }

    dash() {
        // TODO: dash
        this.eventManager.notify(Events.DASHED);
    }

    leftUtil() {
        // TODO: left util
        this.eventManager.notify(Events.L_UTIL);
    }

    rightUtil() {
        // TODO: right util
        this.eventManager.notify(Events.R_UTIL);
    }

    special() {
        // TODO: special
        this.eventManager.notify(Events.SPECIAL);
    }

    setupControls() {
        document.addEventListener('mousemove', ev => {
            this.mouseX = ev.pageX;
            this.mouseY = ev.pageY;
        });

        document.addEventListener('keydown', ev => {
            this.pressedKeys[ev.code] = true;
        });

        document.addEventListener('keyup', ev => {
            this.pressedKeys[ev.code] = false;
        });

        document.addEventListener('contextmenu', ev => {
            ev.preventDefault();
        });

        document.addEventListener('mousedown', ev => {
            this.pressedMouse[ev.button.toString()] = true;
        });

        document.addEventListener('mouseup', ev => {
            this.pressedMouse[ev.button.toString()] = false;
        });

        document.addEventListener('wheel', ev => {
            this.swapGun();
        });
    }

    changeCrosshair(sprite) {
        document.body.style.setProperty('--crosshair', `url('assets/img/crosshairs/${sprite}')`);
    }
}

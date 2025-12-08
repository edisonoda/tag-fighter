import { Character } from './character.js';
import { Gun } from '../guns/gun.js';
import { Game } from '../game.js';
import { EventManager } from '../events/event_manager.js';
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

        this.upKey = Constants.KEY_UP;
        this.downKey = Constants.KEY_DOWN;
        this.leftKey = Constants.KEY_LEFT;
        this.rightKey = Constants.KEY_RIGHT;

        this.reloadKey = Constants.KEY_RELOAD;
        this.dashKey = Constants.KEY_DASH;
        this.leftUtilKey = Constants.KEY_LEFT_UTIL;
        this.rightUtilKey = Constants.KEY_RIGHT_UTIL;
        this.specialKey = Constants.KEY_SPECIAL;

        this.pressedKeys = {};
        this.pressedMouse = {};

        this.hitOverlay = document.getElementById('hit-overlay');
        this.hitOverlay.addEventListener('transitionend', () => 
            this.hitOverlay.classList.remove('hit')
        );
        this.damaged = false;

        this.changePrimary(Gun);
        this.setupControls();
        this.id = 'player';
    }

    // async connectedCallback() {
    //     await super.connectedCallback();

    //     const response = await fetch(Constants.RELOAD_CIRCLE);
    //     if (!response.ok) return;

    //     this.innerHTML += (await response.text()).toString();

    //     this.guns.primary.reloadCircle = document.getElementById('reload-circle-1');
    //     this.guns.primary.maxReload = Constants.MAX_PRIMARY_RELOAD;

    //     this.guns.secondary.reloadCircle = document.getElementById('reload-circle-2');
    //     this.guns.secondary.maxReload = Constants.MAX_SECONDARY_RELOAD;
    // }

    update(dt) {
        super.update(dt);

        if (this.pressedMouse['0'])
            this.primary();

        if (this.pressedMouse['2'])
            this.secondary();

        if (this.pressedKeys[this.reloadKey])
            this.reloadAll();

        if (this.pressedKeys[this.dashKey])
            this.dash();

        if (this.pressedKeys[this.leftUtilKey])
            this.leftUtil();

        if (this.pressedKeys[this.rightUtilKey])
            this.rightUtil();

        if (this.pressedKeys[this.specialKey])
            this.special();
        
        if (!this.blinkEffect.active)
            this.damaged = false;

        this.checkReload();
    }

    rotate() {
        let dx = this.mouseX - this.x;
        let dy = this.mouseY - this.y;

        this.angle = this.angleOffset + Math.atan2(dy, dx) + Math.PI / 2;
    }

    move(dt) {
        let dx = 0, dy = 0;

        if (this.pressedKeys[this.upKey])       dy -= 1;
        if (this.pressedKeys[this.downKey])     dy += 1;
        if (this.pressedKeys[this.leftKey])     dx -= 1;
        if (this.pressedKeys[this.rightKey])    dx += 1;

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

    reload(gun) {
        Object.values(this.guns).forEach(g => {
            if (g.instance === gun && g.reloadCircle)
                g.reloadCircle.style.visibility = 'visible';
        });
    }

    finishReload(gun) {
        Object.values(this.guns).forEach(g => {
            if (g.instance === gun && g.reloadCircle)
                g.reloadCircle.style.visibility = 'hidden';
        });
        
        this.eventManager.notify(Events.RELOADED, { gun });
    }

    primary() {
        if (!this.guns.primary.instance)
            return;

        this.shoot(this.guns.primary.instance);
        this.eventManager.notify(Events.PRIMARY);
    }

    secondary() {
        if (!this.guns.secondary.instance)
            return;
        
        this.shoot(this.guns.secondary.instance);
        this.eventManager.notify(Events.SECONDARY);
    }

    shoot(gun) {
        let dx = this.mouseX - this.x;
        let dy = this.mouseY - this.y;

        let direction = this.angleOffset + Math.atan2(dy, dx);
        gun.shoot(direction);
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
    }

    checkReload() {
        Object.values(this.guns).forEach(g => {
            if (g.instance?.reloading)
                g.reloadCircle?.setAttribute('stroke-dasharray', `
                    ${(g.instance.c_reload / g.instance.reloadTime) * g.maxReload} ${g.maxReload}
                `);
        });
    }

    changeCrosshair(sprite) {
        document.body.style.setProperty('--crosshair', `url('assets/img/crosshairs/${sprite}')`);
    }
}

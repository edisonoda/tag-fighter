import { Character } from './character.js';
import { Gun } from '../guns/gun.js';
import { Game } from '../game.js';
import * as Constants from '../utils/constants.js';

export class Player extends Character {
    static group = 'Player';
    static tag = 'app-player';

    constructor() {
        super({
            sprite: 'assets/img/player/default.svg',
            size: Constants.SIZE,
            hitbox: Constants.PLAYER_HITBOX,
            acceleration: Constants.PLAYER_ACCELERATION,
            friction: Constants.PLAYER_FRICTION,
            life: Constants.PLAYER_LIFE,
            blinkingDuration: Constants.INVULNERABLE_TIME
        });
        this.setupPosition(document.body.clientWidth / 2, document.body.clientHeight / 2);

        this.mouseX = 0;
        this.mouseY = 0;

        this.upKey = Constants.KEY_UP;
        this.downKey = Constants.KEY_DOWN;
        this.leftKey = Constants.KEY_LEFT;
        this.rightKey = Constants.KEY_RIGHT;

        this.angleOffset = 0;
        this.pressedKeys = {};
        this.pressedMouse = {};

        this.shootOffset = Constants.SHOOT_OFFSET;
        this.primaryGun = null;

        this.hitOverlay = document.getElementById('hit-overlay');
        this.hitOverlay.addEventListener('transitionend', () => 
            this.hitOverlay.classList.remove('hit')
        );
        this.damaged = false;

        // Modifiers
        this.damage
        this.fireRate
        this.reloadSpeed
        this.projFriction
        this.projForce
        this.projTime
    }

    connectedCallback() {
        super.connectedCallback();

        this.changePrimary(Gun);
        this.setupControls();
        this.id = 'player';
    }

    update(dt) {
        super.update(dt);

        if (this.pressedMouse['0'])
            this.primary();
        
        if (!this.blinkEffect.active)
            this.damaged = false;
    }

    rotate() {
        let dx = this.mouseX - this.x;
        let dy = this.mouseY - this.y;

        this.angle = this.angleOffset + Math.atan2(dy, dx) + Math.PI / 2;
        this.refreshPosition();
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
        }

        super.move(dt);
    }

    collide(entity) {
        if (entity.constructor.group === 'Enemy' && !this.damaged) {
            Game.entities.forEach(e => {
                if (e.constructor.group === 'Enemy') {
                    const dx = this.x - e.x;
                    const dy = this.y - e.y;
                    const distance = Math.hypot(dx, dy);
                    let ratio = 1 - (distance / Constants.KNOCK_RADIUS);

                    if (ratio < 0)
                        ratio = 0;

                    e.pushBack(this, Constants.KNOCK_FORCE * ratio);
                }
            });
        }
    }

    getHit(damage) {
        if (this.damaged)
            return;

        super.getHit(damage);
        this.hitOverlay.classList.add('hit');
        this.damaged = true;
    }

    primary() {
        let dx = this.mouseX - this.x;
        let dy = this.mouseY - this.y;

        let direction = this.angleOffset + Math.atan2(dy, dx);
        this.primaryGun.shoot(direction, Constants.PROJ_FORCE);
    }

    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }

    changePrimary(gun) {
        this.primaryGun = new gun({ owner: this });
        this.changeCrosshair(gun.crosshair);
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

        document.addEventListener('mousedown', ev => {
            this.pressedMouse[ev.button.toString()] = true;
        });

        document.addEventListener('mouseup', ev => {
            this.pressedMouse[ev.button.toString()] = false;
        });
    }

    changeCrosshair(sprite) {
        document.body.style.setProperty('--crosshair', `url('assets/img/crosshairs/${sprite}')`);
    }
}

customElements.define(Player.tag, Player);
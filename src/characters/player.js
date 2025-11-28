import { Character } from './character.js';
import { Gun } from '../guns/gun.js';
import { Game } from '../game.js';

const DEFAULT_UP = 'KeyW';
const DEFAULT_DOWN = 'KeyS';
const DEFAULT_LEFT = 'KeyA';
const DEFAULT_RIGHT = 'KeyD';
const DEFAULT_ANGLE = 0 * (Math.PI / 180);

const DEFAULT_SIZE = 30; // In pixels
const DEFAULT_HITBOX = DEFAULT_SIZE * .5 / 2;

const DEFAULT_ACC = 30;
const DEFAULT_FRICTION = 5;

const DEFAULT_SHOOT_OFFSET = 15;
const DEFAULT_KNOCK_FORCE = 200;
const DEFAULT_KNOCK_RADIUS = 500;

export class Player extends Character {
    static group = 'Player';
    static tag = 'app-player';

    constructor() {
        super();

        this.setupSprite('assets/img/player/default.svg', DEFAULT_SIZE, DEFAULT_HITBOX);
        this.setupMovement(DEFAULT_ACC, DEFAULT_FRICTION);
        this.setupPosition(document.body.clientWidth / 2, document.body.clientHeight / 2);

        this.mouseX = 0;
        this.mouseY = 0;

        this.upKey = DEFAULT_UP;
        this.downKey = DEFAULT_DOWN;
        this.leftKey = DEFAULT_LEFT;
        this.rightKey = DEFAULT_RIGHT;

        this.angleOffset = DEFAULT_ANGLE;
        this.pressedKeys = {};
        this.pressedMouse = {};

        this.shootOffset = DEFAULT_SHOOT_OFFSET;
        this.primaryGun = null;

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
        this.rotate();

        if (this.pressedMouse['0'])
            this.primary();
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
            this.speed.x += (dx / direction) * this.acc * dt;
            this.speed.y += (dy / direction) * this.acc * dt;
        }

        super.move(dt);
    }

    collide(entity) {
        if (entity.constructor.group === 'Enemy') {
            Game.entities.forEach(e => {
                if (e.constructor.group === 'Enemy') {
                    const dx = this.x - e.x;
                    const dy = this.y - e.y;
                    const distance = Math.hypot(dx, dy);
                    let ratio = 1 - (distance / DEFAULT_KNOCK_RADIUS);

                    if (ratio < 0)
                        ratio = 0;

                    e.pushBack(this, DEFAULT_KNOCK_FORCE * ratio);
                }
            });
        }
    }

    primary() {
        let dx = this.mouseX - this.x;
        let dy = this.mouseY - this.y;

        let direction = this.angleOffset + Math.atan2(dy, dx);
        this.primaryGun.shoot(direction, 20);
    }

    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }

    changePrimary(gun) {
        this.primaryGun = new gun(this);
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
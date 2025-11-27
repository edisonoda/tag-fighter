import { Character } from './character.js';
import { Gun } from '../guns/gun.js';

const DEFAULT_UP = 'KeyW';
const DEFAULT_DOWN = 'KeyS';
const DEFAULT_LEFT = 'KeyA';
const DEFAULT_RIGHT = 'KeyD';
const DEFAULT_ANGLE = 0 * (Math.PI / 180);

export class Player extends Character {
    constructor() {
        super('assets/img/player/default.svg');

        this.mouseX = 0;
        this.mouseY = 0;

        this.upKey = DEFAULT_UP;
        this.downKey = DEFAULT_DOWN;
        this.leftKey = DEFAULT_LEFT;
        this.rightKey = DEFAULT_RIGHT;

        this.angleOffset = DEFAULT_ANGLE;
        this.pressedKeys = {};
        this.pressedMouse = {};

        this.shootOffset = 15;
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

    collide(entity) { }

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

customElements.define('app-player', Player);
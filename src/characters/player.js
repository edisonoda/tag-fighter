import { Character } from './character.js';

const DEFAULT_UP = 'KeyW';
const DEFAULT_DOWN = 'KeyS';
const DEFAULT_LEFT = 'KeyA';
const DEFAULT_RIGHT = 'KeyD';
const DEFAULT_ANGLE = 0 * (Math.PI / 180);
const DEFAULT_CROSSHAIR = 'shot.svg';

export class Player extends Character {
    constructor() {
        super(
            'assets/img/player/default.svg',
            document.body.clientWidth / 2,
            document.body.clientHeight / 2
        );

        this.mouseX = 0;
        this.mouseY = 0;

        this.upKey = DEFAULT_UP;
        this.downKey = DEFAULT_DOWN;
        this.leftKey = DEFAULT_LEFT;
        this.rightKey = DEFAULT_RIGHT;

        this.angleOffset = DEFAULT_ANGLE;
        this.pressedKeys = {};
    }

    connectedCallback() {
        super.connectedCallback();

        this.setupControls();
        this.changeCrosshair(DEFAULT_CROSSHAIR);
        this.id = 'player';
    }

    update(dt) {
        super.update(dt);
        this.rotate();
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
    primary() { }
    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }

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
    }

    changeCrosshair(sprite) {
        document.body.style.setProperty('--crosshair', `url('assets/img/crosshairs/${sprite}')`);
    }
}

customElements.define('app-player', Player);
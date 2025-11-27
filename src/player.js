const DEFAULT_UP = 'KeyW';
const DEFAULT_DOWN = 'KeyS';
const DEFAULT_LEFT = 'KeyA';
const DEFAULT_RIGHT = 'KeyD';
const DEFAULT_ANGLE = 22.5 * (Math.PI / 180);

class Player extends Entity {
    constructor() {
        super(
            'assets/img/player/default.svg',
            document.body.clientWidth / 2,
            document.body.clientHeight / 2
        );

        this.upKey = DEFAULT_UP;
        this.downKey = DEFAULT_DOWN;
        this.leftKey = DEFAULT_LEFT;
        this.rightKey = DEFAULT_RIGHT;

        this.angleOffset = DEFAULT_ANGLE;
        this.pressedKeys = {};
        this.setupControls();
    }

    rotate(ev) {
        let dx = ev.pageX - this.x;
        let dy = ev.pageY - this.y;

        this.angle = this.angleOffset + Math.atan2(dy, dx) + Math.PI / 2;
        this.refreshPosition();
    }

    updatePosition(direction) {
        let rad = direction * (Math.PI / 180);
        this.x += Math.sin(rad) * this.moveRate;
        this.y -= Math.cos(rad) * this.moveRate;

        this.x = this.x % document.body.clientWidth;
        this.y = this.y % document.body.clientHeight;

        this.move();
        this.refreshPosition();
    }

    move() { }
    primary() { }
    secondary() { }
    reload() { }
    dash() { }
    leftUtil() { }
    rightUtil() { }
    special() { }

    setupControls() {
        document.addEventListener('mousemove', ev => {
            this.rotate(ev);
        });

        document.addEventListener('keydown', ev => {
            if (ev.defaultPrevented)
                return;

            let direction = 0;
            this.pressedKeys[ev.code] = true;

            switch (ev.code) {
                case this.upKey:
                    direction = 0;

                    if (this.pressedKeys[this.leftKey])
                        direction -= 45;

                    if (this.pressedKeys[this.rightKey])
                        direction += 45;
                    break;
                case this.downKey:
                    direction = 180;

                    if (this.pressedKeys[this.leftKey])
                        direction += 45;

                    if (this.pressedKeys[this.rightKey])
                        direction -= 45;
                    break;
                case this.leftKey:
                    direction = 270;

                    if (this.pressedKeys[this.upKey])
                        direction += 45;

                    if (this.pressedKeys[this.downKey])
                        direction -= 45;
                    break;
                case this.rightKey:
                    direction = 90;

                    if (this.pressedKeys[this.upKey])
                        direction -= 45;

                    if (this.pressedKeys[this.downKey])
                        direction += 45;
                    break;
            }

            this.updatePosition(direction);
        });

        document.addEventListener('keyup', ev => {
            if (ev.defaultPrevented)
                return;

            this.pressedKeys[ev.code] = false;
        });
    }
}

customElements.define('app-player', Player);
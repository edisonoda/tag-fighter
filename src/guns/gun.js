import { Entity } from "../entity.js";
import { Game } from "../game.js";
import { Shot } from "../projectiles/shot.js";
import { Stat } from "../stat.js";
import * as Constants from "../utils/constants.js";

export class Gun extends Entity {
    static crosshair = Constants.CROSSHAIR;

    constructor({
        owner,
        is_primary = true,
        damage = Constants.GUN_DMG,
        fireRate = Constants.FIRE_RATE,
        force = Constants.FIRE_FORCE,
        shots = Constants.GUN_SHOTS,
        burst = Constants.GUN_BURST,
        spread = Constants.GUN_SPREAD,
        reloadTime = Constants.RELOAD_TIME,
        ammo = Constants.AMMO,
        projFriction = 1,
        projDuration = 1,
        projSize = 1,
    }) {
        super({ sprite: null });
        this.owner = owner;
        this.is_primary = is_primary;

        this._damage = new Stat(damage);
        this._fireRate = new Stat(fireRate);
        this._force = new Stat(force);
        this._shots = new Stat(shots);
        this._burst = new Stat(burst);
        this._spread = new Stat(spread);
        this._reloadTime = new Stat(reloadTime);
        this._ammo = new Stat(ammo);
        this._projFriction = new Stat(projFriction);
        this._projDuration = new Stat(projDuration);
        this._projSize = new Stat(projSize);

        this.c_shotTime = this.shotTime;
        this.c_burstTime = 0;
        this.c_burst = 0;
        this.c_reload = 0;
        this.c_ammo = this.ammo;
        this.reloading = false;
        this.direction = 0;

        this.projectile = null;
        this.changeProjectile(Shot);

        if (is_primary) {
            this.radius = Constants.RELOAD_SIZE - Constants.RELOAD_WIDTH - .5;
            this.draw = this.drawPrimary;
        } else {
            this.radius = Constants.RELOAD_SIZE;
            this.draw = this.drawSecondary;
        }

        this.lineWidth = Constants.RELOAD_WIDTH;

        Game.addEntity(this);
    }

    get damage() { return this._damage.value * this.owner.gunDamage; }
    get fireRate() { return this._fireRate.value * this.owner.gunFireRate; }
    get force() { return this._force.value * this.owner.gunForce; }
    get shots() { return this._shots.value; }
    get burst() { return this._burst.value; }
    get spread() { return this._spread.value; }
    get reloadTime() { return this._reloadTime.value * this.owner.gunReloadTime; }
    get ammo() { return this._ammo.value * this.owner.gunAmmo; }
    get projFriction() { return this._projFriction.value * this.owner.projFriction; }
    get projDuration() { return this._projDuration.value * this.owner.projDuration; }
    get projSize() { return this._projSize.value * this.owner.projSize; }

    get shotTime() { return 1 / this.fireRate; }
    get burstTime() { return (this.shotTime / this.burst) * .5; }

    update(dt) {
        if (this.reloading) {
            this.c_reload += dt;

            if (this.c_reload >= this.reloadTime)
                this.finishReload();
        } else {
            this.c_shotTime += dt;
            this.c_burstTime += dt;
        }

        if (this.c_burstTime > this.burstTime && this.c_burst > 0)
            this.shootBurst();
    }

    drawPrimary(context) {
        if (!this.reloading)
            return;

        this.x = this.owner.x + this.owner.size / 2;
        this.y = this.owner.y - this.owner.size / 2;

        context.save();
        context.fillStyle = "white";
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.arc(
            this.x,
            this.y,
            this.radius,
            -Math.PI / 2,
            -Math.PI / 2 + (Math.PI * 2) * this.c_reload,
            false
        );
        context.fill();

        context.restore();
    }

    drawSecondary(context) {
        if (!this.reloading)
            return;

        this.x = this.owner.x + this.owner.size / 2;
        this.y = this.owner.y - this.owner.size / 2;

        context.save();
        context.strokeStyle = "white";
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.radius,
            -Math.PI / 2,
            -Math.PI / 2 + (Math.PI * 2) * this.c_reload,
            false
        );
        context.stroke();

        context.restore();
    }

    shoot(direction) {
        if (this.reloading || this.c_shotTime < this.shotTime)
            return;

        this.direction = direction;
        this.c_ammo--;
        this.c_shotTime = 0;

        this.c_burst = this.burst;
    }

    shootBurst() {
        if (this.reloading)
            return;

        let dt = this.spread / (this.shots + 1);
        let c_angle = this.direction - (this.spread / 2) + dt;

        for (let i = 0; i < this.shots; i++) {
            this.instantiateProj(c_angle);
            c_angle += dt;
        }

        this.c_burst--;
        this.c_burstTime = 0;

        if (this.c_ammo <= 0 && this.c_burst <= 0)
            this.reload();
    }

    reload() {
        if (this.c_ammo == this.ammo)
            return;

        this.owner.reload(this);
        this.reloading = true;
    }

    finishReload() {
        this.owner.finishReload(this);

        this.reloading = false;
        this.c_reload = 0;
        this.c_shotTime = 0;
        this.c_burstTime = 0;
        this.c_ammo = this.ammo;
    }

    instantiateProj(direction) {
        const dx = Math.cos(direction);
        const dy = Math.sin(direction);

        const proj = new this.projectile({
            gun: this,
            shooter: this.owner,
            x: this.owner.x + dx * this.owner.shootOffset,
            y: this.owner.y + dy * this.owner.shootOffset,
            speed: { x: dx * this.force, y: dy * this.force }
        });

        Game.addEntity(proj);
    }

    changeProjectile(projClass) {
        this.projectile = projClass;
    }
}
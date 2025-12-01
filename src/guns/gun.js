import { Game } from "../game.js";
import { Shot } from "../projectiles/shot.js";
import { Stat } from "../stat.js";
import * as Constants from "../utils/constants.js";

export class Gun {
    static crosshair = Constants.CROSSHAIR;

    constructor({
        owner,
        damage = Constants.GUN_DMG,
        fireRate = Constants.FIRE_RATE,
        force = Constants.FIRE_FORCE,
        reloadTime = Constants.RELOAD_TIME,
        ammo = Constants.AMMO,
        projFriction = 1,
        projDuration = 1,
        projSize = 1,
    }) {
        this.owner = owner;

        this._damage = new Stat(damage);
        this._fireRate = new Stat(fireRate);
        this._force = new Stat(force);
        this._reloadTime = new Stat(reloadTime);
        this._ammo = new Stat(ammo);
        this._projFriction = new Stat(projFriction);
        this._projDuration = new Stat(projDuration);
        this._projSize = new Stat(projSize);

        this.shotTime = 1 / this.fireRate;

        this.c_shotTime = this.shotTime;
        this.c_reload = 0;
        this.c_ammo = this.ammo;
        this.reloading = false;

        this.projectile = null;
        this.changeProjectile(Shot);

        Game.addEntity(this, false);
    }

    get damage() { return this._damage.value * this.owner.gunDamage; }
    get fireRate() { return this._fireRate.value * this.owner.gunFireRate; }
    get force() { return this._force.value * this.owner.gunForce; }
    get reloadTime() { return this._reloadTime.value * this.owner.gunReloadTime; }
    get ammo() { return this._ammo.value * this.owner.gunAmmo; }
    get projFriction() { return this._projFriction.value * this.owner.projFriction; }
    get projDuration() { return this._projDuration.value * this.owner.projDuration; }
    get projSize() { return this._projSize.value * this.owner.projSize; }

    update(dt) {
        this.c_shotTime += dt;

        if (this.reloading) {
            this.c_reload += dt;

            if (this.c_reload >= this.reloadTime)
                this.finishReload();
        }
    }

    shoot(direction) {
        if (this.reloading || this.c_shotTime < this.shotTime)
            return;

        this.c_ammo--;

        if (this.c_ammo <= 0)
            this.reload();

        this.c_shotTime = 0;

        this.instantiateProj(direction);
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
        this.c_ammo = this.ammo;
    }

    instantiateProj(direction) {
        const dx = Math.cos(direction);
        const dy = Math.sin(direction);

        const proj = this.projectile.instantiate(
            this.owner.x + dx * this.owner.shootOffset,
            this.owner.y + dy * this.owner.shootOffset
        );

        proj.setupProjectile(this, this.owner, { x: dx * this.force, y: dy * this.force });
    }

    changeProjectile(projClass) {
        this.projectile = projClass;
    }
}
import { Game } from "../game.js";
import { Shot } from "../projectiles/shot.js";
import * as Constants from "../utils/constants.js";

export class Gun {
    static crosshair = Constants.CROSSHAIR;

    constructor({
        owner,
        fireRate = Constants.FIRE_RATE,
        reloadTime = Constants.RELOAD_TIME,
        ammo = Constants.AMMO,
    }) {
        this.owner = owner;

        this.shotTime = 1 / fireRate;
        this.reloadTime = reloadTime;
        this.ammo = ammo;

        this.c_shotTime = this.shotTime;
        this.c_reload = 0;
        this.c_ammo = this.ammo;
        this.reloading = false;

        // Modifiers
        this.damage
        this.size

        this.projectile = null;
        this.changeProjectile(Shot);

        Game.addEntity(this, false);
    }

    update(dt) {
        this.c_shotTime += dt;

        if (this.reloading) {
            this.c_reload += dt;

            if (this.c_reload >= this.reloadTime)
                this.finishReload();
        }
    }

    shoot(direction, force) {
        if (this.reloading || this.c_shotTime < this.shotTime)
            return;

        this.c_ammo--;

        if (this.c_ammo <= 0)
            this.reload();

        this.c_shotTime = 0;

        this.instantiateProj(direction, force);
    }

    reload() {
        if (this.c_ammo == this.ammo)
            return;

        this.reloading = true;
    }

    finishReload() {
        this.reloading = false;
        this.c_reload = 0;
        this.c_ammo = this.ammo;
    }

    instantiateProj(direction, force) {
        const dx = Math.cos(direction);
        const dy = Math.sin(direction);

        const proj = this.projectile.instantiate(
            this.owner.x + dx * this.owner.shootOffset,
            this.owner.y + dy * this.owner.shootOffset
        );

        proj.setupProjectile(this.owner, { x: dx * force, y: dy * force });
    }

    changeProjectile(projClass) {
        this.projectile = projClass;
    }
}
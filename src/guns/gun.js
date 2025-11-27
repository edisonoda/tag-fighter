import { Game } from "../game.js";
import { Shot } from "../projectiles/shot.js";

const DEFAULT_CROSSHAIR = 'shot.svg';

export class Gun {
    static crosshair = DEFAULT_CROSSHAIR;

    constructor(owner) {
        this.owner = owner;

        this.fireRate = 10;
        this.lastShot = 1 / this.fireRate;
        this.totalReloadTime = 1;
        this.reloadTime = 0;
        this.reloading = false;
        this.totalAmmo = 10;
        this.ammo = this.totalAmmo;

        // Modifiers
        this.damage
        this.size

        this.projectile = null;
        this.changeProjectile(Shot);

        Game.addEntity(this);
    }

    update(dt) {
        this.lastShot += dt;

        if (this.reloading) {
            this.reloadTime += dt;

            if (this.reloadTime >= this.totalReloadTime)
                this.finishReload();
        }
    }

    shoot(direction, force) {
        if (this.reloading || this.lastShot < 1 / this.fireRate)
            return;

        this.ammo--;

        if (this.ammo <= 0)
            this.reload();

        this.lastShot = 0;

        this.instantiateProj(direction, force);
    }

    reload() {
        if (this.ammo == this.totalAmmo)
            return;

        this.reloading = true;
    }

    finishReload() {
        this.reloading = false;
        this.reloadTime = 0;
        this.ammo = this.totalAmmo;
    }

    instantiateProj(direction, force) {
        let proj = document.createElement(this.projectile.tag);
        let dx = Math.cos(direction);
        let dy = Math.sin(direction);

        proj.setupProjectile(
            this.owner,
            { x: dx * force, y: dy * force },
            this.owner.x + dx * this.owner.shootOffset,
            this.owner.y + dy * this.owner.shootOffset
        );

        Game.addEntity(proj);
        Game.main.append(proj);
    }

    changeProjectile(projClass) {
        this.projectile = projClass;
    }
}
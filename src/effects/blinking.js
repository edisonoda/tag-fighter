import { TimedEffect } from "./timed_effect.js";
import * as Constants from '../utils/constants.js';

export class Blinking extends TimedEffect {
    constructor({
        target,
        intensity = Constants.FX_INTENSITY,
        duration = Constants.FX_DURATION,
        interval = Constants.FX_INTERVAL
    }) {
        super({ target, intensity, duration, interval });
        this.interval = interval;
        this.c_time = 0;

        this.c_intensity = intensity;
        this.direction = 1;
        this.speed = (1 - intensity) / interval;
    }

    apply(dt) {
        this.c_intensity += this.speed * this.direction * dt;

        if (this.c_intensity >= 1) {
            this.c_intensity = 1;
            this.direction *= -1;
        } else if (this.c_intensity <= this.intensity) {
            this.c_intensity = this.intensity;
            this.direction *= -1;
        }

        this.target.style.opacity = this.c_intensity;
    }

    update(dt) {
        if (!this.active) return;

        this.elapsed += dt;
        if (this.elapsed >= this.duration) {
            this.reset();
            return;
        }

        this.apply(dt);
    }

    reset() {
        this.elapsed = 0;
        this.direction = 1;
        this.active = false;

        this.c_time = 0;
        this.c_intensity = this.intensity;
        this.speed = (1 - this.intensity) / this.interval;
        
        this.target.style.opacity = 1;
    }
} 